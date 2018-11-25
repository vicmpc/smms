<template>
    <div class="product-delivery">
        <!-- 主体 -->
        <el-main>
            <el-card class="box-card">
                <!-- 面板标题 -->
                <div slot="header" class="clearfix">
                    <span>商品销售</span>
                </div>
                <!-- 面板内容 -->
                <el-form :model="loginFrom" status-icon :rules="loginRules" ref="loginFrom" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="商品条形码" prop="productcode">
                        <el-input type="num" v-model.number="loginFrom.productcode" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="数量" prop="productnum">
                        <el-input type="num" v-model.number="loginFrom.productnum" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginFrom')" :plain="true">加入订单</el-button>
                        <el-button @click="resetForm('loginFrom')">重新出库</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="productName" label="名称" width="180">
                    </el-table-column>
                    <el-table-column prop="productNum" label="数量">
                    </el-table-column>
                    <el-table-column prop="singelPrice" label="单价（元）">
                    </el-table-column>
                    <el-table-column prop="totalPrice" label="总价（元）">
                    </el-table-column>
                    <el-table-column prop="offTotalPrice" label="优惠总价（元）">
                    </el-table-column>
                </el-table>
                <div class="product-price">
                    总价：0元，优惠0元。<span>小计：0元</span>
                </div>
                <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="会员卡号" prop="membercode" :rules="memberRules">
                        <el-input type="num" v-model.number="numberValidateForm.num" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">确认提交</el-button>
                    </el-form-item>
                </el-form>

            </el-card>
        </el-main>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        memberCode: '',
        loginFrom: {
          productcode: '',
          productnum: ''
        },
        loginRules: {
          productcode: [
            {required: true, message: '条形码不能为空', trigger: 'blur'},
            {type: 'number', message: '条形码须为数字值', trigger: 'blur'}
          ],
          productnum: [
            {required: true, message: '数量不能为空', trigger: 'blur'},

          ]
        },
        tableData: [],
        numberValidateForm: {
          num: ''
        },
        memberRules: [{type: 'number', message: '卡号必须为数字值', trigger: 'blur'}]
      }

    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
              message: '加入成功',
              type: 'success'
            });
          } else {
            alert('加入失败!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<style lang="less">
    .product-delivery {
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
                    }
                    .el-table {
                        border-top: 2px solid #ccc;
                    }
                    .product-price {
                        padding: 20px;
                        margin-bottom: 30px;
                        border-bottom: 2px solid #ccc;
                        span {
                            color: #f00;
                        }
                    }
                }
            }
        }
    }
</style>