import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index/Index.vue'
import Authorize from './views/login/Authorize.vue'
import bindPhone from './views/login/BindPhone.vue'
import Login from './views/login/Login.vue'
import Goods from './views/goods/Goods.vue'
import GoodsDetails from './views/goods/GoodsDetails.vue'
import My from './views/my/My.vue'
import MyCard from './views/my/MyCard.vue'
import MyQr from './views/my/MyQr.vue'
import MyGive from './views/my/MyGive.vue'
import BindCard from './views/my/BindCard.vue'
import CardDetails from './views/card/CardDetails.vue'
import CardRecord from './views/card/CardRecord.vue'
import CardQr from './views/card/CardQr.vue'
import Order from './views/order/Order.vue'
import OrderList from './views/order/OrderList.vue'
import OrderDetails from './views/order/OrderDetails.vue'
import OrderClause from './views/order/OrderClause.vue'
import PaySuccess from './views/order/PaySuccess.vue'
import PayError from './views/order/PayError.vue'
import GiveDetails from './views/give/GiveDetails.vue'
import Receive from './views/give/Receive.vue'
import GiveRecord from './views/give/GiveRecord.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/authorize',
      name: 'authorize',
      component: Authorize,
      meta: {
        title: '授权中...'
      },
    },
    {
      path: '/bindPhone',
      name: 'bindPhone',
      component: bindPhone,
      meta: {
        title: '绑定手机'
      },
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login
    // },
    {
      path: '/goods',
      name: 'goods',
      component: Goods,
      meta: {
        title: '荆门汉通游泳馆'
      },
    },
    {
      path: '/goodsDetails',
      name: 'goodsDetails',
      component: GoodsDetails
    },
    {
      path: '/my',
      name: 'my',
      component: My,
      meta: {
        title: '我的'
      },
    },
    {
      path: '/myCard',
      name: 'myCard',
      component: MyCard,
      meta: {
        title: ''
      },
    },
    {
      path: '/myQr',
      name: 'myQr',
      component: MyQr,
      meta: {
        title: ''
      },
    },
    {
      path: '/myGive',
      name: 'myGive',
      component: MyGive,
      meta: {
        title: ''
      },
    },
    {
      path: '/bindCard',
      name: 'bindCard',
      component: BindCard,
      meta: {
        title: ''
      },
    },
    {
      path: '/cardDetails',
      name: 'cardDetails',
      component: CardDetails,
      meta: {
        title: ''
      },
    },
    {
      path: '/cardQr',
      name: 'cardQr',
      component: CardQr,
      meta: {
        title: ''
      },
    },
    {
      path: '/cardRecord',
      name: 'cardRecord',
      component: CardRecord,
      meta: {
        title: '消费记录'
      },
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta: {
        title: ''
      },
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: OrderList,
      meta: {
        title: ''
      },
    },
    {
      path:'/orderDetails',
      name:'orderDetails',
      component: OrderDetails,
      meta: {
        title: ''
      },
    },
    {
      path:'/orderClause',
      name:'orderClause',
      component:OrderClause,
      meta: {
        title: ''
      },
    },
    {
      path:'/paySuccess',
      name:'paySuccess',
      component:PaySuccess,
      meta: {
        title: '成功'
      },
    },
    {
      path:'/payError',
      name:'payError',
      component:PayError,
      meta: {
        title: '异常'
      },
    },
    {
      path: '/giveDetails',
      name: 'giveDetails',
      component: GiveDetails,
      meta: {
        title: ''
      },
    },
    {
      path: '/receive',
      name: 'receive',
      component: Receive,
      meta: {
        title: ''
      },
    },
    {
      path: '/giveRecord',
      name: 'giveRecord',
      component: GiveRecord,
      meta: {
        title: ''
      },
    },
  ]
})
