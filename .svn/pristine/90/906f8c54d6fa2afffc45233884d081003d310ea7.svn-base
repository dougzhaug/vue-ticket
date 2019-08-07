<template>
    <div class="global">
        <div class="header">
            <div class="header-sham"></div>
            <div class="header-content">
                <div class="photo">
                    <img width="100%" :src="imagesUrl(user.hyphoto.photopath)" alt="">
                </div>
                <div class="nickname">
                    {{user.nickname}}
                </div>
            </div>
        </div>
        <div class="body">
<!--            <div class="my-stats">-->
<!--                <div class="stats-item">-->
<!--                    <div class="stats-item-top">0.00</div>-->
<!--                    <div class="stats-item-bottom">余额</div>-->
<!--                </div>-->
<!--                <div class="stats-item">-->
<!--                    <div class="stats-item-top">0</div>-->
<!--                    <div class="stats-item-bottom">余额</div>-->
<!--                </div>-->
<!--                <div class="stats-item">-->
<!--                    <div class="stats-item-top">0</div>-->
<!--                    <div class="stats-item-bottom">余额</div>-->
<!--                </div>-->
<!--                <div class="stats-item">-->
<!--                    <div class="stats-item-top">8521.00</div>-->
<!--                    <div class="stats-item-bottom">余额</div>-->
<!--                </div>-->
<!--            </div>-->

            <div class="body-items" >
<!--                <CellGroup title="组信息">-->
                <Cell icon="balance-pay" title="我的订单" is-link to="orderList" size="large" />
                <Cell icon="vip-card-o" title="我的卡包" is-link to="myCard" size="large" />
                <Cell icon="qr" title="我的入场码" is-link to="myQr" size="large" />
<!--                <Cell icon="description" title="消费记录" is-link to="cardRecord" size="large" />-->
                <Cell icon="paid" title="切换卡券" is-link to="bindCard" size="large" />
<!--                <Cell icon="gift-card-o" title="我的推荐码" is-link @click="showQr" size="large" />-->
                <Cell icon="point-gift-o" title="赠送卡券" is-link to="myGive" size="large" v-if="user.user_role > 0" />
<!--                </CellGroup>-->

            </div>

        </div>

        <Tabbar active="my"></Tabbar>

        <!-- 推广二维码 -->
        <Popup v-model="qrShow">
            <div style="height: 80vh">
                <img src="http://pic1.cxtuku.com/00/16/19/b652393dbaa0.jpg" height="100%" alt="">
            </div>
        </Popup>

    </div>
</template>

<script>
    import {
        Cell,
        CellGroup,
        Popup,
        Picker
    } from 'vant';
    import Tabbar from '@/components/vant/Tabbars';
    import { GetUserInfo } from './api'
    export default {
        name: "My",
        components:{
            Cell,
            CellGroup,
            Tabbar,
            Popup,
            Picker,
        },
        data(){
            return {
                user:null,
                qrShow:false,
            }
        },
        mounted(){
            GetUserInfo().then((response)=>{
                this.user = response.info;
            })
        },
        methods:{
            showQr(){
                this.qrShow = true;
            },
            imagesUrl(url){
                return this.unit.jointImgUrl(url)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .global{
        height: 100vh;
        background-color: #f8f8f8;
    }
    .header{
        width: 100%;
        height: 30%;
        background-color: gainsboro;
        background-image: url('../../assets/images/bg.jpg');
        background-size:100%100%;
    }
    .header-sham{
        height: 30%;
    }
    .header-content{
        height: 4rem;
        width: 100%;
        display: flex;
        align-items: center;     /* 垂直居中 */
    }
    .photo{
        width: 4rem;
        height: 100%;
        margin-left: 2rem;
    }
    .photo img{
        border-radius:10rem;
    }
    .nickname{
        color: white;
        font-size: 20px;
        margin-left: 1rem;
    }

    .body{
        display: flex;
        flex-direction:column;
        margin: 0 3%;
    }
    .my-stats{
        display: flex;
        justify-content: space-around;
        margin-top: .5rem;
        width: 100%;
        height: 4rem;
        background-color: white;
        border-radius:.5rem;
    }
    .stats-item{
        width: 100%;
        height: 100%;
    }
    .stats-item-top{
        display: flex;
        flex-direction:column-reverse;
        height: 60%;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
    }
    .stats-item-bottom{
        height: 40%;
        font-size: 13px;
        text-align: center;
    }
    .body-items{
        margin-top: .5rem;
        border-radius:.5rem;
        height: 100%;
    }
</style>