<template>
    <div class="change-pwd">
        <!-- 主体 -->
        <el-main>
            <el-card class="box-card">
                <!-- 面板标题 -->
                <div slot="header" class="clearfix">
                    <span>修改密码</span>
                </div>
                <!-- 注册表单  -->
                <el-form :model="loginFrom" status-icon :rules="loginRules" ref="loginFrom" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="原密码" prop="oldpwd">
                        <el-input type="password" v-model="loginFrom.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newpwd">
                        <el-input type="password" v-model="loginFrom.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="checkpwd">
                        <el-input type="password" v-model="loginFrom.checkpwd " autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginFrom')" :plain="true">修改</el-button>
                        <el-button @click="resetForm('loginFrom')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-main>
    </div>
</template>
<script>
  export default {
    data() {
      var pwdConsistency = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.loginFrom.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        loginFrom: {
          oldpwd: '',
          newpwd: '',
          checkpwd: ''
        },
        loginRules: {
          oldpwd: [
            {required: true, message: '请输入原密码', trigger: 'blur'},
            {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
          ],
          newpwd: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
          ],
          checkpwd: [
            {required: true, message: '请再次输入新密码', trigger: 'blur'},
            {required: true, validator: pwdConsistency, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            // 获取用户输入的账号和密码
            let oldpwd = this.loginFrom.oldpwd;
            let newpwd = this.loginFrom.newpwd;
            let checkpwd = this.loginFrom.checkpwd;
            // 通过路由到后端系统首页
            this.$router.push('/my-account')
          } else {
            alert('修改失败!');
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
    .change-pwd {
        flex: 1;
        // 主体
        .el-main {
            .el-card {
                .el-card__header {
                    font-weight: 700;
                    font-size: 15px;
                    background-color: #f1f1f1;
                }
            }
        }
    }
</style>