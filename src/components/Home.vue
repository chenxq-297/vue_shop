<template>
  <el-container class="hone-container">
      <!-- header -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>电商管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
        <!-- 左边 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
                <el-menu router :collapse="isCollapse" :collapse-transition="false" active-text-color="#ffd04b" :default-active='activePath' text-color="#fff" background-color="#333744" :unique-opened="true">
                    <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
                        <template v-slot:title>
                            <!-- <el-icon><location /></el-icon> -->
                            <span style="color:#fff">{{item.authName}}</span>
                        </template>
                            <el-menu-item :index="'/'+subitem.path"  v-for="subitem in item.children" :key="subitem.id" @click="saveNavstatic('/'+subitem.path)">
                                {{subitem.authName}}
                            </el-menu-item>
                    </el-submenu>
                </el-menu>
      </el-aside>
      <!-- 主题 -->
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    data(){
        return{
           menulist:[],
           isCollapse:false,
           //高亮
           activePath:''
        }
    },
    created(){
        this.getMenuList()
        this.activePath=window.sessionStorage.getItem('activepath')
    },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList(){
        const {data:res}=await this.$http.get('menus')
        if(res.meta.status!==200) return this.$message({showClose: true,message: res,type: 'error',});
        this.menulist=res.data
        console.log(this.menulist);
    }, 
    toggleCollapse(){
        this.isCollapse=!this.isCollapse
    },
    saveNavstatic(activePath){
        window.sessionStorage.setItem('activepath',activePath)
        this.activePath=activePath
    }
  },
};
</script>

<style lang="less" scoped>
.hone-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu{
      border-right: none;
  }
}
.toggle-button{
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
el-main {
  background-color: #eaedf1;
}
</style>
