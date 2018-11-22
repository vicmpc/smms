//引入Vue
import Vue from 'vue';
//引入路由
import Router from 'vue-router';
//引入组件
//登陆
import Login from '@/views/Login/Login';
//后端首页
import Index from '@/views/Index/Index.vue';
//分类管理
    //添加分类
    import AddClassification from '@/views/ClassifiedManagement/AddClassification/AddClassification.vue'
    //分类管理
    import SortManagement from '@/views/ClassifiedManagement/SortManagement/SortManagement.vue'
//商品管理
    //添加商品
    import AddProduct from '@/views/ProductManagement/AddProduct/AddProduct.vue'
    //商品列表
    import ProductList from '@/views/ProductManagement/ProductList/ProductList.vue'
//进货管理
    //添加库存
    import AddInventory from '@/views/StockManagement/AddInventory/AddInventory.vue'
    //库存列表
    import InventoryList from '@/views/StockManagement/InventoryList/InventoryList.vue'
//出货管理
    //销售列表
    import SalesList from '@/views/ShippingManagement/SalesList/SalesList.vue'
    //商品出库
    import ProductDelivery from '@/views/ShippingManagement/ProductDelivery/ProductDelivery.vue'
    //商品退货
    import ProductReturn from '@/views/ShippingManagement/ProductReturn/ProductReturn.vue'
//统计管理
    //销售统计
    import SalesStatistics from '@/views/StatisticalManagement/SalesStatistics/SalesStatistics.vue'
    //进货统计
    import IncomingStatistics from '@/views/StatisticalManagement/IncomingStatistics/IncomingStatistics.vue'
//账号管理
    //账号管理
    import MyAccount from '@/views/AccountManagement/MyAccount/MyAccount.vue'
    //添加账号
    import AddAccount from '@/views/AccountManagement/AddAccount/AddAccount.vue'
    //修改密码
    import ChangePwd from '@/views/AccountManagement/ChangePwd/ChangePwd.vue'
//会员管理
    //账号管理
    import MyMember from '@/views/MemberManagement/MyMember/MyMember.vue'
    //添加账号
    import AddMember from '@/views/MemberManagement/AddMember/AddMember.vue'
//系统管理
    //系统信息
    import SystemInformation from '@/views/SystemManagement/SystemInformation/SystemInformation.vue';

//注册路由
Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'index',
      path: '/',
      component: Index,
        //主页路由出口加载的组件
        children: [
            //添加分类
            {
                name: 'add-classification',
                path: '/add-classification',
                component: AddClassification,
            },
            //分类管理
            {
                name: 'sort-management',
                path: '/sort-management',
                component: SortManagement,
            },
            //添加商品
            {
                name: 'add-product',
                path: '/add-product',
                component: AddProduct,
            },
            //商品列表
            {
                name: 'product-list',
                path: '/product-list',
                component: ProductList,
            },
            //添加库存
            {
                name: 'add-inventory',
                path: '/add-inventory',
                component: AddInventory,
            },
            //库存列表
            {
                name: 'inventory-list',
                path: '/inventory-list',
                component: InventoryList,
            },
            //销售列表
            {
                name: 'sales-list',
                path: '/sales-list',
                component: SalesList,
            },
            //商品出库
            {
                name: 'product-delivery',
                path: '/product-delivery',
                component: ProductDelivery,
            },
            //商品退货
            {
                name: 'product-return',
                path: '/product-return',
                component: ProductReturn,
            },
            //销售统计
            {
                name: 'sales-statistics',
                path: '/sales-statistics',
                component: SalesStatistics,
            },
            //进货统计
            {
                name: 'incoming-statistics',
                path: '/incoming-statistics',
                component: IncomingStatistics,
            },
            //账号管理
            {
                name: 'my-account',
                path: '/my-account',
                component: MyAccount,
            },
            //添加账号
            {
                name: 'add-account',
                path: '/add-account',
                component: AddAccount,
            },
            //修改密码
            {
                name: 'change-pwd',
                path: '/change-pwd',
                component: ChangePwd,
            },
            //账号管理
            {
                name: 'my-member',
                path: '/my-member',
                component: MyMember,
            },
            //添加账号
            {
                name: 'add-member',
                path: '/add-member',
                component: AddMember,
            },
            //系统信息
            {
                name: 'system-information',
                path: '',
                component: SystemInformation,
            }
        ]
    }
  ]
})
