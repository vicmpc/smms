<template>
    <div class="add-member">
        <!-- 主体 -->
        <el-main>
            <el-card class="box-card">
                <!-- 面板标题 -->
                <div slot="header" class="clearfix">
                    <span>添加编辑账号</span>
                </div>

                <!-- 面板内容 -->
                <div class="text item">
                    <!-- 添加账号表单 -->
                    <el-form :model="addAccountForm" status-icon :rules="addUserRules" ref="addAccountForm" label-width="100px" class="demo-ruleForm">
                        <!-- 真实名字 -->
                        <el-form-item label="真实姓名" prop="username">
                            <el-input type="text" v-model="addAccountForm.username" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- 会员卡卡号 -->
                        <el-form-item label="会员卡卡号" prop="cardnumber">
                            <el-input type="text" v-model="addAccountForm.cardnumber" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- 用户组 -->
                        <el-form-item label="选择用户组" prop="usergrade">
                            <el-select v-model="addAccountForm.usergrade" placeholder="请选择用户组">
                                <el-option label="超级管理员" value="超级管理员"></el-option>
                                <el-option label="普通用户" value="普通用户"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 身份证号 -->
                        <el-form-item label="身份证号" prop=" identitycard">
                            <el-input type="text" v-model="addAccountForm.identitycard"></el-input>
                        </el-form-item>
                        <el-form-item label="用户状态" prop="userstate">
                            <!-- <el-radio v-model="radio" label="1">启用</el-radio>
                            <el-radio v-model="radio" label="2">禁用</el-radio> -->
                            <el-radio-group v-model="addAccountForm.userstate">
                                <el-radio label="启用"></el-radio>
                                <el-radio label="禁用"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="tel">
                            <el-input type="text" v-model="addAccountForm.tel"></el-input>
                        </el-form-item>
                        <el-form-item label="座机号码" prop="landlinenumber">
                            <el-input type="text" v-model="addAccountForm.landlinenumber"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱地址" prop="emailaddress">
                            <el-input type="text" v-model="addAccountForm.emailaddress"></el-input>
                        </el-form-item>

                        <!-- 添加按钮 -->
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('addAccountForm')">添加</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </el-main>
    </div>
</template>
<script>
// axios自带一个依赖库 qs 主要帮我们处理post请求的参数问题
import qs from "qs";

// 引入头部组件 和 尾部组件
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";
export default {
  // 注册组件
  components: {
    Header,
    Footer
  },
  data() {
    // 自定义一个验证密码一致性的函数
    const confirmPwd = (rule, value, callback) => {
      // 非空验证
      if (value === "") {
        // 输出不能为空的提示
        callback(new Error("请再次输入密码"));
      } else if (value !== this.addAccountForm.password) {
        // 一致性验证
        // 输出密码不一致的回调
        callback(new Error("两次密码不一致"));
      } else {
        // 成功提示（绿色勾勾）
        callback();
      }
    };
    return {
      radio: "",
      // 登录表单数据对象
      addAccountForm: {
        username: "",
        cardnumber: "",
        usergrade: "",
        identitycard: "",
        userstate: "",
        tel: "",
        landlinenumber: "",
        emailaddress: ""
      },
      // 验证的字段
      addUserRules: {
        // 验证用户名
        username: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }, // 非空验证
          { min: 2, max: 6, message: "长度必须 2 到 6 个字符", trigger: "blur" } // 长度验证
        ],
        // 验证会员卡卡号
        cardnumber: [
          { required: true, message: "密码不能为空", trigger: "blur" }, // 非空验证
          { min: 3, max: 6, message: "长度必须 3 到 6 个字符", trigger: "blur" } // 长度验证
        ],
        // 验证用户组
        usergrade: [
          { required: true, message: "请选择用户组", trigger: "change" } // 非空验证
        ],
        // 身份证号
        identitycard: [
          { required: true, message: "身份证号不能为空", trigger: "blur" }, // 非空验证
          { min: 14, max: 14, message: "身份证长度不对", trigger: "blur" } // 长度验证
        ],
        // 用户状态
        userstate: [
          { required: true, message: '请选择用户状态', trigger: 'change' }//状态验证
        ],
        // 验证手机号
        tel: [
          { required: true, message: "手机不能为空", trigger: "blur" }, // 非空验证
          { min: 3, max: 6, message: "长度必须 3 到 6 个字符", trigger: "blur" } // 长度验证
        ],
        // 验证座机号
        landlinenumber: [
          { required: true, message: "座机号不能为空", trigger: "blur" }, // 非空验证
          { min: 3, max: 6, message: "长度必须 3 到 6 个字符", trigger: "blur" } // 长度验证
        ],
        // 验证邮箱号
        emailaddress: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    // 表单提交触发的函数
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 获取用户输入的要新增的账号数据，用一个参数对象保存
          let params = {
            username: this.addAccountForm.username,
            cardnumber: this.addAccountForm.cardnumber,
            usergrade: this.addAccountForm.usergrade,
            identitycard: this.addAccountForm.identitycard,
            userstate: this.addAccountForm.userstate,
            tel: this.addAccountForm.tel,
            landlinenumber: this.addAccountForm.landlinenumber,
            emailaddress: this.addAccountForm.emailaddress
          };

          // 发送ajax请求  把数据发送给后端
          this.axios
            .post(
              "http://127.0.0.1:3000/users/adduser",
              qs.stringify(params), // 参数处理
              {
                headers: { "Content-Type": "application/x-www-form-urlencoded" } // 设置请求头
              }
            )
            .then(response => {
              // 如果请求状态码是1 那么就是请求成功
              if (response.data.rstCode === 1) {
                // 弹出提示信息
                this.$message({
                  type: "success",
                  message: response.data.msg
                });

                // 跳转到账号管理列表页面
                this.$router.push("/add-member");
              } else {
                // 弹出账号添加失败信息
                this.$message.error(response.data.msg);
              }
            });
        } else {
          console.log("前端验证不通过, 不能发送");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
.add-member {
  width: 100%;
  display: flex; // 让这个盒子 变为一个可以伸缩的盒子
  flex-direction: column; // 方向是 纵向
  // 主体
  .el-main {
    flex: 1; // 自动增长 撑满
    .el-card {
      .el-card__header {
        font-weight: 700;
        font-size: 15px;
        background-color: #f1f1f1;
      }
      .el-card__body {
        .item {
          .el-form {
            width: 300px;
            .el-form-item {
              .el-form-item__label {
                height: 35px;
                line-height: 35px;
              }
              .el-form-item__content {
                height: 35px;
                line-height: 35px;
                .el-input__inner {
                  height: 35px;
                  line-height: 35px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>


