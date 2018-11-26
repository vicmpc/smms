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
          <el-form :model="sortFrom" status-icon :rules="classificationRules" ref="sortFrom" label-width="100px" class="demo-ruleForm">
            <el-form-item label="所属分类：" prop="sort">
              <el-select v-model="sortFrom.sort" placeholder="-----顶级分类-----">
                <el-option label="水果" value="水果"></el-option>
                <el-option label="食品" value="食品"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分类名称" prop="sortname">
              <el-input type="text" v-model="sortFrom.sortname" autocomplete="off" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="用户状态" prop="userstate">
              <el-radio-group v-model="sortFrom.userstate">
                <el-radio label="启用"></el-radio>
                <el-radio label="禁用"></el-radio>
              </el-radio-group>
            </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('sortFrom')">添加</el-button>
              </el-form-item>
          </el-form>

        </div>
      </el-card>
    </el-main>
  </div>
</template>
<script>
// 引入qs
import qs from 'qs';
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
      sortFrom: {
        sort: "",
        sortname: "",
        userstate: ""
      },
      classificationRules: {
        // 验证用户组
        sort: [
          { required: true, message: "请选择分类", trigger: "change" } // 非空验证
        ],
        sortname: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
         // 用户状态
        userstate: [
          { required: true, message: "请选择用户状态", trigger: "change" } //状态验证
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //获取用户新增数据
          var params = {
            sort:this.sortFrom.sort,
            sortname:this.sortFrom.sortname,
            userstate:this.sortFrom.userstate
          }
          // 发送ajax请求，把数据发送给后端
          this.ajax.get('http://127.0.0.1:888/users/addclassification',
          qs.stringify(params),//参数处理
            {
              headers:{'Content-Type':'application/x-www-form-urlencoded'}
            }
          )
          .then(response => {
            // 如果请求状态码是1 那么就是请求成功
              if (response.data.rstCode === 1) {
                // 弹出提示信息
                this.$message({
                  type: "success",
                  message: response.data.msg
                });

                // 跳转到分类列表页面
                this.$router.push("/add-classification");
              } else {
                // 弹出账号添加失败信息
                this.$message.error(response.data.msg);
              }
          });
        } else {
          console.log("验证不通过不能发送");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
.add-classification {
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
          .el-input__inner {
            width: 300px;
          }
        }
      }
    }
  }
}
</style>


