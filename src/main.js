import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Lazyload } from 'vant'
import weui from 'weui.js'
import wxapi from './units/wechat/jssdk.js'
import 'weui'
import unit from './units';

Vue.prototype.$weui = weui;

Vue.prototype.unit = unit;
Vue.config.productionTip = false;
Vue.prototype.$wxapi = wxapi;
Vue.use(Lazyload);  //懒加载
Vue.use(require('vue-wechat-title'));     //title处理插件


router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

  //判断有没有授权
  let openid = localStorage.openid;
  if(!openid || openid === undefined){
    const authorizeExceptRoute = ['authorize'];
    if (authorizeExceptRoute.indexOf(to.name) < 0) {
      localStorage.setItem('originRouter', to.fullPath);      //记录来源页面
      router.push({path: '/authorize',});
      return;
    }
  }

  // 是否登录
  let token = localStorage.token;
  if(!token || token === undefined){
    const exceptRoute = ['bindPhone','authorize','goods','goodsDetails'];      //无需验证登录的路由\
    if (exceptRoute.indexOf(to.name) < 0) {
      localStorage.setItem('originRouter', to.fullPath);      //记录来源页面
      router.push({ path: '/bindPhone', });
      return;
    }
  }

  // 已登录状态；当路由到login时，跳转至首页
  // if (to.name === 'bindPhone') {
  //   if (token != null) {
  //     router.push({ path: '/goods', });
  //   }
  // }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
