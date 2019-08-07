import axios from '@/units/axios';

export {
    GetAuthorizeUrl,
    Authorize,
    Login,
    BindPhone,
    SendPhoneCode
}

/**
 * 获取授权跳转地址
 *
 * @constructor
 */
let GetAuthorizeUrl = (redirect_uri)=> axios({
    method:'post',
    url:'wechat/get_authorize_url/',
    data:{redirect_uri},
    headers:{
        hideLoading:true,
    },
})

/**
 * 通过授权code获取用户信息
 *
 * @constructor
 */
let Authorize = (code)=> axios({
    method:'get',
    url:'wechat/authorize_callback?code='+code,
    headers:{
        hideLoading:true,
    },
})

/**
 * 发送手机验证码
 *
 * @param phone
 * @constructor
 */
let SendPhoneCode = (phone)=> axios({
    method:'post',
    url:'wechat/send_phone_code',
    data:{phone:phone}
});

/**
 * 绑定手机号
 *
 * @param phone
 * @param code
 * @constructor
 */
let BindPhone = (phone,code)=> axios({
    method:'post',
    url:'wechat/bind_phone',
    data:{phone:phone,code:code,openid:localStorage.openid}
});

/**
 * 登录
 *
 * @param username
 * @param password
 * @constructor
 */
let Login =(username,password)=> axios({
    method:'post',
    url:'login',
    data:{username:username,password:password}
});
