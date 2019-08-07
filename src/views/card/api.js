import axios from '@/units/axios';

export {
    GetCard,
    GetCardDetails,
    GetCardRecord,
    GetCardQr,
    AddToWechatCard,
}


/**
 * 获取我的卡券列表
 *
 * @constructor
 */
let GetCard = (page,pageRows)=> axios({
    method:'get',
    url:'card',
    headers:{
        'XX-Page': page ? page : 1,
        'XX-PageRows': pageRows ? pageRows : 10,
    }
})

/**
 * 获取我的卡券详情
 *
 * @constructor
 */
let GetCardDetails = (card_id)=> axios({
    method:'get',
    url:'card/'+card_id,
});

/**
 * 获取消费记录信息
 *
 *
 * @param id
 * @param time
 * @param page
 * @param pageRows
 * @constructor
 */
let GetCardRecord = (card_id,time,page,pageRows)=>axios({
    method:'get',
    url:'consume',
    data:{
        card_id:card_id,
        time:time,
    },
    headers:{
        'XX-Page': page ? page : 1,
        'XX-PageRows': pageRows ? pageRows : 10,
    }
});

/**
 * 获取二维码随机值
 *
 * @param card_id
 * @constructor
 */
let GetCardQr = (card_id)=>axios({
    method:'get',
    url:'card/qr/'+card_id,
    headers:{
        // hideLoading:true,
    },
});

/**
 * 添加到微信卡包
 *
 * @constructor
 */
let AddToWechatCard = (card_id) => axios({
    method:'post',
    url:'card/add_to_wechat_card/'+card_id,
})

