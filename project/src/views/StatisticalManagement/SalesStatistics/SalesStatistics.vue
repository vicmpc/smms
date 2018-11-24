<template>
    <div class="sales-statistics">
        <!-- 主体 -->
        <el-main>
            <el-card class="box-card">
                <!-- 面板标题 -->
                <div slot="header" class="clearfix">
                    <span>销售数据统计</span>
                </div>
                <!-- 面板内容 -->
                <span>时间：</span>
                <el-date-picker
                        v-model="value7"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
                </el-date-picker>
                <el-select v-model="value" placeholder="销售情况统计">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search">提交</el-button>
            </el-card>
        </el-main>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          pickerOptions2: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
          value7: '',
          options: [{
            value: '选项1',
            label: '销售情况统计'
          },
            {
              value: '选项2',
              label: '进货情况统计'
            }],
          value: ''
        }
      }
    };
</script>

<style lang="less">
    .sales-statistics {
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
                }
            }
        }
    }
</style>