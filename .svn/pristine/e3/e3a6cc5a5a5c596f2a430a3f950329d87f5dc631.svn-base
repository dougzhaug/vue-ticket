<template>
    <div class="body">
        <div>
            <NavBar
                    title="我的卡券"
                    left-text=""
                    left-arrow
                    fixed
                    :border=false
                    @click-left="onClickLeft"
            />
        </div>

        <div class="tabs">
            <Tabs v-model="active" style="z-index: 0" swipeable color="#1989fa" @change="handleTabsChange">
                <Tab title="使用中">
                    <List
                        v-model="loading"
                        :finished="finished"
                        :immediate-check=false
                        finished-text="已经到底了"
                        @load="onLoad"
                    >
                        <div v-for="(card,k) in list" :key="k" class="tab-item" @click="handleClickCard(card.sid)" :style="{backgroundImage: 'url(' + imagesUrl(card.goods.photo.photopath) + ')',backgroundSize:'cover'}">
                            <div class="item-top">
                                <img class="item-logo" :src="imagesUrl(card.goods.photo.photopath)">
                                <div class="item-top-right">
                                    <div class="item-title" :style="{'color':card.goods.title_font_color}">{{card.goods.name}}</div>
                                    <div class="item-num" :style="{'color':card.goods.title_font_color}" >{{formatNum(card.kh)}}</div>
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
                    </List>

                </Tab>
                <Tab title="已过期">
                    <List
                        v-model="expireLoading"
                        :finished="expireFinished"
                        :immediate-check=false
                        finished-text="已经到底了"
                        @load="onExpireLoad"
                    >
                        <div v-for="(card,k) in expireList" :key="k" class="tab-item expire" @click="handleClickCard(card.sid)" :style="{backgroundImage: 'url(' + imagesUrl(card.goods.photo.photopath) + ')',backgroundSize:'cover'}">
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
<!--                                    有效期至:{{card.jzrq}}-->
                                    已过期
                                </div>
                            </div>
                        </div>
                    </List>

                </Tab>

            </Tabs>
        </div>
    </div>
</template>

<script>

    import { NavBar, Tab, Tabs,List } from 'vant';
    import { GetCard } from './api'
    export default {
        name: "MyCard",
        components:{
            NavBar,
            Tab,
            Tabs,
            List
        },
        data() {
            return {
                color:'red',
                active: 0,
                list:[],
                page:1,
                loading:false,
                finished:false,

                expireList:[],
                expirePage:1,
                expireLoading:false,
                expireFinished:false,
            }
        },
        methods:{
            onClickLeft(){
                this.$router.go(-1);
            },
            handleClickCard(id){
                this.$router.push({path:'/cardDetails?id=' + id})
            },
            formatNum(num){
                return String(num).replace(/(.{4})/g, "$1 ");
            },

            //切换tab触发事件
            handleTabsChange(name,title){
                switch (name) {
                    case 0:
                        if(this.list.length === 0) this.onLoad();
                        break;
                    case 1:
                        if(this.expireList.length === 0) this.onExpireLoad();
                        break;
                }
            },

            //获取数据
            onLoad() {
                // 异步更新数据
                GetCard('valid',this.page).then((response)=>{
                    if(response.data.length !== 0){
                        this.list = this.list.concat(response.data);
                        this.page++;
                    }else{
                        this.finished = true;
                    }
                    this.loading = false;
                });
            },

            //获取已过期数据
            onExpireLoad() {
                // 异步更新数据
                GetCard('expire',this.expirePage).then((response)=>{
                    if(response.data.length !== 0){
                        this.expireList = this.expireList.concat(response.data);
                        this.expirePage++;
                    }else{
                        this.expireFinished = true;
                    }
                    this.expireLoading = false;
                });
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
        mounted() {
            this.onLoad();
        }
    }
</script>

<style lang="scss" scoped>
    .body{
        display: flex;
        flex-direction:column ;
    }

    .tabs{
        margin-top: 45px;
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
        font-size: 16px;
        font-weight: bold;
        color: white;
        overflow: hidden;/*超出部分隐藏*/
        white-space: nowrap;/*不换行*/
        text-overflow:ellipsis;/*超出部分文字以...显示*/
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
    .expire{
        filter:grayscale(100%);
    }
</style>