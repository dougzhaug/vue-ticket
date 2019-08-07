<template>
    <div>
        <NavBar
                title="赠送卡券详情"
                left-text=""
                left-arrow
                fixed
                :border=false
                @click-left="onClickLeft"
        />
        <div class="card-box">
            <div class="card" :style="{backgroundImage: 'url(' + imagesUrl(bgImg) + ')',backgroundSize:'cover'}">
                <div class="card-top" >
                    <img class="card-logo" :src="imagesUrl(logo)" alt="">
                    <div class="card-top-right">
                        <div class="right-text">
                            <div class="text-title" :style="{'color':give.goods.title_font_color}">{{give.goods.name}}</div>
                            <div class="text-depict" :style="{'color':give.goods.title_font_color}">{{give.goods.memo}}</div>
                        </div>
                    </div>
                </div>
                <div class="card-body">

                </div>

                <div class="card-bottom">
                </div>
            </div>


            <div class="nav-list">
                <Cell icon="" title="赠送记录" is-link :to="'giveRecord?id='+give.id" size="large" />
            </div>

            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" href="javascript:" @click="toggleGuideSharing" id="login">分享</a>

            </div>
            <Popup v-model="guideSharingShow">
                <img width="100%" src="@/assets/images/guide_sharing.png" alt="">
                <div style="margin-top: 2rem;">
                    <Button block="true" @click="toggleGuideSharing">关闭</Button>
                </div>

            </Popup>
        </div>
    </div>
</template>

<script>
    import { NavBar, Icon , Popup, Cell,Button } from 'vant';
    import { GetGiveDetails,GetGiveShareCode } from './api'
    export default {
        name: "GiveDetails",
        components:{
            NavBar,
            Icon,
            Popup,
            Cell,
            Button
        },
        data(){
            return {
                qrShow:true,
                num: 1234888888888888,
                give:'',
                cardName:null,
                logo:null,
                bgImg:null,
                isExpire:false,     //卡券是否过期
                guideSharingShow:false,

                //分享
                shareTitle:null,
                shareDesc:null,
                shareLink:null,
                shareImgUrl:null,
            }
        },
        methods:{
            onClickLeft(){
                this.$router.go(-1);
            },
            handleQrClick(id){
                this.$router.push({path:'/cardQr?id=' + id})
            },
            formatNum(num){
                return String(num).replace(/(.{4})/g, "$1 ");
            },

            wxRegCallback () {
                // 用于微信JS-SDK回调
                this.wxShareTimeline()
                this.wxShareAppMessage()
            },
            wxShareTimeline () {
                console.log(this.shareLink);
                var that = this;
                // 微信自定义分享到朋友圈
                let option = {
                    title: this.shareTitle, // 分享标题, 请自行替换
                    link: this.shareLink, // 分享链接，根据自身项目决定是否需要split
                    imgUrl: this.shareImgUrl, // 分享图标, 请自行替换，需要绝对路径
                    success: () => {
                        // alert('分享成功')
                        that.getShareData();
                    },
                    error: () => {
                        alert('已取消分享')
                    }
                }
                // 将配置注入通用方法
                this.$wxapi.TimelineShareData(option)
            },
            wxShareAppMessage () {
                // 微信自定义分享给朋友
                var that = this;
                let option = {
                    title: this.shareTitle, // 分享标题, 请自行替换
                    desc: this.shareDesc, // 分享描述, 请自行替换
                    link: this.shareLink, // 分享链接，根据自身项目决定是否需要split
                    imgUrl: this.shareImgUrl, // 分享图标, 请自行替换，需要绝对路径
                    success: () => {
                        // alert('分享成功')
                        that.getShareData();
                    },
                    error: () => {
                        alert('已取消分享')
                    }
                }
                // 将配置注入通用方法
                this.$wxapi.AppMessageShareData(option)
            },
            //获取分享数据
            getShareData(){
                GetGiveShareCode(this.$route.query.id).then((response)=>{
                    // alert(response);
                    this.shareTitle = response.title;
                    this.shareDesc = response.desc;
                    this.shareLink = response.link;
                    this.shareImgUrl = response.imgUrl;
                    this.$wxapi.wxRegister(this.wxRegCallback)
                })

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
            },
            //切换分享提示层
            toggleGuideSharing(){
                this.guideSharingShow = !this.guideSharingShow;
            },
            imagesUrl(url){
                return this.unit.jointImgUrl(url)
            }
        },

        created() {
            //获取赠送卡券信息
            GetGiveDetails(this.$route.query.id).then((response)=>{
                this.give = response;
                this.bgImg = response.goods.photo.photopath;
                this.logo = response.goods.photo.photopath;
            })

        },
        mounted() {
            this.getShareData();
        }
    }
</script>

<style lang="scss" scoped>
    .card-box{
        margin-top: 56px;
        margin-bottom: 10px;
        width: 100%;
        /*margin: 2rem 0;*/
        /*background-color: #42b983;*/
        display: flex;
        flex-direction: column;
        align-items:center;
        justify-content:center;
    }
    .card{
        width: 80%;
        height: 0;
        position: relative;
        padding-bottom: 50%;
        /*background-color: #f8f8f8;*/
        border-radius:.7rem;
    }
    .card-top{
        display: flex;
    }
    .card-logo{
        margin: .8rem;
        width: 2.6rem;
        height: 2.6rem;
        border-radius:7rem;
    }
    .card-top-right{
        /*background-color: red;*/
        height: 4.2rem;
        width: 75%;
        display: flex;
    }
    .right-text{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        /*align-items:center;*/
        justify-content:center;
        color: white;
    }
    .text-title{
        font-weight: bold;
        font-size: 16px;
        overflow: hidden;/*超出部分隐藏*/
        white-space: nowrap;/*不换行*/
        text-overflow:ellipsis;/*超出部分文字以...显示*/
    }
    .text-depict{
        font-size: 12px;
        overflow: hidden;/*超出部分隐藏*/
        white-space: nowrap;/*不换行*/
        text-overflow:ellipsis;/*超出部分文字以...显示*/
    }
    .card-body{
        position:absolute;
        width: 100%;
        height: 36%;
        display: flex;
        flex-direction:row-reverse;
        /*justify-content:center;*/
    }
    .card-body-icon{
        color: white;
        width: 40%;
        display: flex;
        align-items:center;
        justify-content:center;
    }

    .card-bottom{
        position:absolute;
        bottom:0;
        height: 25%;
        display: flex;
        justify-content:center;
    }
    .card-bottom-num{
        /*margin-top: 10%;*/
        margin-left: 1.5rem;
        display: flex;
        align-items:center;
        width: 100%;
        /*height: 3rem;*/
        color: white;
        font-size: 20px;
    }

    .waist{
        /*margin-top: 1rem;*/
        width: 100%;
        height: 5rem;
        /*background-color: #2c3e50;*/
        display: flex;
        justify-content:space-around;
        /*flex-direction: column;*/
    }
    .waist-item{
        width: 100%;
        height: 100%;
        /*background-color: darkgray;*/
        display: flex;
        flex-direction: column;
        justify-content:center;
    }
    .item-box{
        height: 65%;
        display: flex;
        flex-direction: column;
        border-right: 0.01rem solid gainsboro;
    }
    .waist-item-title{
        width: 100%;
        height: 70%;
        /*background-color: red;*/
        text-align: center;
        display: flex;
        align-items:center;
        justify-content:center;
        font-size: 14px;
    }
    .waist-item-value{
        width: 100%;
        height: 100%;
        /*background-color: darkgoldenrod;*/
        text-align: center;
        font-size: 20px;
        display: flex;
        align-items:center;
        justify-content:center;
        color: #42b983;
    }

    .nav-list{
        width: 95%;
        margin-top: 1rem;
    }
    .expire{
        filter:grayscale(100%);
    }
    .van-popup--center{
        top: 38%;
        left: 50%;
        right: -50%;
        background-color: rgba(0,0,0,.35);
    }
</style>