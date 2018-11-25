
<template>
    <div class="sort-management">
        <!-- 主体 -->
        <el-main>
            <el-card class="box-card">
                <!-- 面板标题 -->
                <div slot="header" class="clearfix">
                    <span>分类管理</span>
                </div>
                <!-- 面板内容 -->
                <div class="text item">
                    
                  <el-tabs type="border-card" label="分类管理">
                    <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="分类名称">
                        </el-table-column>
                        <el-table-column label="管理">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="danger"
                                @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tabs> 
                </div>
            </el-card>
        </el-main>
    </div>
</template>
<script>
export default {
  data() {
    return {
      radio: "1",
      input: "",
      tableData: [
        {
          name: "日用品",
          manage: ""
        },
        {
          name: "舒肤佳",
          manage: ""
        },
        {
          name: "舒肤佳A",
          manage: ""
        },
        {
          name: "舒肤佳B",
          manage: ""
        },
        {
          name: "海飞丝",
          manage: ""
        },
        {
          name: "食品",
          manage: ""
        },
        {
          name: "优乐美",
          manage: ""
        },
        {
          name: "烟酒",
          manage: ""
        },
        {
          name: "中华",
          manage: ""
        }
      ],
      options: [
        {
          label: "水果"
        },
        {
          label: "零食"
        }
      ],
      value: ""
    };
  },
  methods: {
      handleEdit(index, row) {
        console.log(index, row);
      }
    }
};
</script>
<style lang="less">
    .sort-management {
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
                    .item {
                        .el-alert {
                            margin-bottom: 20px;
                        }
                    }
                }
            }
        }
    }
</style>


