<template>
  <div id="app">
      <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
    export default {
        components:{

        },
        data(){
            return {
            }
        },
        mounted() {
            const wxShareExceptRoute = ['giveDetails'];     //需要单独处理分享信息的页面
            if(wxShareExceptRoute.indexOf(this.$route.name) < 0){
                this.$wxapi.wxRegister(this.wxRegCallback)
            }
        },
        methods:{
            wxRegCallback () {
                // 用于微信JS-SDK回调
                this.wxShareTimeline();
                this.wxShareAppMessage();
            },
            wxShareTimeline () {
                // 微信自定义分享到朋友圈
                let option = {
                    title: '优惠多多，快来看看吧', // 分享标题, 请自行替换
                    link: this.getLocationHref(), // 分享链接，根据自身项目决定是否需要split
                    imgUrl: 'http://mp.card.dev.loveliyuan.com/img/logo.bdd78397.png', // 分享图标, 请自行替换，需要绝对路径
                    success: () => {
                        alert('分享成功')
                    },
                    error: () => {
                        alert('已取消分享')
                    }
                };
                // 将配置注入通用方法
                this.$wxapi.TimelineShareData(option)
            },
            wxShareAppMessage () {
                // 微信自定义分享给朋友
                let option = {
                    title: '优惠多多，快来看看吧', // 分享标题, 请自行替换
                    desc: '小礼品和电子卡券为优势，是目前亚洲知名的电子商务平台', // 分享描述, 请自行替换
                    link: this.getLocationHref(), // 分享链接，根据自身项目决定是否需要split
                    imgUrl: 'http://mp.card.dev.loveliyuan.com/img/logo.bdd78397.png', // 分享图标, 请自行替换，需要绝对路径
                    success: () => {
                        alert('分享成功')
                    },
                    error: () => {
                        alert('已取消分享')
                    }
                };
                // 将配置注入通用方法
                this.$wxapi.AppMessageShareData(option)
            },
            getLocationHref(){
                return this.replaceParamVal('openid',localStorage.openid);
            },
            /**
             * 替换参数
             *
             * @param paramName
             * @param replaceWith
             * @returns {string}
             */
            replaceParamVal(paramName,replaceWith) {
                var oUrl = window.location.href.toString();
                var re=eval('/('+ paramName+'=)([^&]*)/gi');
                var search = oUrl.search(re);
                if(search === -1){
                    if(oUrl.indexOf("?") === -1){
                        return oUrl + '?' + paramName + '=' + replaceWith;
                    }else{
                        return oUrl + '&' + paramName + '=' + replaceWith;
                    }
                }else{
                    return oUrl.replace(re,paramName+'='+replaceWith);
                }
            }
        }
    }
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
