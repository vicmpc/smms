<template>
    <div class="nav">
        <el-menu :default-active="$route.path" :unique-opened="true" active-text-color="rgb(64, 158, 255)" router>
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-tickets"></i>分类管理</template>
                    <el-menu-item index="add-classification">添加分类</el-menu-item>
                    <el-menu-item index="sort-management">分类管理</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-view"></i>商品管理</template>
                    <el-menu-item index="add-product">添加商品</el-menu-item>
                    <el-menu-item index="product-list">商品列表</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-goods"></i>进货管理</template>
                    <el-menu-item index="add-inventory">添加库存</el-menu-item>
                    <el-menu-item index="inventory-list">库存列表</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-sold-out"></i>出货管理</template>
                    <el-menu-item index="sales-list">销售列表</el-menu-item>
                    <el-menu-item index="product-delivery">商品出库</el-menu-item>
                    <el-menu-item index="product-return">商品退货</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title"><i class="el-icon-edit-outline"></i>统计管理</template>
                    <el-menu-item index="sales-statistics">销售统计</el-menu-item>
                    <el-menu-item index="incoming-statistics">进货统计</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title"><i class="el-icon-star-off"></i>账号管理</template>
                    <el-menu-item index="my-account">账号管理</el-menu-item>
                    <el-menu-item index="add-account">添加账号</el-menu-item>
                    <el-menu-item index="change-pwd">修改密码</el-menu-item>
            </el-submenu>
            <el-submenu index="7">
                <template slot="title"><i class="el-icon-star-on"></i>会员管理</template>
                    <el-menu-item index="my-member">账号管理</el-menu-item>
                    <el-menu-item index="add-member">添加账号</el-menu-item>
            </el-submenu>
            <el-submenu index="8">
                <template slot="title"><i class="el-icon-menu"></i>系统管理</template>
                    <el-menu-item index="/">系统信息</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {};
</script>

<style lang="less">
    .nav {
        .el-menu {
            border: none;
        }
    }

</style>