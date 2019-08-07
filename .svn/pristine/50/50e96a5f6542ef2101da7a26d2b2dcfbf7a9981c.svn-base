import axios from '@/units/axios';

export {
    GetBindCardList,
    BindCard,
    GetCard,
    GetMyQr,
    GetGoodsGive,
    GetUserInfo,
}

/**
 * 获取绑定会员卡列表
 *
 * @constructor
 */
let GetBindCardList = ()=> axios({
    method:'get',
    url:'card/bind_card_list',
    data:{},

});

let BindCard = (card_id)=> axios({
    method:'post',
    url:'card/bind_card',
    data:{card_id:card_id}
});

/**
 * 获取我的卡券列表
 *
 * @constructor
 */
let GetCard = (status,page,pageRows)=> axios({
    method:'get',
    url:'card',
    data:{
        status:status
    },
    headers:{
        'XX-Page': page ? page : 1,
        'XX-PageRows': pageRows ? pageRows : 10,
    }
});

let GetMyQr = ()=>axios({
    method:'get',
    url:'user/myQr',
    headers:{
        // hideLoading:true,
    },
});

/**
 * 获取我的赠送
 * @constructor
 */
let GetGoodsGive = (page,pageRows)=>axios({
    method:'get',
    url:'goods_give',
    headers:{
        'XX-Page': page ? page : 1,
        'XX-PageRows': pageRows ? pageRows : 10,
    }
});

let GetUserInfo = () => axios({
    method:'get',
    url:'user/info',
})
