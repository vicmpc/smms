<template>
    <div class="sales-list">
        <!-- 主体 -->
        <el-main>
            <el-card class="box-card">
                <!-- 面板标题 -->
                <div slot="header" class="clearfix">
                    <span>销售明细</span>
                </div>
                <!-- 面板内容 -->
                <span>日期查询：</span>
                <el-date-picker
                        v-model="value7"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
                </el-date-picker>
                <span>关键字查询：</span>
                <el-input placeholder="商品名称，订单号，客户名字，会员卡号" v-model="input23">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="orderCode" label="订单号" width="180">
                    </el-table-column>
                    <el-table-column prop="orderName" label="名称" width="180">
                    </el-table-column>
                    <el-table-column prop="orderNum" label="数量">
                    </el-table-column>
                    <el-table-column prop="trueSale" label="实际售价">
                    </el-table-column>
                    <el-table-column prop="offSale" label="优惠（促销/会员）">
                    </el-table-column>
                    <el-table-column prop="orderReturn" label="退款">
                    </el-table-column>
                    <el-table-column prop="orderDate" label="销售时间">
                    </el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        v-model="currentPage4"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="40">
                </el-pagination>
            </el-card>
        </el-main>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        tableData: [
          {
            orderCode: '110102540103',
            orderName: '辣条',
            orderNum: '100',
            trueSale: '10元',
            offSale: '9.9元/无',
            orderReturn: '无退款',
            orderDate: '2018-11-24'
          },
          {
            orderCode: '110102540103',
            orderName: '辣条',
            orderNum: '1',
            trueSale: '10元',
            offSale: '无/无',
            orderReturn: '10元',
            orderDate: '2018-11-24'
          },
          {
            orderCode: '110102540103',
            orderName: '辣条',
            orderNum: '100',
            trueSale: '10元',
            offSale: '9.9元/无',
            orderReturn: '无退款',
            orderDate: '2018-11-24'
          },
          {
            orderCode: '110102540103',
            orderName: '辣条',
            orderNum: '100',
            trueSale: '10元',
            offSale: '9.9元/无',
            orderReturn: '无退款',
            orderDate: '2018-11-24'
          }
        ],
        value7: '',
        input23: '',
        currentPage4: ''
      };
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  };
</script>

<style lang="less">
    .sales-list {
        flex: 1;
        // 主体
        .el-main {
            .el-card {
                .el-card__header {
                    font-weight: 700;
                    font-size: 15px;
                    background-color: #f1f1f1;
                }
                .el-card__body {
                    .el-date-editor {
                        margin-right: 50px;
                    }
                    .el-input {
                        width: 350px;
                        margin-right: 50px;
                    }
                    .el-table {
                        margin: 25px 0;
                        border-top: 2px solid #ccc;
                        border-bottom: 2px solid #ccc;
                    }
                    .el-pagination {
                        width: 600px;
                        margin: auto;
                        span {
                            .el-input {
                                width: auto;
                                margin: 0;
                            }

                        }

                    }
                }
            }
        }
    }
</style>