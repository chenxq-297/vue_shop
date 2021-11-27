<!--  -->
<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/1.jpg" alt="">
            </div>
            <el-form ref="loginform" :model="loginform" :rules="loginrules" label-width="0px" class="login_form">
                <el-form-item prop="username">
                    <el-input prefix-icon="icon-shopyiliaohangyedeICON-" v-model="loginform.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" prefix-icon="icon-icon-shopmima" v-model="loginform.password"></el-input>
                </el-form-item>
                <el-form-item class="login_btn">
                    <el-button type="primary" @click="login" plain>登录</el-button>
                    <el-button type="info" @click="resetloginform" plain>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>


export default {
    data(){
        return{
            loginform:{
                username:'admin',
                password:'123456',
            },
            loginrules:{
                username:[{required: true,message:'必填鸭',trigger:'blur'},
                      {min:3,max:5,message:'length should 3-5',trigger:'blur'},],
                password:[{required: true,message:'必填鸭',trigger:'blur'}]
            }
        }
    },
    methods:{
        login(){
            //登录预验证
            this.$refs.loginform.validate(async valid=>{
                if(!valid) return ;
                // 赋值解构
                const {data:res}=await this.$http.post("login",this.loginform)
                if(res.meta.status !== 200)return this.$message({showClose: true,message: '你错了鸭',type: 'error',});
                this.$message({showClose: true,message: '登录成功',type: 'success',})
                //记录服务器返回的token
                window.sessionStorage.setItem("token",res.data.token)
                //然后跳转h后台
                this.$router.push("/home")
            })
        },
        resetloginform(){
            this.$refs.loginform.resetFields();
        }
    }

}
</script>

<style lang="less" scoped>
/**scoped 表示样式只在当前组件有效*/
.login_container{
    background-color: turquoise;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

    .avatar_box{
        height: 120px;
        width: 120px;
        border:1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;

        img{
            width:120px;
            height: 120px;
            border-radius: 50%;
            background-color: #eee;
        }
    }

}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

}
.login_btn{
    // display: flex;
    // justify-content: flex-end;
    float: right;
}
</style>