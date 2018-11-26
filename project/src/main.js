//引入Vue
import Vue from 'vue';
//引入Element
import ElementUI from 'element-ui';
//引入ECharts
import ECharts from 'echarts';
//引入axios
// import axios from 'axios';
//引入ElementUI样式文件
import 'element-ui/lib/theme-chalk/index.css';
// 引入axios
import axios from 'axios';
// 把axios挂载在vue的原型上
Vue.prototype.axios = axios;


//引入基本（base）样式
import '@/common/css/base.css';
//引入顶级组件App
import App from './App.vue';
//引入路由
import router from './router';

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 定义一个登录状态
  let isLogin = false;

  // 允许携带cookie
  axios.defaults.withCredentials=true;
  // 发送请求 去检查用户是否登录（是否有cookie）
  axios.get('http://127.0.0.1:888/users/checkIsLogin')
    .then(response => {
      isLogin = response.data.isLogin;
      console.log(isLogin)
      // 如果已经登录 直接放行
      if (!isLogin) {
        if (to.path !== '/login') {
          return next({'path': '/login'})
        } else {
          next()
        }
      } else {
        next();
      }
    })
}) 

//注册ElementUI
Vue.use(ElementUI);
//注册ECharts
Vue.use(ECharts);
//将axios挂载在Vue原型上
// Vue.prototype.axios = axios;
//阻止生产提示
Vue.config.productionTip = false;
//创建Vue实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
