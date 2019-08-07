import wx from 'weixin-js-sdk';
import axios from '@/units/axios';

const wxApi = {
    /**
     * [wxRegister 微信Api初始化]
     * @param  {Function} callback [ready回调函数]
     */
    wxRegister (callback,location) {
        // 这边的接口请换成你们自己的
        axios({
            method:'post',
            url:'wechat/js_sdk',
            data:{current_url:location?location:window.location.href},
            headers:{
                hideLoading:true,
            },
        }).then((response) => {
            wx.config({
                debug: response.debug, // 开启调试模式
                appId: response.appId, // 必填，公众号的唯一标识
                timestamp: response.timestamp, // 必填，生成签名的时间戳
                nonceStr: response.nonceStr, // 必填，生成签名的随机串
                signature: response.signature, // 必填，签名，见附录1
                jsApiList: response.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
        }).catch((error) => {
            console.log(error)
        })
        wx.ready((res) => {
            // 如果需要定制ready回调方法
            if (callback) {
                callback()
            }
        })
        wx.error(function(res){
            console.log(res);
        })
    },
    /**
     * 手动初始化
     *
     * @param callback
     * @param option
     */
    wxManualRegister(callback,option){
        wx.config({
            debug: option.debug, // 开启调试模式
            appId: option.appId, // 必填，公众号的唯一标识
            timestamp: option.timestamp, // 必填，生成签名的时间戳
            nonceStr: option.nonceStr, // 必填，生成签名的随机串
            signature: option.signature, // 必填，签名，见附录1
            jsApiList: option.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready((res) => {
            // 如果需要定制ready回调方法
            if (callback) {
                callback()
            }
        })
    },
    /**
     * [ShareTimeline 微信分享到朋友圈]
     * @param {[type]} option [分享信息]
     * @param {[type]} success [成功回调]
     * @param {[type]} error   [失败回调]
     */
    TimelineShareData (option) {
        wx.onMenuShareTimeline({
            title: option.title, // 分享标题
            link: option.link, // 分享链接
            imgUrl: option.imgUrl, // 分享图标
            success () {
                // 用户成功分享后执行的回调函数
                option.success()
            },
            cancel () {
                // 用户取消分享后执行的回调函数
                option.error()
            }
        })
    },
    /**
     * [ShareAppMessage 微信分享给朋友]
     * @param {[type]} option [分享信息]
     * @param {[type]} success [成功回调]
     * @param {[type]} error   [失败回调]
     */
    AppMessageShareData (option) {
        wx.onMenuShareAppMessage({
            title: option.title, // 分享标题
            desc: option.desc, // 分享描述
            link: option.link, // 分享链接
            imgUrl: option.imgUrl, // 分享图标
            success () {
                // 用户成功分享后执行的回调函数
                option.success()
            },
            cancel () {
                // 用户取消分享后执行的回调函数
                option.error()
            }
        })
    },

    chooseWXPay(option){
        wx.chooseWXPay({
            timestamp: option.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: option.nonceStr, // 支付签名随机串，不长于 32 位
            package: option.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: option.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: option.paySign, // 支付签名
            success() {
                // 支付成功后的回调函数
                option.success()
            },
            cancel () {
                // 用户取消分享后执行的回调函数
                option.error()
            }
        })
    }
}
export default wxApi