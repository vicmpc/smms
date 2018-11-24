<template>
    <div class="add-inventory">
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
                        <p>计重商品单位为千克</p>
                    </el-form-item>
                    <el-form-item label="进价" prop="productprice">
                        <el-input type="num" v-model.number="loginFrom.productprice" autocomplete="off"></el-input>
                        <span> 元</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginFrom')" :plain="true">入库</el-button>
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
        loginFrom: {
          productcode: '',
          productnum: '',
          productprice: ''
        },
        loginRules: {
          productcode: [
            {required: true, message: '条形码不能为空', trigger: 'blur'},
            {type: 'number', message: '条形码须为数字值', trigger: 'blur'}
          ],
          productnum: [
            {required: true, message: '数量不能为空', trigger: 'blur'},
            {type: 'number', message: '价格须为数字值', trigger: 'blur'}
          ],
          productprice: [
            {required: true, message: '价格不能为空', trigger: 'blur'},
            {type: 'number', message: '价格须为数字值', trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
              message: '入库成功',
              type: 'success'
            });
          } else {
            alert('入库失败!');
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
    .add-inventory {
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
                    p {
                        font-size: 12px;
                        line-height: 12px;
                        margin: 0;
                        padding-top: 3px;
                    }
                }
            }
        }
    }
</style>