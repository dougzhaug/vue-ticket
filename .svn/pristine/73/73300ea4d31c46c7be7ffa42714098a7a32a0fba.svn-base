import axios from '@/units/axios';

export {
    getWxPayInfo,
    getGoodsDetails,
    getCourseTerm,
    submitOrder,
    payOrder,
    getOrderList,
    getOrderDetails,
    cancelOrder,
    getTeacher,
}

/**
 * 获取授权跳转地址
 *
 * @constructor
 */
let getWxPayInfo = ()=> axios({
    method:'post',
    url:'order',
    data:{}
})

/**
 * 获取商品详情
 *
 * @param id
 */
let getGoodsDetails = (id)=> axios({
    method:'get',
    url:'goods/'+id,
});

/**
 * 获取课程信息
 *
 * @param goods_id
 */
let getCourseTerm = (goods_id)=> axios({
    method:'get',
    url:'course_term/'+goods_id,
});

/**
 * 提交订单
 *
 * @param goods_id
 * @param num
 * @param term
 * @param termTime
 */
let submitOrder = (goods_id,num,term,termTime,teacher)=> axios({
    method:'post',
    url:'order/create',
    data:{xid:goods_id,num:num,termdm:term,timedm:termTime,jsid:teacher}
});

/**
 * 购买已经生成的订单
 *
 * @param order_id
 */
let payOrder = (order_id)=> axios({
    method:'post',
    url:'order/pay',
    data:{oid:order_id}
});

/**
 * 获取订单列表
 */
let getOrderList = (status,page,pageRows) => axios({
    method:'get',
    url:'order',
    data:{status:status},
    headers:{
        'XX-Page': page ? page : 1,
        'XX-PageRows': pageRows ? pageRows : 10,
    }
});


/**
 * 获取订单详情
 */
let getOrderDetails = (order_id) => axios({
    method:'get',
    url:'order/' + order_id,
});

/**
 * 取消订单
 */
let cancelOrder = (order_id)=>axios({
    method:'put',
    url:'order/cancel/' + order_id,
});

/**
 * 获取教练信息
 */
let getTeacher = ()=>axios({
    method:'get',
    url:'user/teacher',
});