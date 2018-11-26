<template>
    <div class="login">
        <!-- 登录 -->
        <!-- 标题 -->
        <h1><i class="el-icon-news"></i>华联超市后台管理系统</h1>
        <!-- 登录表单  -->
        <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginFrom" label-width="100px"
                 class="demo-ruleForm">
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
</template>

<script>
  import qs from 'qs';

  export default {
    data() {
      const confirmPwd = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.loginForm.password) {
          callback(new Error("两次密码不一致"));
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
        this.$refs[formName].validate(valid => {
          if (valid) {
            let params = {
              username: this.loginForm.username,
              password: this.loginForm.password
            };
            this.axios.defaults.withCredentials = true;
            this.axios.post('http://127.0.0.1:474/users/checklogin',
              qs.stringify(params),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
            )
              .then(response => {
                if (response.data.rstCode === 1) {
                  this.$message({
                    type: 'success',
                    message: response.data.msg
                  });
                  setTimeout(() => {
                    this.$router.push("/");
                  }, 500)
                } else {
                  this.$message.error(response.data.msg)
                }
              })

          } else {
            console.log("验证失败");
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
        width: 500px;
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
                .el-input__inner {
                    width: 400px;
                }
            }
        }
    }
</style>