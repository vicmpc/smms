//引入Vue
import Vue from 'vue';
//引入路由
import Router from 'vue-router';
//引入组件
//登陆
import Login from '@/views/Login/Login';
//后端首页
import SystemInformation from '@/views/SystemManagement/SystemInformation/Index';
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
      name: 'system-information',
      path: '/',
      component: SystemInformation
    }
  ]
})
