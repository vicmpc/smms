<template>
    <div class="product-return">
        <!-- 主体 -->
        <el-main>
            <el-card class="box-card">
                <!-- 面板标题 -->
                <div slot="header" class="clearfix">
                    <span>商品退货</span>
                </div>
                <!-- 面板内容 -->
                <span>订单号：</span>
                <el-input placeholder="" v-model="input23">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <el-button type="primary" icon="el-icon-search">查询</el-button>
            </el-card>
        </el-main>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          input23:''
        }
      }
    };
</script>

<style lang="less">
    .product-return {
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
                    .el-input {
                        width: auto;
                        margin-right: 20px;
                    }
                }
            }
        }
    }
</style>