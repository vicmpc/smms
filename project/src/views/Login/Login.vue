<template>
  <div class="login">
    <!-- 登录 -->
    <div class="loginform">
      <!-- 标题 -->
      <h1><i class="el-icon-news"></i>华联超市后台管理系统</h1>
      <!-- 登录表单  -->
      <el-form :model="loginFrom" status-icon :rules="loginRules" ref="loginFrom" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="loginFrom.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginFrom.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpwd">
          <el-input type="password" v-model="loginFrom.checkpwd " autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginFrom')" :plain="true">登录</el-button>
          <el-button @click="resetForm('loginFrom')">重置</el-button>
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
      var pwdConsistency = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.loginFrom.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        loginFrom: {
          username: '',
          password: '',
          checkpwd: ''
        },
        loginRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
          checkpwd: [
            { required: true, validator: pwdConsistency, trigger: 'blur' }
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
              username :this.loginFrom.username,
              password :this.loginFrom.password
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
}
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