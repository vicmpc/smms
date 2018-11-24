<template>
    <div class="index">
        <!-- 容器 -->
        <el-container>
            <!-- 左 -->
            <el-aside width="200px">
                <!-- 导航组件 -->
                <Nav></Nav>
            </el-aside>
            <!-- 右 -->
            <el-container>
                    <!-- 头部 -->
                    <Header></Header>
                    <!-- 路由出口 -->
                    <router-view></router-view>
                    <!-- 尾部 -->
                    <Footer></Footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    //引入导航组件
    import Nav from '@/components/Nav/Nav.vue';
    //引入头部组件
    import Header from "@/components/Header/Header.vue";
    //引入尾部组件
    import Footer from "@/components/Footer/Footer.vue";
    //注册组件
    export default {
        components: {
            Nav,
            Header,
            Footer
        }
    };
</script>

<style lang="less">

    .index {
        height: 100%;
        .el-container {
            height: 100%;
            .el-aside {
                padding-top: 60px;
                background: #585eaa;
            }
            .el-container {
                overflow: auto;
                width: 100%;
                display: flex; // 让这个盒子 变为一个可以伸缩的盒子
                flex-direction: column; // 方向是 纵向
            }

        }
    }

</style>