<template>
    <div class="my-account">
        <!-- 主体 -->
        <el-main>
            <el-card class="box-card">
                <!-- 面板标题 -->
                <div slot="header" class="clearfix">
                    <span>账号管理</span>
                </div>
                <!-- 面板内容 -->
                <el-table
                        ref="myAccount"
                        :data='tableData'
                        style="width: 100%"
                        tooltip-effect="dark"
                        @selection-change="handleSelectionChange">
                    <el-table-column type="selection">
                    </el-table-column>
                    <el-table-column label="日期">
                        <template slot-scope="scope">{{ scope.row.cdate | formatCdate }}</template>
                    </el-table-column>
                    <el-table-column label="用户名" prop="username">
                    </el-table-column>
                    <el-table-column label="用户组" prop="selectuser">
                    </el-table-column>
                    <el-table-column align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
                        </template>
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.row.id)">修改</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 修改弹出的模态框 -->
                <el-dialog title="修改用户" :visible.sync="dialogFormVisible" width="40%">
                    <!-- 修改用户表单 -->
                    <el-form :model="editForm" status-icon :rules="rules" ref="editForm" label-width="100px"
                             class="demo-ruleForm">
                        <!-- 账号 -->
                        <el-form-item label="账号" prop="username">
                            <el-input type="text" v-model="editForm.username" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- 密码 -->
                        <el-form-item label="密码" prop="password">
                            <el-input type="text" v-model="editForm.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- 用户组 -->
                        <el-form-item label="选择用户组" prop="selectuser">
                            <el-select v-model="editForm.selectuser" placeholder="请选择用户组">
                                <el-option label="超级管理员" value="超级管理员"></el-option>
                                <el-option label="普通用户" value="普通用户"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
                    </div>
                </el-dialog>
                <div style="margin-top: 20px">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[1,3,5,10]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalCount">
                    </el-pagination>
                </div>
                <!-- 批量删除按钮 -->
                <div style="margin-top: 20px">
                    <el-button type="danger" @click="batchDel">批量删除</el-button>
                    <el-button @click="toggleSelection">取消选择</el-button>
                </div>


            </el-card>
        </el-main>
    </div>
</template>

<script>
  //引入时间格式化插件
  import moment from 'moment';
  import qs from 'qs';

  export default {
    data() {
      return {
        tableData: [],
        search: '',
        totalCount: 10,
        currentPage: 1,
        pageSize:3,
        dialogFormVisible: false,
        editId: '',
        keepUser: [],
        editForm: {
          username: '',
          password: '',
          selectuser: ''
        },
        rules: {
          username: [
            {required: true, message: "账号不能为空", trigger: "blur"},
            {min: 3, max: 6, message: "长度必须 3 到 6 个字符", trigger: "blur"}
          ],
          password: [
            {required: true, message: "密码不能为空", trigger: "blur"},
            {min: 3, max: 6, message: "长度必须 3 到 6 个字符", trigger: "blur"}
          ],
          selectuser: [
            {required: true, message: "请选择用户组", trigger: "change"}
          ]
        }
      }
    },
    methods: {
      //获取当前页面尺寸
      handleSizeChange(id) {
        this.pageSize = val;
        this.getAccountListByPage();
      },
      //页码改变出触发函数
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getUserListByPage();
      },
      //编辑
      handleEdit(id) {
        this.editId = id;
        // 发送需要编辑的id
        this.axios.get(`http://192.168.20.1:3000/users/edituser?id=${id}`)
          .then(response => {
            this.editForm.username = response.data[0].username;
            this.editForm.password = response.data[0].password;
            this.editForm.usergroup = response.data[0].usergroup;
            this.dialogFormVisible = true;
          })
      },
      /* 删除数据 */
      handleDelete(id) {
        // console.log('删除id'+id);
        this.axios.get(`http://127.0.0.1:474/users/del-account?id=${id}`)
          .then(response => {
            if (response.data.rstCode === 1) {
              this.$message({
                type: 'success',
                message: response.data.msg
              });
              //重新请求数据
              this.getAccountList();
            } else {
              this.$message.error(response.data.msg);
            }
          });
      },
      //取消选择
      toggleSelection() {
        this.$refs.myAccount.clearSelection();
      },
      //选择状态改变
      handleSelectionChange(val) {
        this.keepUser = val;
      },
      // 批量删除函数
      batchDel() {
        let idArr = this.keepUser.map(v => v.id);
        if (!idArr.length) {
          this.$message.error('请选择!');
          return
        }
        let param = {
          idArr: JSON.stringify(idArr)
        };
        // 发送一个ajax请求 把这个id数组（里面是需要批量删除的数据的id）发送给后端
        this.axios.post('http://127.0.0.1:474/users/batchdel',
          qs.stringify(param),
          {Header: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).then(response => {
          if (response.data.rstCode === 1) {
            this.$message({
              type: 'success',
              message: response.data.msg
            });
            this.getAccountListByPage();
          } else {
            this.$message.error(response.data.msg)
          }
        })
      },
      /* 请求数据函数 */
      getAccountList() {
        this.axios.get("http://127.0.0.1:474/users/my-account")
          .then(response => {
            this.tableData = response.data;
          });
      },
      /* 请求分页数据函数 */
      getAccountListByPage() {
        let currentPage = this.currentPage;
        let pageSize = this.pageSize;
        this.axios
          .get(`http://127.0.0.1:474/users/my-account-by-page?currentPage=${currentPage}&pageSize=${pageSize}`)
          .then(response => {
            this.tableData = response.data.data;
            this.totalCount = response.data.totalCount;
            if (!response.data.data.length && this.currentPage !== 1) {
              this.currentPage -= 1;
              this.getAccountListByPage();
            }
          });
      },
      /* 修改后提交 */
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let params = {
              username: this.editForm.username,
              password: this.editForm.password,
              usergroup: this.editForm.usergroup,
              editId: this.editId
            };
            // 发送ajax 把修改后的新数据 和 原来的id 一起发送给后端
            this.axios.post('http://192.168.20.1:3000/users/saveedit',
              qs.stringify(params),
              { Header: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            ).then(response => {
              if (response.data.rstCode === 1) {
                this.$message({
                  type: 'success',
                  message: response.data.msg
                });
                this.getAccountListByPage()
              } else {
                this.$message.error(response.data.msg);
              }
            });
            // 关闭模态框
            this.dialogFormVisible = false;
          } else {
            console.log("验证失败");
            return false;
          }
        });
      }
    },
    //生命周期
    created() {
      this.getAccountListByPage();
    },
    //过滤器
    filters: {
      formatCdate(value) {
        return moment(value).format("YY-MM-DD HH:mm:ss");
      }
    }

  };
</script>

<style lang="less">
    .my-account {
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