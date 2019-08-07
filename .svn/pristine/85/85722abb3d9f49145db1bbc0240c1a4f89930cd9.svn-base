<template>
    <div class="box">
        <div class="left">
            <Sidebar :active-key="activeKey" @change="onChange">
                <SidebarItem v-for="(item,i) in goodsList" :key="i" :title="item.name" style="font-size: 16px;" />
            </Sidebar>
        </div>
        <div class="right">
            <div class="item" :id="'anchor-'+i" v-for="(item,i) in goodsList" :key="i">
                <div class="item-title">{{item.name}}</div>
                <Card
                    v-for="(goods,k) in item.list"
                    :price="goods.price"
                    :desc="goods.memo"
                    :title="goods.name"
                    :centered="centered"
                >
                    <!-- 自定义缩略图插槽 -->
                    <div slot="thumb" style="" class="goods-thumb">
                        <img :src="imagesUrl(goods.photo.photopath)" alt="">
                    </div>
                    <div slot="footer">
                        <Button :to="'goodsDetails?id='+goods.xmsid" type="primary" size="small">购买</Button>
                    </div>
                </Card>
            </div>
<!--            <div style="margin-top: 50px;"></div>-->
        </div>


        <Tabbar active="goods"></Tabbar>
    </div>
</template>

<script>
    import { Button, Sidebar, SidebarItem, Card } from 'vant';
    import Tabbar from '@/components/vant/Tabbars';
    import { getGoods } from './api'
    export default {
        name: "Goods",
        components: {
            Button,
            Sidebar,
            SidebarItem,
            Card,
            Tabbar,
        },
        data() {
            return {
                activeKey: 0,
                centered:true,
                imageURL:'/timg?image&quality=80&size=b9999_10000&sec=1561344764&di=c5c0b590893676661c154fc03ca9e5f4&imgtype=jpg&er=1&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201312%2F05%2F20131205172433_GPhxi.thumb.600_0.jpeg',
                goodsList:[]
            };
        },
        methods: {
            onChange(key) {
                this.activeKey = key;
                this.$el.querySelector('#anchor-'+key).scrollIntoView()     //模拟锚点功能
            },
            imagesUrl(url){
                return this.unit.jointImgUrl(url)
            }
        },
        mounted() {
            getGoods().then((response)=>{
                console.log(response);
                this.goodsList = response
            });
        },
        computed:{

        }
    }
</script>

<style lang="scss" scoped>
    .box{
        display: flex;
        width: 100%;
    }
    .left{
        width: 22%;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
    }
    .right{
        margin-left: 22%;
        margin-bottom: 60px;
        width: 78%;
        justify-content: flex-end;
    }
    .van-sidebar{
        width: auto;
    }
    /*.van-sidebar-item{*/
    /*    padding: 1.2rem 0.4rem 1.2rem .2rem;*/
    /*}*/
    .van-sidebar-item__text{
        text-align: left!important;
    }
    .item-title{
        height: 2.6rem;
        text-align:left;
        margin-left: 15px;
        font-size: 18px;
        font-weight: bold;
        display: flex;
        align-items:center;
    }
    .van-card__title{
        font-size: 16px;
        font-weight: bold;
    }
    .van-card__price{
        font-size: 16px;
    }
    .goods-thumb{
        width:100%;
        height: 100%;
        display: flex;
        align-items:center;
        justify-content:center;
    }
    .goods-thumb img{
        width: 100%;
        height: auto;
        max-height: 100%;
        border-radius:5px;
    }
</style>