import axios from '@/units/axios';

export {
    getGoods,
    getGoodsDetails,
}

/**
 * 获取授权跳转地址
 *
 * @constructor
 */
let getGoods = ()=> axios({
    method:'get',
    url:'/goods',
    data:{},
});

/**
 * 通过授权code获取用户信息
 *
 * @constructor
 */
let getGoodsDetails = (id)=> axios({
    method:'get',
    url:'goods/'+id,
});