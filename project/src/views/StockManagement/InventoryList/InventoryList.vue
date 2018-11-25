<template>
    <div class="inventory-list">
        <!-- 主体 -->
        <el-main>
            <el-card class="box-card">
                <!-- 面板标题 -->
                <div slot="header" class="clearfix">
                    <span>库存管理</span>
                </div>
                <!-- 面板内容 -->
                <span>分类：</span>
                <el-select v-model="value8" filterable placeholder="========== 选 择 分 类 ==========">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <span>关键字：</span>
                <el-input placeholder="商品名称，条形码" v-model="input23">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="inventoryCode" label="商品条形码">
                    </el-table-column>
                    <el-table-column prop="inventoryName" label="商品名称">
                    </el-table-column>
                    <el-table-column prop="inventoryPrice" label="进价（元）">
                    </el-table-column>
                    <el-table-column prop="inventoryIn" label="入库">
                    </el-table-column>
                    <el-table-column prop="inventoryAll" label="库存">
                    </el-table-column>
                    <el-table-column prop="inventoryOut" label="已售">
                    </el-table-column>
                    <el-table-column align="center" label="管理">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit">修改</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete">删除</el-button>
                        </template>
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
        options: [{
          value: '选项1',
          label: '生鲜'
        }, {
          value: '选项2',
          label: '速食'
        }, {
          value: '选项3',
          label: '洗化'
        }, {
          value: '选项4',
          label: '日用'
        }],
        value8: '',
        tableData: [
          {
            inventoryCode: '110102540103',
            inventoryName: '辣条',
            inventoryPrice: '100',
            inventoryIn: '10',
            inventoryAll: '4',
            inventoryOut: '6'
          },
          {
            inventoryCode: '110102540103',
            inventoryName: '辣条',
            inventoryPrice: '100',
            inventoryIn: '10',
            inventoryAll: '5',
            inventoryOut: '5'
          },
          {
            inventoryCode: '110102540103',
            inventoryName: '辣条',
            inventoryPrice: '100',
            inventoryIn: '10',
            inventoryAll: '0',
            inventoryOut: '10'
          },
          {
            inventoryCode: '110102540103',
            inventoryName: '辣条',
            inventoryPrice: '100',
            inventoryIn: '10',
            inventoryAll: '10',
            inventoryOut: '0'
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
      },
      handleEdit() {
      },
      handleDelete() {
      }
    }
  };
</script>

<style lang="less">
    .inventory-list {
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
                        .el-table__body {
                            .el-table_1_column_3 {
                                color: #f00;
                            }
                            .el-table_1_column_5 {
                                color: #f00;
                            }
                        }

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