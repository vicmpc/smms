<template>
  <div class="login">
    <!-- 登录 -->
    <div class="loginform">
      <!-- 标题 -->
      <h1><i class="el-icon-news"></i>华联超市后台管理系统</h1>
      <!-- 登录表单  -->
      <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpwd">
          <el-input type="password" v-model="loginForm.checkpwd " autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" :plain="true">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入qs库
import qs from 'qs';
export default {
   data() {
      var confirmPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.loginForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: "",
          password: "",
          checkPwd: ""
        },
        loginRules: {
          username: [
            {required: true, message: "账号不能为空", trigger: "blur"}, // 非空验证
            {min: 3, max: 6, message: "长度必须 3 到 6 个字符", trigger: "blur"} // 长度验证
          ],
          password: [
            {required: true, message: "密码不能为空", trigger: "blur"}, // 非空验证
            {min: 3, max: 6, message: "长度必须 3 到 6 个字符", trigger: "blur"} // 长度验证
          ],
          checkPwd: [
            {required: true, validator: confirmPwd, trigger: "blur"} // 非空验证
          ]
        }
      };
    },
    methods: {
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           // 获取用户输入的账号和密码
            let params = {
              username :this.loginForm.username,
              password :this.loginForm.password
            }

             // 允许携带cookie
          this.axios.defaults.withCredentials=true;
          
             // 写ajax 把用户名和密码 一起发送给后端
          this.axios.post('http://127.0.0.1:474/users/checklogin',
            qs.stringify(params),
            { headers: {'Content-Type':'application/x-www-form-urlencoded'} }
          )
          .then(response => {
            if(response.data.rstCode === 1){
              // 成功弹出登陆成功的提示
              this.$message({
                type:'success',
                message:response.data.msg
              })
              // 通过路由跳转到后端系统首页
              setTimeout(() => {
                  this.$router.push("/");
              },500)
            }else{
              // 失败弹出失败的提示
              this.$message.error(response.data.msg)
            }
          })
        } else {
          console.log("前端验证不通过, 不能发送");
          return false;
        }
       });
     },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<style lang="less">
.login {
  background: #999;
  height: 100%;
  .loginform {
    width: 450px;
    height: 400px;
    background: rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    padding-right: 30px;
    border-radius: 7px;
    h1 {
      font-size: 24px;
      text-align: center;
      color: #ccc;
      margin-top: 30px;
    }
    .el-form {
      margin-top: 30px;
      .el-form-item {
        .el-form-item__label {
          color: black;
        }
        // .el-input__inner{
        // width: 400px;
        // }
      }
    }
  }
}
</style>