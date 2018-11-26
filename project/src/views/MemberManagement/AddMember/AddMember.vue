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
          <el-form :model="addAccountForm" status-icon :rules="addAccountRules" ref="addAccountForm" label-width="100px" class="demo-ruleForm">
            <!-- 会员卡卡号 -->
            <!-- <el-form-item label="会员卡卡号" prop="cardid"> -->
              <!-- <el-input type="text" v-model="addAccountForm.cardid" autocomplete="off"></el-input> -->
            <!-- </el-form-item> -->
            <!-- 真实名字 -->
            <el-form-item label="真实姓名" prop="username">
              <el-input type="text" v-model="addAccountForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 用户组 -->
            <el-form-item label="选择用户组" prop="usergrade">
              <el-select v-model="addAccountForm.usergrade" placeholder="请选择用户组">
                <el-option label="超级用户" value="超级用户"></el-option>
                <el-option label="普通用户" value="普通用户"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="会员积分" prop="userintegral">
              <el-input type="text" v-model="addAccountForm.userintegral"></el-input>
            </el-form-item>
            <el-form-item label="折扣" prop="discount">
              <el-input type="text" v-model="addAccountForm.discount"></el-input>
            </el-form-item>
            <!-- 身份证号 -->
            <!-- <el-form-item label="身份证号" prop=" identitycard">
                            <el-input type="text" v-model="addAccountForm.identitycard"></el-input>
                        </el-form-item> -->
            <el-form-item label="用户状态" prop="userstate">
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
            <!-- <el-form-item label="邮箱地址" prop="emailaddress">
                            <el-input type="text" v-model="addAccountForm.emailaddress"></el-input>
                        </el-form-item> -->

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


export default {
  data() {
    return {
      // radio: "",
      // 登录表单数据对象
      addAccountForm: {
        // cardid: "",
        username: "",
        usergrade: "",
        userintegral: "",
        discount: "",
        // identitycard: "",
        userstate: "",
        tel: "",
        landlinenumber: ""
        // emailaddress: ""
      },
      // 验证的字段
      addAccountRules: {
        // 验证会员卡卡号
        // cardid: [
          // { required: true, message: "密码不能为空", trigger: "blur" }, // 非空验证
          // { min: 3, max: 6, message: "长度必须3到6个字符", trigger: "blur" } // 长度验证
        // ],
        // 验证用户名
        username: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }, // 非空验证
          { min: 2, max: 6, message: "长度必须2到6个字符", trigger: "blur" } // 长度验证
        ],
        // 验证用户组
        usergrade: [
          { required: true, message: "请选择用户组", trigger: "change" } // 非空验证
        ],
        // 用户状态
        userstate: [
          { required: true, message: "请选择用户状态", trigger: "change" } //状态验证
        ],
        // 会员积分
        userintegral: [
          { required: true, message: "请输积分数", trigger: "blur" } // 非空验证
        ],
        // 折扣
        discount: [
          { required: true, message: "请输入折扣", trigger: "blur" } // 非空验证
        ],
        // 验证手机号
        tel: [
          { required: true, message: "手机号不能为空", trigger: "blur" }, // 非空验证
          { min: 11, max: 11, message: "长度必须是十一位字符", trigger: "blur" } // 长度验证
        ],
        // 验证座机号
        landlinenumber: [
          { required: true, message: "座机号不能为空", trigger: "blur" }, // 非空验证
          { min: 8, max: 10, message: "长度必须8到10个字符", trigger: "blur" } // 长度验证
        ]
      }
    };
  },
  methods: {
    // 表单提交触发的函数
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 获取用户输入的新增数据，用一个参数对象保存
          var params = {
            // cardid: this.addAccountForm.cardid,
            username: this.addAccountForm.username,
            usergrade: this.addAccountForm.usergrade,
            userintegral: this.addAccountForm.userintegral,
            discount: this.addAccountForm.discount,
            userstate: this.addAccountForm.userstate,
            tel: this.addAccountForm.tel,
            landlinenumber: this.addAccountForm.landlinenumber
          };
          // 发送ajax请求  把数据发送给后端
          this.axios
            .post(
              "http://127.0.0.1:888/users/addmember",
              qs.stringify(params), // 参数处理
              {
                headers: { "Content-Type": "application/x-www-form-urlencoded" } // 设置请求头
              })
            .then(response => {
              // 如果请求状态码是1 那么就是请求成功
              if (response.data.rstCode === 1) {
                // 弹出提示信息
                this.$message({
                  type: "success",
                  message: response.data.msg
                });

                // 跳转到账号管理列表页面
                this.$router.push("/my-member");
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
     .el-card__body{
       .item{
         .el-form{
           .el-form-item{
             .el-form-item__content{
               .el-input{
                 width: 300px;
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


