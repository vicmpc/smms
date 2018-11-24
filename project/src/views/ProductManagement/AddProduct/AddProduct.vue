<template>
    <div class="add-product">
        <el-tabs type="border-card">
            
            <el-tab-pane label="添加商品">
                <p>所属分类：</p>
                <el-select v-model="value" placeholder="-----选择分类-----">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <p>商品条形码：</p>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
                <el-button type="success">生成条形码</el-button>
                <p>商品名称：</p>
                <el-input v-model="input1"></el-input>
                <p>商品售价：</p>
                <el-input v-model="input2"></el-input>元
                <p>市场价：</p>
                <el-input v-model="input3"></el-input>元<br>
                <span>默认市场价为售价的1.2倍</span>
                <p>商品进价：</p>
                <el-input v-model="input4"></el-input>元
                <p>入库数量：</p>
                <el-input v-model="input5"></el-input>
                <p>商品重量：</p>
                <el-input v-model="input6"></el-input>
                <p>商品进价：</p>
                <el-input v-model="input7"></el-input>
                <p>商品单位：</p>
                <el-input v-model="input8"></el-input>
                <p>会员优惠：</p>
                <el-radio v-model="radio1" label="1">享受</el-radio>
                <el-radio v-model="radio1" label="2">不享受</el-radio>
                <p>是否促销：</p>
                <el-radio v-model="radio2" label="1">启用</el-radio>
                <el-radio v-model="radio2" label="2">禁用</el-radio>
                <p>商品简介：</p>
                <textarea style="width:800px; height:50px;" name="商品简介" ></textarea><br>
                <span>不超过200个汉字</span>
                <p>
                    <el-button type="success">添加</el-button>
                </p>
                
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input1: '',
            input2: '',
            input3: '',
            input4: '',
            input5: '',
            input6: '',
            input7: '',
            input8: '',
             radio1: '1',
             radio2: '1',
            options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        value: ''
        }
  }
}
</script>
<style lang="less">
    .add-product {
        flex: 1;
        .el-tabs__nav{
            float:right;
        }
        .el-button{
            margin-left: 20px;
        }
    }

</style>