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
                <el-form :model="loginFrom" status-icon :rules="loginRules" ref="loginFrom" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="loginFrom.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginFrom.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkpwd">
                        <el-input type="password" v-model="loginFrom.checkpwd " autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="选择用户组" prop="selectuser">
                        <el-select v-model="loginFrom.selectuser" placeholder="选择用户组" autocomplete="off">
                            <el-option label="普通管理员" value="普通管理员"></el-option>
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginFrom')" :plain="true">添加</el-button>
                        <el-button @click="resetForm('loginFrom')">重置</el-button>
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
          checkpwd: '',
          selectuser: ''
        },
        loginRules: {
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
            {required: true, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            // 获取用户输入的账号和密码
            let params = {
              username: this.loginFrom.username,
              password: this.loginFrom.password,
              selectuser: this.loginFrom.selectuser
            };
            //发送ajax请求，传输数据
            this.axios.post('http://127.0.0.1:474/users/adduser',qs.stringify(params),{'header':{'Content-Type':'application/x-www-form-urlencoded'}})
              .then(response => {
                console.log(response.data);
              });

            // console.log(params);
            // 通过路由到后端系统首页
            // this.$router.push('/my-account')
          } else {
            alert('添加失败!');
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