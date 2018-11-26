<template>
  <div class="product-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品管理</span>

      </div>
      <div>
        <el-select v-model="value" placeholder="---选择分类---">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        关键字：<el-input v-model="input"></el-input>（商品名称，条形码）
        <el-button type="success">查询</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="barcode" label="商品条形码">
        </el-table-column>
        <el-table-column prop="name" label="商品名称">
        </el-table-column>
        <el-table-column prop="goodscategory" label="所属分类">
        </el-table-column>
        <el-table-column prop="price " label="售价（元）">
        </el-table-column>
        <el-table-column prop="goodscategory" label="促销价（元）">
        </el-table-column>
        <el-table-column prop="promotionprice" label="市场价（元）">
        </el-table-column>
        <el-table-column prop="repertory" label="库存">
        </el-table-column>
        <el-table-column prop="repertoryallprice" label="库存总额（元）">
        </el-table-column>
        <el-table-column prop="totalsales" label="销售总额（元）">
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
      value: "",
      input: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      tableData: [
        {
          barcode: "2016-05-02",
          name: "王小虎",
          goodscategory: "上海市普陀区金沙江路 1518 弄",
          price: "222",
          goodscategory: "333",
          promotionprice: "356",
          repertory: "88",
          repertoryallprice: "9000",
          totalsales: "666666"
        }
      ]
    };
  },
   methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
};
</script>

<style lang="less">
.product-list {
  flex: 1;
  // 主体

  .el-card {
    .el-card__header {
      font-weight: 700;
      font-size: 15px;
      background-color: #f1f1f1;
    }
    .el-card__body {
      .el-input {
        display: inline;
        .el-input__inner {
          width: 300px;
        }
      }
    }
  }
}
</style>