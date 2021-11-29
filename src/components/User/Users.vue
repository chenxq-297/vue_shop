<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="9">
        <el-col :span="8">
          <el-input
            placeholder="Please input"
            class="input-with-select"
            v-model="queryInfo.query"
          >
            <template #append>
              <el-button @click="getUserList">serch</el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true"
            >add</el-button
          >
        </el-col>
        <el-table :data="userList" style="width: 100%" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="username" label="姓名"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="mobile" label="电话"></el-table-column>
          <el-table-column prop="role_name" label="角色"></el-table-column>
          <el-table-column prop="mg_state" label="状态">
            <template v-slot="scope">
              <!-- 拿到状态 渲染 -->
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="userStateChanged(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="170px">
            <template v-slot="scop">
              <el-button
                type="success"
                v-model="scop.row"
                size="mini"
                @click="editDialog(scop.row.id)"
                circle
                >修改</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="removeuser(scop.row.id)"
                circle
                >删除</el-button
              >
              <el-button type="danger" size="mini" circle>分配</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          :current-page="queryInfo.pagenum"
          :page-sizes="[2, 3, 4, 5]"
          :page-size="3"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 添加用户提示框 -->
    <el-dialog
      v-model="dialogVisible"
      title="添加用户"
      width="50%"
      @close="addDialogcls"
    >
      <template #footer>
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>

        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addUser">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 修改按钮 -->
    <el-dialog
      v-model="editDialogvisb"
      title="修改"
      width="50%"
      @close="editialogcls"
    >
      <template #footer>
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>

        <span class="dialog-footer">
          <el-button @click="editDialogvisb = false">取消</el-button>
          <el-button type="primary" @click="editUser">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    const checkEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) return callback();
      callback(new Error("请输入合法邮箱"));
    };
    const checkMoble = (rule, value, cb) => {
      const regMoble =
        /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMoble.test(value)) return cb();
      cb(new Error("请输入合法电话"));
    };
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: "3",
      },
      userList: [],
      total: 0,
      //默认不显示确认弹窗
      dialogVisible: false,
      //默认不显示修改弹窗
      editDialogvisb: false,
      //添加弹出窗的对象
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      //添加弹出窗的规则
      addFormRules: {
        username: [
          { required: true, message: "必填鸭", trigger: "blur" },
          { min: 3, max: 5, message: "length should 3-5", trigger: "blur" },
        ],
        password: [{ required: true, message: "必填鸭", trigger: "blur" }],
        email: [
          { required: true, message: "必填鸭", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "必填鸭", trigger: "blur" },
          { validator: checkMoble, trigger: "blur" },
        ],
      },
      //修改弹出框
      editForm: {},
      editFormRules: {
        email: [
          { required: true, message: "必填鸭", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "必填鸭", trigger: "blur" },
          { validator: checkMoble, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      });
      if (res.meta.status !== 200)
        return this.$message({ showClose: true, message: res, type: "error" });
      //赋值
      this.userList = res.data.users;
      this.total = res.data.total;
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    async userStateChanged(userinfo) {
      const { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      );
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state;
        return this.$message({ showClose: true, message: "sb", type: "error" });
      }
      return this.$message({ showClose: true, message: "cg", type: "success" });
    },
    //重置添加用户的确认按钮
    addDialogcls() {
      this.$refs.addFormRef.resetFields();
    },
    editialogcls() {
      this.$refs.editFormRef.resetFields();
    },
    //添加用户的确认按钮
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        //预验证完成，开始提交
        const { data: res } = await this.$http.post("users", this.addForm);
        if (res.meta.status !== 201)
          return this.$message({
            showClose: true,
            message: "sb",
            type: "error",
          });
        this.$message({ showClose: true, message: "cg", type: "success" });
        //添加完隐藏,并重新加载list
        this.dialogVisible = false;
        this.getUserList();
      });
    },
    //修改用户的确认按钮
    editUser() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        //表单预验证完成
        const { data: res } = await this.$http.put(
          "users/" + this.editForm.id,
          { email: this.editForm.email, mobile: this.editForm.mobile }
        );
        if (res.meta.status !== 200)return this.$message({showClose: true,message: "sb",type: "error",});
        //关闭框 刷新列表 提示成功
        this.editDialogvisb = false;
        this.getUserList();
        this.$message({ showClose: true, message: "cg", type: "success" });
      });
    },
    //修改按钮
    async editDialog(id) {
      // console.log(id);
      //请求服务器获取数据，然后打开提示框
      const { data: res } = await this.$http.get("users/" + id);
      if (res.meta.status !== 200)
        return this.$message({ showClose: true, message: "sb", type: "error" });
      this.editForm = res.data;
      this.editDialogvisb = true;
    },
    //删除按钮
    async removeuser(id) {
      const res = await this.$ElMessageBox
        .confirm("是否真的删除", "警告", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        }).catch((err) => err);
      //取消 就返回cancel 确实 返回confirm
      if (res !== "confirm") return this.$message({showClose: true,message: "取消删除",type: "info",})
      //确认删除的接口
      const {data:ren} = await this.$http.delete('users/'+id)
      if (ren.meta.status !== 200)return this.$message({showClose: true,message: "删除用户失败",type: "error",});
      this.$message({ showClose: true, message: "cg", type: "success" });
      this.getUserList()
    },
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
  font-size: 12px;
}
.box-card {
  box-shadow: 0 1px 1px rgb(0, 0, 0.15);
}
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
</style>
