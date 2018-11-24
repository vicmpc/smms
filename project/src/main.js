//引入Vue
import Vue from 'vue';
//引入Element
import ElementUI from 'element-ui';
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
//注册ElementUI
Vue.use(ElementUI);
//阻止生产提示
Vue.config.productionTip = false
//创建Vue实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
