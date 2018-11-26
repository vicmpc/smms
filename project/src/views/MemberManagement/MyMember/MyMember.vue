<template>
  <div class="my-member">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>会员管理</span>
      </div>
      <div class="demand">
        搜索：<el-input v-model="input" placeholder="请输入内容"></el-input>
        会员卡，会员名，电话，手机 <el-button type="success">查询</el-button>
      </div>

      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <!-- 选择框 -->
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="cardid" label="会员卡卡号" width="100">
        </el-table-column>
        <el-table-column prop="username" label="会员姓名" width="100">
        </el-table-column>
        <el-table-column prop="usergrade" label="会员等级" width="80">
        </el-table-column>
        <el-table-column prop="userintegral " label="会员积分" width="80">
        </el-table-column>
        <el-table-column prop="discount" label="折扣" width="60">
        </el-table-column>
        <el-table-column prop="userstate" label="用户状态">
        </el-table-column>
        <el-table-column prop="tel" label="手机号">
        </el-table-column>
        <el-table-column prop="landlinenumber" label="座机号">
        </el-table-column>
        <el-table-column prop="manage" label="管理">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row.cardid)"><i class="el-icon-edit"></i></el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.cardid)"><i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 修改弹出的模态框 -->
      <el-dialog width="40%" title="修改会员账号" :visible.sync="dialogFormVisible">
        <el-form :model="editForm" status-icon :rules="editRules" ref="editForm" label-width="100px" class="demo-ruleForm">
          <!-- 真实名字 -->
          <el-form-item label="真实姓名" prop="username">
            <el-input type="text" v-model="editForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 用户组 -->
          <el-form-item label="选择用户组" prop="usergrade">
            <el-select v-model="editForm.usergrade" placeholder="请选择用户组">
              <el-option label="超级用户" value="超级用户"></el-option>
              <el-option label="普通用户" value="普通用户"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员积分" prop="userintegral">
            <el-input type="text" v-model="editForm.userintegral"></el-input>
          </el-form-item>
          <el-form-item label="折扣" prop="discount">
            <el-input type="text" v-model="editForm.discount"></el-input>
          </el-form-item>

          <el-form-item label="用户状态" prop="userstate">
            <el-radio-group v-model="editForm.userstate">
              <el-radio label="启用"></el-radio>
              <el-radio label="禁用"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号码" prop="tel">
            <el-input type="text" v-model="editForm.tel"></el-input>
          </el-form-item>
          <el-form-item label="座机号码" prop="landlinenumber">
            <el-input type="text" v-model="editForm.landlinenumber"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分页效果 -->
      <div class="block" style="margin-top: 20px">
        <el-pagination 
          @size-change="handleSizeChange" 
          @current-change="handleCurrentChange" 
          :current-page="currentPage" 
          :page-sizes="[ 5, 8, 12, 26 , 49]" 
          :page-size="pageSize" 
          layout="total, sizes, prev, pager, next, jumper" 
          :total="totalCount">
        </el-pagination>
      </div>

      <div style="margin-top: 20px">
        <el-button type="danger" @click="batchDel">批量删除</el-button>
        <el-button @click="toggleSelection">取消选择</el-button>
      </div>

    </el-card>
  </div>
</template>


<script>
// axios自带一个依赖库 qs 主要帮我们处理post请求的参数问题
import qs from "qs";

export default {
  data() {
    return {
      totalCount:11,// 数据总条数
      currentPage:1,//当前页面
      pageSize:5,//默认每条显示3条数据
      dialogFormVisible: false,//模态框显示和隐藏
      input: "",
      editId: "",
      tableData: [],
      seletedMember: [],//保存选中的用户数据
      editForm: {
        username: "",
        usergrade: "",
        userintegral: "",
        discount: "",
        userstate: "",
        tel: "",
        landlinenumber: ""
      },
      // 验证的字段
      editRules: {
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
  // 方法
  methods: {
    handleSizeChange(val) {
      // 重置pageSize的值
      this.pageSize = val;
      //调用获取数据的函数
      this.getMemberListByPage();
    },
    handleCurrentChange(val) {
     // 重置当前页码
      this.currentPage = val;
      //调用获取数据的函数
      this.getMemberListByPage();
    },
    // 编辑触发函数
    handleEdit(cardid) {
      // 把要修改的cardid保存到一个变量里面
      this.editId = cardid;

      // 发送一个ajax 把需要修改的数据的cardid发送给后端
      this.axios
        .get(`http://127.0.0.1:888/users/editmember?cardid=${cardid}`)
        .then(response => {
          // 一一对应 把数据回填到模态框里面
          this.editForm.username = response.data[0].username;
          this.editForm.usergrade = response.data[0].usergrade;
          this.editForm.userintegral = response.data[0].userintegral;
          this.editForm.discount = response.data[0].discount;
          this.editForm.userstate = response.data[0].userstate;
          this.editForm.tel = response.data[0].tel;
          this.editForm.landlinenumber = response.data[0].landlinenumber;

          // 回填号数据以后 再弹出模态框
          this.dialogFormVisible = true;
        });
    },
    // 删除触发的函数
    handleDelete(cardid) {
      // 发送一个请求 把id发送给后端
      this.axios
        .get(`http://127.0.0.1:888/users/delmember?cardid=${cardid}`)
        .then(response => {
          // 根据后端响应的数据判断
          if (response.data.rstCode === 1) {
            // 弹出删除成功的提示
            this.$message({
              type: "success",
              message: response.data.msg
            });

            // 重新请求一下所有账号数据（刚才已经把数据删除了 所有再次请求就是只有删除后的数据）
            this.getMemberListByPage();
          } else {
            this.$message.error(response.data.msg);
          }
        });
    },

    // 取消选择的函数
    toggleSelection(rows) {
      // 取消选择
      this.$refs.multipleTable.clearSelection();
    },

    // 当选择状态改变 触发这个函数
    handleSelectionChange(val) {
      // 把选中的数据 保存到一个变量里面
      this.seletedMember = val;
    },
    // 批量删除函数
    batchDel() {
      // 把需要批量删除的数据的cardid 取出来
      let idArr = this.seletedMember.map(v => v.cardid);

      // 判断 如果没有选中任何数据 那么就弹出请选择以后再操作 直接返回
      if (!idArr.length) {
        this.$message.error("请选择以后再操作");
        return;
      }

      // 收集参数
      let param = {
        idArr: JSON.stringify(idArr) // 把数组转为字符串
      };

      // 发送一个ajax请求 把这个id数组（里面是需要批量删除的数据的id）发送给后端
      this.axios
        .post(
          "http://127.0.0.1:888/users/batchdel",
          qs.stringify(param), // 处理参数
          { Header: { "Content-Type": "application/x-www-form-urlencoded" } } // 设置请求头
        )
        .then(response => {
          // 接收后端响应的数据 根据结果判断
          if (response.data.rstCode === 1) {
            // 成功 弹出批量删除成功的提示
            this.$message({
              type: "success",
              message: response.data.msg
            });

            // 刷新页面（重新获取一下最新数据）
            this.getMemberListByPage();
          } else {
            // 失败 弹出错误信息
            this.$message.error(response.data.msg);
          }
        });
    },
    // 封装一个请求所有用户账号数据的函数
    // getmemberList() {
    //   // 发送ajax请求 获取所有数据
    //   this.axios.get("http://127.0.0.1:888/users/memberlist").then(response => {
    //     // 直接把请求到的所用用户账号的数据 赋值给 tableData 渲染用户账号列表
    //     this.tableData = response.data;
    //   });
    // },
    // 按照分页请求数据
    getMemberListByPage() {
      // 获取当前页码
      let currentPage = this.currentPage;
      // 获取当前页面尺寸pageSize(每页显示多少条)
      let pageSize = this.pageSize

      // 发送ajax请求 按照分页请求数据
      this.axios
        .get(`http://127.0.0.1:888/users/memberlistbypage?currentPage=${currentPage}&pageSize=${pageSize}`)
        .then(response => {

          // 把后端返回的对应页码的数据 赋值给 tableData
          this.tableData = response.data.data;
          // 把后端返回的数据总调数据 赋值 给 tatalCount
          this.totalCount = response.data.totalCount;

          // 如果当前页码 没有数据 且 不是第一页
          if (!response.data.data.length && this.currentPage !== 1) {
            // 当前页码减去 1 
            this.currentPage -= 1;
            // 再次调用自己
            this.getMemberListByPage();
          }
        });
    },

    // 修改表单提交函数
    // 表单提交触发的函数
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 收集修改后的新数据 和 一个原来的cardid
          let params = {
            username: this.editForm.username,
            usergrade: this.editForm.usergrade,
            userintegral: this.editForm.userintegral,
            userstate: this.editForm.userstate,
            discount: this.editForm.discount,
            tel: this.editForm.tel,
            landlinenumber: this.editForm.landlinenumber,
            editId: this.editId
          };

          // 发送ajax 把修改后的新数据 和 原来的id 一起发送给后端
          this.axios
            .post("http://127.0.0.1:888/users/saveedit", qs.stringify(params), {
              Header: { "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then(response => {
              // 根据后端响应的数据判断
              if (response.data.rstCode === 1) {
                // 成功 弹出修改成功的提示
                this.$message({
                  type: "success",
                  message: response.data.msg
                });
                // 重新调用一下获取数据的方法（刷新一遍页面 获取最新数据）
                this.getMemberListByPage();
              } else {
                this.$message.error(response.data.msg);
              }
            });

          // 关闭模态框
          this.dialogFormVisible = false;
        } else {
          console.log("前端验证不通过, 不能发送");
          return false;
        }
      });
    }
  },
  created() {
    this.getMemberListByPage();
  }
};
</script>

<style lang="less">
.my-member {
  flex: 1;
  // 主体
  .el-card {
    .el-card__header {
      font-weight: 700;
      font-size: 15px;
      background-color: #f1f1f1;
    }
    .el-card__body {
      .el-dialog {
        .el-dialog__header {
          font-weight: 700;
        }
        .el-dialog__body {
          .el-form {
            width: 60%;
          }
        }
      }

      .el-input {
        width: 300px;
      }
     .el-pagination__editor,.el-input--mini{
        width:100px;
      }
    }
    .demand {
      padding-bottom: 20px;
      border-bottom: 3px solid #ccc;
    }
  }
}
</style>