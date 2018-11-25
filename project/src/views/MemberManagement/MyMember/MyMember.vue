<template>
    <div class="my-member">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>会员管理</span>
            </div>
            搜索：<el-input v-model="input" placeholder="请输入内容"></el-input>
            会员卡，会员名，电话，手机 <el-button type="success">查询</el-button>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="cardid" label="会员卡卡号">
                </el-table-column>
                <el-table-column prop="username" label="会员姓名">
                </el-table-column>
                <el-table-column prop="usergrade" label="会员等级">
                </el-table-column>
                <el-table-column prop="userintegral " label="会员积分">
                </el-table-column>
                <el-table-column prop="discount" label="折扣">
                </el-table-column>
                 <el-table-column prop="userstate" label="用户状态">
                </el-table-column>
                <el-table-column prop="tel" label="手机号">
                </el-table-column>
                <el-table-column prop="landlinenumber" label="座机号">
                </el-table-column>
                <el-table-column prop="manage" label="管理">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>


<script>
export default {
  data() {
    return {
      input: "",
      tableData: [
        // {
        //   cardid: "",
        //   username: "",
        //   usergrade: "",
        //   userintegral: "",
        //   discount: "",
        //   userstate:"",
        //   tel: "",
        //   landlinenumber: ""
        // }
      ]
    };
  },
  // 方法
  methods:{
    // 编辑触发函数
    handleEdit(cardid){
      console.log("修改？"+cardid);
    },

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
    // .el-card__body {
    //   .el-input {
    //   }
    // }
  }
}
</style>