<template>
    <div class="add-account">
        <!-- 主体 -->
        <el-main>
            <el-card class="box-card">
                <!-- 面板标题 -->
                <div slot="header" class="clearfix">
                    <span>添加账号</span>
                </div>
                <!-- 注册表单  -->
                <el-form :model="addAccountFrom" status-icon :rules="addAccountRules" ref="addAccountFrom" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="addAccountFrom.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="addAccountFrom.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkpwd">
                        <el-input type="password" v-model="addAccountFrom.checkpwd " autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="选择用户组" prop="selectuser">
                        <el-select v-model="addAccountFrom.selectuser" placeholder="选择用户组" autocomplete="off">
                            <el-option label="普通管理员" value="普通管理员"></el-option>
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('addAccountFrom')" :plain="true">添加</el-button>
                        <el-button @click="resetForm('addAccountFrom')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-main>
    </div>
</template>

<script>
  //引入axios的qs库，处理post请求
  import qs from 'qs';

  export default {
    data() {
      var pwdConsistency = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.addAccountFrom.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        addAccountFrom: {
          username: '',
          password: '',
          checkpwd: '',
          selectuser: ''
        },
        addAccountRules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
          ],
          checkpwd: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {required: true, validator: pwdConsistency, trigger: 'blur'}
          ],
          selectuser: [
            {required: true, message: '请选择用户组', trigger: 'change'}
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
              username: this.addAccountFrom.username,
              password: this.addAccountFrom.password,
              selectuser: this.addAccountFrom.selectuser
            };
            //发送ajax请求，传输数据
            this.axios.post(
              'http://127.0.0.1:474/users/add-account',
              qs.stringify(params),
              {'headers': {'Content-Type': 'application/x-www-form-urlencoded'}}
            )
              .then(response => {
                console.log(response.data);
                if (response.data.rstCode === 1) {
                  this.$message({
                    type: 'success',
                    message: response.data.msg
                  });
                  // 通过路由到用户管理页
                  this.$router.push('/my-account')
                } else {
                  this.$message.error(response.data.msg);
                }
              });
          } else {
            // alert('添加失败!');
            console.log('验证未通过');
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
    .add-account {
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