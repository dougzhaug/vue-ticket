<template>
    <div>
        <NavBar
                title="卡券详情"
                left-text=""
                left-arrow
                fixed
                :border=false
                @click-left="onClickLeft"
        />
        <div class="card-box">
            <div class="card" :style="{backgroundImage: 'url(' + imagesUrl(bgImg) + ')',backgroundSize:'cover'}" :class="{'expire':isExpire}">
                <div class="card-top" >
                    <img class="card-logo" :src="imagesUrl(logo)" alt="">
                    <div class="card-top-right">
                        <div class="right-text">
                            <div class="text-title" :style="{'color':card.goods.title_font_color}">{{card.goods.name}}</div>
                            <div class="text-depict" :style="{'color':card.goods.title_font_color}">{{card.goods.memo}}</div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="card-body-icon" v-if="!isExpire">
                        <Icon
                            name="qr"
                            size="36"
                            :color="card.goods.title_font_color"
                            @click="handleQrClick(card.sid)"
                        />
                    </div>
                </div>

                <div class="card-bottom">
                    <div class="card-bottom-num" :style="{'color':card.goods.title_font_color}">{{formatNum(card.kh)}}</div>
                </div>
            </div>

<!--            <div class="waist" id="waist">-->
<!--                <div class="waist-item">-->
<!--                    <div class="item-box">-->
<!--                        <div class="waist-item-title">-->
<!--                            积分-->
<!--                        </div>-->
<!--                        <div class="waist-item-value">-->
<!--                            1000-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="waist-item">-->
<!--                    <div class="item-box">-->
<!--                        <div class="waist-item-title">-->
<!--                            积分-->
<!--                        </div>-->
<!--                        <div class="waist-item-value">-->
<!--                            查看-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="waist-item">-->
<!--                    <div class="item-box">-->
<!--                        <div class="waist-item-title">-->
<!--                            积分-->
<!--                        </div>-->
<!--                        <div class="waist-item-value">-->
<!--                            1852-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->

            <div class="nav-list">
                <Cell icon="" title="商城" is-link to="goods" size="large" />
                <Cell icon="" title="二维码" is-link size="large" @click="handleQrClick(card.sid)" v-if="!isExpire" />
                <Cell icon="" title="消费明细" is-link :to="'cardRecord?cardId='+card.sid" size="large" />
                <Cell icon="" title="课程期数" v-if="card.goods.klxAlias.klx === 4" :value="card.orderDetail.term.termmc" size="large" />
                <Cell icon="" title="课程时段" v-if="card.goods.klxAlias.klx === 4" :value="card.orderDetail.termTime.begintime + ' - ' + card.orderDetail.termTime.endtime" size="large" />
                <Cell icon="" title="教练" v-if="card.goods.klxAlias.klx === 4" :value="card.orderDetail.teacher.nickname" size="large" />
                <Cell icon="" title="过期时间" v-if="isExpire" :value="card.jzrq" size="large" />
            </div>

            <div class="bottom-button">
                <Button type="primary" @click="addToWechatCard">{{butText}}</Button>
            </div>
        </div>
    </div>
</template>

<script>
    import { NavBar, Icon , Popup, Cell, Button, Dialog } from 'vant';
    import { GetCardDetails, AddToWechatCard } from './api';
    import wx from 'weixin-js-sdk';
    import wechat_add_to_card from '@/assets/images/wechat_add_to_card.png';
    export default {
        name: "CardDetails",
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
                addToWechatShow:false,
                num: null,
                card:'',
                cardName:null,
                logo:null,
                bgImg:null,
                isExpire:false,     //卡券是否过期
                butText:'添加到微信卡包',
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
            imagesUrl(url){
                return this.unit.jointImgUrl(url)
            },
            //添加到微信卡包
            addToWechatCard(){

                var that = this;

                AddToWechatCard(this.$route.query.id).then((response)=>{
                    wx.ready(
                        wx.addCard({
                            cardList:response,
                            success() {
                                // 支付成功后的回调函数
                                alert('领取成功')
                            },
                            fail(){
                                alert('领取失败');
                            },
                            cancel(){
                                //获取卡券信息
                                GetCardDetails(that.$route.query.id).then((response)=>{
                                    if(response.in_wx_card){
                                        Dialog.confirm({
                                            title: '提示',
                                            message: '<img width="70%" src="'+wechat_add_to_card+'"><br/>已添加到微信卡包，可以到我-卡包中查看',
                                            confirmButtonText:"我知道了",
                                            showCancelButton:false,
                                        }).then(()=>{
                                            that.butText = '查看会员卡';
                                        })
                                    }
                                })
                            }
                        })
                    );
                })


            },
        },
        created() {
            //获取卡券信息
            GetCardDetails(this.$route.query.id).then((response)=>{
                this.card = response;
                this.bgImg = response.goods.photo.photopath;
                this.logo = response.goods.photo.photopath;
                if(response.status !== 1 || new Date(response.jzrq) < new Date()){
                    this.isExpire = true;
                }
                if(response.in_wx_card){
                    this.butText = '查看会员卡';
                }
            })

        },
        mounted() {
            //清楚中间的最后一个竖线
            // var waist = document.getElementById("waist").lastChild.lastChild;
            // waist.style.borderRight = '1px solid #fff';
            // console.log(waist);
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
    .bottom-button{
        margin-top: 1rem;
    }
</style>