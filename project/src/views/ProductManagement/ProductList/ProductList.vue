<template>
    <div class="product-list">
        <el-tab-pane label="商品管理">
            <el-select v-model="value" placeholder="-----选择分类-----">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            关键字：<el-input v-model="input" placeholder="请输入内容"></el-input>(商品名称、条形码) 
            <el-button type="success">查询</el-button>
        </el-tab-pane>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                value:'',
                input:'',
          options: [
              {
          value: '选项1',
          label: '黄金糕'
            },
            {
        value: '选项1',
          label: '黄金糕'
            }
            ]
            }
        }
    };
</script>

<style lang="less">

</style>