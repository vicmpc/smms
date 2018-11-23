<template>
    <div class="add-classification">
        <!-- 主体 -->
        <el-main>
            <el-card class="box-card">
                <!-- 面板标题 -->
                <div slot="header" class="clearfix">
                    <span>添加分类</span>
                </div>
                <!-- 面板内容 -->
                <div class="text item">
                    <el-form :model="loginFrom" status-icon :rules="loginRules" ref="loginFrom" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="所属分类：" prop="sort">
                            <el-select v-model="region" placeholder="-----顶级分类-----">
                                <el-option label="水果" value="shanghai"></el-option>
                                <el-option label="食品" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="分类名称" prop="sortname">
                            <el-input type="text" v-model="loginFrom.username" autocomplete="off" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item label="状态：" prop="state">
                            <el-radio v-model="radio" label="1">启用</el-radio>
                            <el-radio v-model="radio" label="2">禁用</el-radio>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('loginFrom')">添加</el-button>
                        </el-form-item>
                    </el-form>
                   
                </div>
            </el-card>
        </el-main>
    </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          label: "水果"
        },
        {
          label: "零食"
        }
      ],
      loginFrom: {
          sort: '',
          sortname:'',
          state:''
        },
        loginRules: {
          sortname:[
               { required: true, message: '请输入商品名称', trigger: 'blur' }
          ]
        },
      value: "",
      region:'',
      radio: '1',
      input: ''
    };
  },
  methods:{
    submitForm(){
      
    }
  }
};
</script>
<style lang="less">
.system-information {
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


