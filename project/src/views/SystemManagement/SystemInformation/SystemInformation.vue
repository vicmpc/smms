<template>
    <div class="system-information">
        <!-- 主体 -->
        <el-main>
            <el-card class="box-card">
                <!-- 面板标题 -->
                <div slot="header" class="clearfix">
                    <span>系统信息</span>
                </div>
                <!-- 面板内容 -->
                <div class="text item">
                    <el-alert
                            title="商品总数"
                            type="info">
                    </el-alert>
                    <el-alert
                            title="导入数据"
                            type="success">
                    </el-alert>
                    <!-- 表格 -->
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <!-- 左侧表格 -->
                            <el-card>
                                <!-- 面板标题 -->
                                <div slot="header" class="clearfix">
                                    <span>销售排行</span>
                                </div>
                                <div class="text item">
                                    <!-- 表格 -->
                                    <el-table
                                            :data="tableDataLeft"
                                            style="width: 100%">
                                        <el-table-column
                                                prop="goodsname"
                                                label="商品名称"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="sales"
                                                label="销量">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="12">
                            <!-- 右侧表格 -->
                            <el-card>
                                <!-- 面板标题 -->
                                <div slot="header" class="clearfix">
                                    <span>缺货的商品</span>
                                </div>
                                <div class="text item">
                                    <!-- 表格 -->
                                    <el-table
                                            :data="tableDataRight"
                                            style="width: 100%">
                                        <el-table-column
                                                prop="goodsname"
                                                label="商品名称"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="repertoryCount"
                                                label="库存"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="option"
                                                label="操作">
                                        </el-table-column>

                                    </el-table>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </el-main>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                // 左侧表格数据
                tableDataLeft: [
                    {
                        goodsname: "油",
                        sales: 10
                    },
                    {
                        goodsname: "盐",
                        sales: 20
                    },
                    {
                        goodsname: "酱",
                        sales: 30
                    },
                    {
                        goodsname: "醋",
                        sales: 40
                    }
                ],
                tableDataRight: [
                    {
                        goodsname: "优乐美",
                        repertoryCount: 0,
                        option: '入库'
                    },
                    {
                        goodsname: "香飘飘",
                        repertoryCount: 0,
                        option: '入库'
                    },
                    {
                        goodsname: "立顿",
                        repertoryCount: 0,
                        option: '入库'
                    }
                ]
            };
        }
    };
</script>
<style lang="less">
    .system-information {
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


