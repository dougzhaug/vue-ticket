import axios from '@/units/axios';

export {
    GetGiveDetails,
    GetGiveShareCode,
    GetGiveReceive,
    ReceiveGive,
    GetGiveRecord
}

/**
 * 获取我的卡券详情
 *
 * @constructor
 */
let GetGiveDetails = (give_id)=> axios({
    method:'get',
    url:'goods_give/'+give_id,
});

/**
 * 获取分享的码
 *
 * @param give_id
 * @constructor
 */
let GetGiveShareCode = (give_id)=>axios({
    method:'get',
    url:'goods_give/share_code/'+give_id,
});

/**
 * 获取赠送的卡券信息
 *
 * @param code
 * @constructor
 */
let GetGiveReceive= (code)=>axios({
    method:'get',
    url:'goods_give/receive_read/'+code,
});

/**
 * 领取赠送的卡券
 *
 * @param code
 * @constructor
 */
let ReceiveGive = (code)=>axios({
    method:'post',
    data:{code:code},
    url:'goods_give/receive_give',
});

/**
 * 赠送记录
 *
 * @param give_id
 * @param page
 * @param pageRows
 * @constructor
 */
let GetGiveRecord = (give_id,page,pageRows) =>axios({
    method:'get',
    url:'goods_give/record',
    data:{
        id:give_id,
    },
    headers:{
        'XX-Page': page ? page : 1,
        'XX-PageRows': pageRows ? pageRows : 20,
    }
})

