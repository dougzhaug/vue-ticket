<template>
    <div>
        <NavBar
                title="商品详情"
                left-text=""
                left-arrow
                fixed
                @click-left="onClickLeft"
        />

        <Swipe :autoplay="3000">
<!--            <SwipeItem v-for="(image, index) in images" :key="index">-->
<!--                <img style="width: 100%" v-lazy="image" />-->
<!--            </SwipeItem>-->
            <SwipeItem :key="index">
                <img style="width: 100%" v-lazy="imagesUrl(goodsDetails.photo.photopath)" />
            </SwipeItem>
        </Swipe>

        <div class="body">
            <div class="goods-name">{{goodsDetails.name}}</div>
            <div class="goods-price">￥{{goodsDetails.price}}</div>
<!--            <div class="goods-original-price"><s>￥88.00</s></div>-->
            <div class="goods-details" v-html="goodsDetails.info"></div>
        </div>

        <GoodsAction>
            <GoodsActionIcon
                    icon="chat-o"
                    text="客服"
                    @click="onClickIcon"
            />

            <GoodsActionButton
                    type="danger"
                    text="立即购买"
                    @click="onClickButton"
            />
        </GoodsAction>

        <Sku
            v-model="showBase"
            :sku="sku"
            :goods="goods"
            :goods-id="goodsId"
            :hide-stock="sku.hide_stock"
            :quota="quota"
            :quota-used="quotaUsed"
            :show-add-cart-btn="showCart"
            :custom-stepper-config="customStepperConfig"
            @buy-clicked="onBuyClicked"
        >
            <div slot="sku-stepper"></div>
        </Sku>
    </div>
</template>

<script>
    import {
        NavBar,
        Swipe,
        SwipeItem,
        GoodsAction,
        GoodsActionIcon,
        GoodsActionButton,
        Sku,
        Toast
    } from 'vant';
    import { getGoodsDetails } from './api'
    export default {
        name: "GoodsDetails",
        components:{
            NavBar,
            Swipe,
            SwipeItem,
            GoodsAction,
            GoodsActionIcon,
            GoodsActionButton,
            Sku,
            Toast
        },
        data() {
            return {
                showBase:false,
                disableStepperInput:false,
                goodsDetails:'',
                sku:{
                    tree: [
                        {
                            k: '颜色', // skuKeyName：规格类目名称
                            v: [
                                {
                                    id: '30349', // skuValueId：规格值 id
                                    name: '红色', // skuValueName：规格值名称
                                    imgUrl: 'https://img.yzcdn.cn/1.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
                                },
                                {
                                    id: '1215',
                                    name: '蓝色',
                                    imgUrl: 'https://img.yzcdn.cn/2.jpg'
                                }
                            ],
                            k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                        }
                    ],
                    // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                    list: [
                        {
                            id: 2259, // skuId，下单时后端需要
                            price: 100, // 价格（单位分）
                            s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
                            s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
                            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                            stock_num: 110 // 当前 sku 组合对应的库存
                        }
                    ],
                    price: '1.00', // 默认价格（单位元）
                    stock_num: 227, // 商品总库存
                    collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                    none_sku: false, // 是否无规格商品
                    hide_stock: false // 是否隐藏剩余库存
                },
                goods: {
                    // 商品标题
                    title: '测试商品',
                    // 默认商品 sku 缩略图
                    picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560750133948&di=d3bf252e4e9633b457915abf0e6b7d4c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201312%2F05%2F20131205172036_TWSmB.jpeg'
                },
                goodsId:"22",
                quota:0,
                quotaUsed:0,
                showCart:false,
                images: [
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561344764&di=c5c0b590893676661c154fc03ca9e5f4&imgtype=jpg&er=1&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201312%2F05%2F20131205172433_GPhxi.thumb.600_0.jpeg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560750133948&di=d3bf252e4e9633b457915abf0e6b7d4c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201312%2F05%2F20131205172036_TWSmB.jpeg'
                ],
                customStepperConfig: {
                    // 自定义限购文案
                    quotaText: '每次限购2件',
                    // 自定义步进器超过限制时的回调
                    handleOverLimit: (data) => {
                        const { action, limitType, quota, quotaUsed } = data;
                        console.log(data);
                        if (action === 'minus') {
                            Toast('至少选择一件商品');
                        } else if (action === 'plus') {
                            // const { LIMIT_TYPE } = Sku.skuConstants;
                            if (limitType === LIMIT_TYPE.QUOTA_LIMIT) {
                                let msg = `单次限购${quota}件`;
                                if (quotaUsed > 0) msg += `，你已购买${quotaUsed}`;
                                Toast(msg);
                            } else {
                                Toast('库存不够了');
                            }
                        }
                    }
                }
            }
        },
        methods:{
            onClickIcon(){
                window.location.href="tel:‭0724-2408008"
            },
            onClickButton(){
                //直接跳转到订单页面
                this.$router.push({path:'/order?id='+this.$route.query.id});

                // this.showBase = true
            },
            onBuyClicked(sku){
                console.log(sku);
                this.$router.push({path:'/order'})
            },
            onAddCartClicked(){

            },
            onClickLeft(){
                this.$router.go(-1);
            },

            //批量替换img标签中的src数据
            replaceImgSrc(string,http){
                return string.replace(/src="/g, "src=\""+http);
            },
            imagesUrl(url){
                return this.unit.jointImgUrl(url)
            }
        },
        mounted() {
            getGoodsDetails(this.$route.query.id).then((response)=>{
                this.goodsDetails = response;
                //商品详情中处理图片地址
                this.goodsDetails.info = this.replaceImgSrc(this.goodsDetails.info,process.env.VUE_APP_IMG_BASE_URL);
            });
        }
    }
</script>

<style lang="scss" scoped>
    .body{
        text-align: left;
        margin: 0 .5rem 4rem 0;
    }
    .van-swipe{
        margin-top: 46px;
    }
    .goods-name{
        font-size: 22px;
    }
    .goods-price{
        font-size: 18px;
        color: red;
        margin-bottom: 1rem;
    }
    .goods-original-price{
        font-size: 12px;
    }
    .goods-details{
        width: 100%;
    }
    .goods-details p img{
        width: 100%!important;
    }

</style>