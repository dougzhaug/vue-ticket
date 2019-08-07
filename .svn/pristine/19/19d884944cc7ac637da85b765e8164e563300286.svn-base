<template>
    <div>
        <NavBar
                title="卡券领取"
                left-text=""
                :left-arrow=false
                fixed
                :border=true
                @click-left="onClickLeft"
        />
        <div class="benefactor">
            <div class="benefactor-logo">
                <img :src="imagesUrl(employee.hyphoto.photopath)" alt="">
            </div>
            <div class="benefactor-right">
                <div class="benefactor-name">{{employee.nickname}}</div>
                <div class="benefactor-describe">赠送了您一张卡券</div>
            </div>
        </div>
        <div class="card-box">
            <div class="card" :style="{backgroundImage: 'url(' + imagesUrl(bgImg) + ')',backgroundSize:'cover'}" :class="{'expire':isExpire}">
                <div class="card-top" >
                    <img class="card-logo" :src="imagesUrl(logo)" alt="">
                    <div class="card-top-right">
                        <div class="right-text">
                            <div class="text-title" :style="{'color':give.goods.title_font_color}">{{give.goods.name}}</div>
                            <div class="text-depict" :style="{'color':give.goods.title_font_color}">{{give.goods.memo}}</div>
                        </div>
                    </div>
                </div>

            </div>


            <div class="nav-list">

            </div>

            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" href="javascript:" @click="handleReceive" id="login">立即领取</a>
            </div>
        </div>
    </div>
</template>

<script>
    import { NavBar, Icon, Popup, Cell, Button, Dialog } from 'vant';
    import { GetGiveReceive, ReceiveGive } from './api'
    export default {
        name: "Receive",
        components:{
            NavBar,
            Icon,
            Popup,
            Cell,
            Button,
            Dialog
        },
        data(){
            return {
                qrShow:true,
                num: null,
                give:'',
                logo:null,
                bgImg:null,
                employee:null,
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
            toggleGuideSharing(){
                this.guideSharingShow = !this.guideSharingShow;
            },
            handleReceive(){
                ReceiveGive(this.$route.query.code).then((response)=>{
                    Dialog.alert({
                        title: '成功',
                        message: '恭喜您领取成功'
                    }).then(() => {
                        this.$router.push({path:'/my'})
                    });
                })
            },
            imagesUrl(url){
                return this.unit.jointImgUrl(url)
            }
        },
        created() {
            //获取分享的卡券信息
            GetGiveReceive(this.$route.query.code).then((response)=>{
                this.give = response.give;
                this.employee = response.presenter;
                this.bgImg = response.give.goods.photo.photopath;
                this.logo = response.give.goods.photo.photopath;
            })
        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
    .benefactor{
        margin-top: 56px;
        width: 100%;
        height: 3rem;
        display: flex;
        /*background-color: #1989fa;*/
    }
    .benefactor-logo{
        width: 3rem;
        height: 100%;
        margin: 0 1rem 0 1.5rem;

    }
    .benefactor-logo img{
        width: 100%;
        height: 100%;
        border-radius:5rem;
    }
    .benefactor-right{
        display: flex;
        flex-direction:column;
        justify-content:center;
    }
    .benefactor-name{
        font-weight: bold;
        height: 60%;
        display: flex;
        align-items:center;
    }
    .benefactor-describe{
        font-size: 12px;
        color: grey;
    }
    .card-box{
        margin-top: 20px;
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
    .weui-btn{
        width: 260px;
    }
</style>