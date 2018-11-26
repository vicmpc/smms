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
                <el-form :model="editPwdForm" status-icon :rules="rules" ref="editPwdForm" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="原密码" prop="oldPwd">
                        <el-input type="password" v-model="editPwdForm.oldPwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPwd">
                        <el-input type="password" v-model="editPwdForm.newPwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="confirmPwd">
                        <el-input type="password" v-model="editPwdForm.confirmPwd " autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('editPwdForm')" :plain="true">修改</el-button>
                        <el-button @click="resetForm('editPwdForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-main>
    </div>
</template>
<script>
  import qs from 'qs';
  export default {
    data() {
      //验证旧密码
      const checkOldPwd = (rule, value, callback) => {
        this.axios.get(`http://127.0.0.1:474/users/checkoldpwd?oldPwd=${value}`)
          .then(response => {
            if (response.data.rstCode === 1) {
              callback();
            } else if (response.data.rstCode === 0) {
              callback(new Error(response.data.msg))
            }
          })
      };
      //一致性检测
      const checkPwd = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.editPwdForm.newPwd) {
          callback(new Error("两次密码不一致"));
        } else {
          callback();
        }
      };
      return {
        editPwdForm: {
          oldPwd: '',
          newPwd: '',
          confirmPwd: ''
        },
        //输入字段验证
        rules: {
          oldPwd: [
            { required: true, validator: checkOldPwd, trigger: "blur" }
          ],
          newPwd: [
            { required: true, message: "新密码不能为空", trigger: "blur" }, // 非空验证
            { min: 3, max: 6, message: "长度必须 3 到 6 个字符", trigger: "blur" } // 长度验证
          ],
          confirmPwd: [
            { required: true, validator: checkPwd, trigger: "blur" }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.axios.get(`http://127.0.0.1:474/users/savenewpwd?newPwd=${this.editPwdForm.newPwd}`)
              .then(response => {
                if (response.data.rstCode === 1) {
                  this.$message({
                    type: 'success',
                    message: response.data.msg
                  });
                  setTimeout(() => {
                    this.$router.push('/login')
                  }, 1000)
                } else {
                  this.$message.error(response.data.msg);
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