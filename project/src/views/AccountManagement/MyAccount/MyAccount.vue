<template>
    <div class="my-account">
        <!-- 主体 -->
        <el-main>
            <el-card class="box-card">
                <!-- 面板标题 -->
                <div slot="header" class="clearfix">
                    <span>账号管理</span>
                </div>
                <!-- 面板内容 -->
                <el-table
                        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                    <el-table-column label="日期" prop="date">
                    </el-table-column>
                    <el-table-column label="用户名" prop="name">
                    </el-table-column>
                    <el-table-column label="用户组" prop="group">
                    </el-table-column>
                    <el-table-column align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
                        </template>
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit">修改</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-main>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2018-11-24',
          name: '王小虎',
          group: '超级用户'
        }],
        search: ''
      }
    },
    methods: {
      handleEdit() {
      },
      handleDelete() {
      }
    },
  };
</script>

<style lang="less">
    .my-account {
        flex: 1;
        // 主体
        .el-main {
            .el-card {
                .el-card__header {
                    font-weight: 700;
                    font-size: 15px;
                    background-color: #f1f1f1;
                }
            }
        }
    }
</style>