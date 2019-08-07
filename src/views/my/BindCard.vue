<template>
    <div class="body">
        <div>
            <NavBar
                    title="绑定卡券"
                    left-text=""
                    left-arrow
                    fixed
                    :border=false
                    @click-left="onClickLeft"
            />
            <div class="nav-bar-hidden"></div>
        </div>

        <div class="tabs">

<!--            当前选中的-->
            <div class="tab-item active" v-if="present" :style="{backgroundImage: 'url(' + imagesUrl(present.goods.photo.photopath) + ')',backgroundSize:'cover'}">
                <div class="item-top">
                    <img class="item-logo" :src="imagesUrl(present.goods.photo.photopath)">
                    <div class="item-top-right">
                        <div class="item-title" :style="{'color':present.goods.title_font_color}">{{present.goods.name}}</div>
                        <div class="item-num" :style="{'color':present.goods.title_font_color}">{{formatNum(present.kh)}}</div>
                    </div>
                </div>
                <div class="item-bottom">
                    <div class="bottom-left">

                    </div>
                    <div class="bottom-right">
                        有效期至: {{handleDate(present.jzrq)}}
                    </div>
                </div>

                <div class="active-icon">
                    <Icon name="checked" size="50" color="#1989fa" />
                </div>
            </div>


<!--            列表-->
            <div class="tab-item" v-for="(card,i) in list" :key="i" :style="{backgroundImage: 'url(' + imagesUrl(card.goods.photo.photopath) + ')',backgroundSize:'cover'}" @click="handleClickCard(card.sid)">
                <div class="item-top">
                    <img class="item-logo" :src="imagesUrl(card.goods.photo.photopath)">
                    <div class="item-top-right">
                        <div class="item-title" :style="{'color':card.goods.title_font_color}">{{card.goods.name}}</div>
                        <div class="item-num" :style="{'color':card.goods.title_font_color}">{{formatNum(card.kh)}}</div>
                    </div>
                </div>
                <div class="item-bottom">
                    <div class="bottom-left">

                    </div>
                    <div class="bottom-right">
                        有效期至: {{handleDate(card.jzrq)}}
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

    import {
        NavBar,
        Tab,
        Tabs,
        Icon,
        Dialog,
        Toast
    } from 'vant';
    import { GetBindCardList, BindCard } from './api'
    export default {
        name: "BindCard",
        components:{
            NavBar,
            Tab,
            Tabs,
            Icon,
            Dialog,
            Toast
        },
        data() {
            return {
                active: 0,
                present:'',
                list:'',
            }
        },
        methods:{
            onClickLeft(){
                this.$router.go(-1);
            },
            handleClickCard(id){
                var that = this;

                Dialog.confirm({
                    title: '警告',
                    message: '您确认要切换为该卡券吗?'
                }).then(() => {
                    BindCard(id).then((response)=>{
                        Toast.success('切换成功');
                        setTimeout(function(){
                            that.getBindCardList();
                        },2000);
                    })
                });
            },
            formatNum(num){
                return String(num).replace(/(.{4})/g, "$1 ");
            },
            //获取列表信息
            getBindCardList(){
                GetBindCardList().then((response)=>{
                    this.present = Object.keys(response.present).length > 0 ? response.present : false;
                    this.list = response.cards;
                })
            },
            handleDate(date)
            {
                var tab = new Date();
                tab.setFullYear(tab.getFullYear()+100);

                var current = new Date(date);
                if(current.getTime() > tab.getTime()){
                    return '永久';
                }else{
                    return date;
                }
            },
            imagesUrl(url){
                return this.unit.jointImgUrl(url)
            }
        },
        created() {
            this.getBindCardList();
        }
    }
</script>

<style lang="scss" scoped>
    .body{
        display: flex;
        flex-direction:column ;
    }
    .nav-bar-hidden{
        height: 46px;
    }

    .tab-item{
        margin: .5rem auto 0;
        width: 94%;
        height: 8rem;
        background-color: #42b983;
        border-radius:5px;
    }
    .item-top{
        height: 70%;
        /*background-color:darkgoldenrod;*/
        display: flex;
    }
    .item-logo{
        width: 3rem;
        height: 3rem;
        background-color: gray;
        border-radius:3rem;
        margin: 1.3rem 1rem;
    }
    .item-top-right{
        width: 70%;
        display: flex;
        flex-direction: column;
        /*align-items:center;*/
        justify-content:center;
    }
    .item-title{
        font-size: 18px;
        font-weight: bold;
        color: white;
    }
    .item-num{
        font-size: 18px;
        color: white;
    }
    .item-bottom{
        height: 30%;
        display: flex;
        /*flex-direction: column;*/
        align-items:center;
        background-color: black;
        opacity: 0.6;
        border-radius: 0 0 5px 5px;
    }
    .bottom-left{

        width: 50%;

    }
    .bottom-right{
        width: 50%;
        text-align: center;
        opacity: 1;
        color: white;
    }

    .active{
        position:relative;
        background-color:blue;
        left:0;
        opacity: 0.8;
        top: 0;
        /*z-index: 1;*/
        filter: alpha(opacity=50);
        border-color: red;
    }
    .active-icon{
        /*width: 5rem;*/
        /*height: 5rem;*/
        position:absolute;
        top:1.5rem;
        right:1.5rem;
    }
</style>