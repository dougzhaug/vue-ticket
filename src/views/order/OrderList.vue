<template>
    <div>
        <NavBar
                title="我的订单"
                left-text=""
                left-arrow
                fixed
                z-index="100"
                :border=false
                @click-left="onClickLeft"
        />

        <div class="nav-bar-hidden"></div>

        <Tabs v-model="active" swipeable color="#1989fa" @change="handleTabsChange">
            <Tab title="全部">
                <List
                        v-model="allLoading"
                        :finished="allFinished"
                        :immediate-check=false
                        finished-text="已经到底了"
                        @load="onAllLoad"
                >
                    <Card
                            :price="item.price"
                            :desc="item.details.goods.memo"
                            :title="item.details.goods.name"
                            v-for="(item,k) in allList"
                            :key="k"
                            :thumb="imagesUrl(item.details.goods.photo.photopath)"
                    >
                        <div slot="tags">
                            <Tag v-if="item.ispay === 0" type="danger" size="large">等待付款</Tag>
                            <Tag v-else-if="item.ispay === 1" type="success" size="large">已付款</Tag>
                            <Tag v-else-if="item.ispay === -1" size="large">已取消</Tag>
                        </div>

                        <div slot="footer">
                            <Button v-if="item.ispay === 0" size="small" @click="handleCancel(item.sid)">取消</Button>
                            <Button v-if="item.ispay !== 0" size="small" :to="'/orderDetails?id='+item.sid" type="primary">查看</Button>
                            <Button v-if="item.ispay === 0" size="small" :to="'/orderDetails?id='+item.sid" type="danger">去支付</Button>
                        </div>
                    </Card>
                </List>
            </Tab>
            <Tab title="待付款">
                <List
                        v-model="unpaidLoading"
                        :finished="unpaidFinished"
                        :immediate-check=false
                        finished-text="已经到底了"
                        @load="onUnpaidLoad"
                >
                    <Card
                        v-for="(item,k) in unpaidList"
                        :price="item.price"
                        :desc="item.details.goods.memo"
                        :title="item.details.goods.name"
                        :key="k"
                        :thumb="imagesUrl(item.details.goods.photo.photopath)"
                    >
                        <div slot="tags">
                            <Tag v-if="item.ispay === 0" type="danger" size="large">等待付款</Tag>
                            <Tag v-else-if="item.ispay === 1" type="success" size="large">已付款</Tag>
                            <Tag v-else-if="item.ispay === -1" size="large">已取消</Tag>
                        </div>

                        <div slot="footer">
                            <Button v-if="item.ispay === 0" size="small" @click="handleCancel(item.sid)">取消</Button>
                            <Button v-if="item.ispay !== 0" size="small" :to="'/orderDetails?id='+item.sid" type="primary">查看</Button>
                            <Button v-if="item.ispay === 0" size="small" :to="'/orderDetails?id='+item.sid" type="danger">去支付</Button>
                        </div>
                    </Card>
                </List>
            </Tab>
            <Tab title="已付款">
                <List
                        v-model="paidLoading"
                        :finished="paidFinished"
                        :immediate-check=false
                        finished-text="已经到底了"
                        @load="onUnpaidLoad"
                >
                    <Card
                            v-for="(item,k) in paidList"
                            :price="item.price"
                            :desc="item.details.goods.memo"
                            :title="item.details.goods.name"
                            :key="k"
                            :thumb="imagesUrl(item.details.goods.photo.photopath)"
                    >
                        <div slot="tags">
                            <Tag v-if="item.ispay === 0" type="danger" size="large">等待付款</Tag>
                            <Tag v-else-if="item.ispay === 1" type="success" size="large">已付款</Tag>
                            <Tag v-else-if="item.ispay === -1" size="large">已取消</Tag>
                        </div>

                        <div slot="footer">
                            <Button v-if="item.ispay === 0" size="small" @click="handleCancel(item.sid)">取消</Button>
                            <Button v-if="item.ispay !== 0" size="small" :to="'/orderDetails?id='+item.sid" type="primary">查看</Button>
                            <Button v-if="item.ispay === 0" size="small" :to="'/orderDetails?id='+item.sid" type="danger">去支付</Button>
                        </div>
                    </Card>
                </List>
            </Tab>
            <Tab title="已取消">
                <List
                        v-model="cancelLoading"
                        :finished="cancelFinished"
                        :immediate-check=false
                        finished-text="已经到底了"
                        @load="onUnpaidLoad"
                >
                    <Card
                            v-for="(item,k) in cancelList"
                            :price="item.price"
                            :desc="item.details.goods.memo"
                            :title="item.details.goods.name"
                            :key="k"
                            :thumb="imagesUrl(item.details.goods.photo.photopath)"
                    >
                        <div slot="tags">
                            <Tag v-if="item.ispay === 0" type="danger" size="large">等待付款</Tag>
                            <Tag v-else-if="item.ispay === 1" type="success" size="large">已付款</Tag>
                            <Tag v-else-if="item.ispay === -1" size="large">已取消</Tag>
                        </div>

                        <div slot="footer">
                            <Button v-if="item.ispay === 0" size="small" @click="handleCancel(item.sid)">取消</Button>
                            <Button v-if="item.ispay !== 0" size="small" :to="'/orderDetails?id='+item.sid" type="primary">查看</Button>
                            <Button v-if="item.ispay === 0" size="small" :to="'/orderDetails?id='+item.sid" type="danger">去支付</Button>
                        </div>
                    </Card>
                </List>
            </Tab>
        </Tabs>
    </div>
</template>

<script>
    import {
        NavBar,
        Tab,
        Tabs,
        List,
        Card,
        CouponList,
        Tag,
        Button,
        Dialog
    } from 'vant';
    import { getWxPayInfo,getOrderList,cancelOrder } from './api';
    export default {
        name: "OrderList",
        components:{
            Tab,
            Tabs,
            List,
            Card,
            CouponList,
            NavBar,
            Tag,
            Button,
            Dialog
        },
        data(){
            return {
                active:0,

                allList:[],
                allPage:1,
                allLoading:false,
                allFinished:false,

                unpaidList:[],
                unpaidPage:1,
                unpaidLoading:false,
                unpaidFinished:false,

                paidList:[],
                paidPage:1,
                paidLoading:false,
                paidFinished:false,

                cancelList:[],
                cancelPage:1,
                cancelLoading:false,
                cancelFinished:false,

                imageURL:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561344764&di=c5c0b590893676661c154fc03ca9e5f4&imgtype=jpg&er=1&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201312%2F05%2F20131205172433_GPhxi.thumb.600_0.jpeg'
            }
        },
        mounted(){
            this.onAllLoad();
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1);
            },

            //切换tab触发事件
            handleTabsChange(name,title){
                switch (name) {
                    case 0:
                        if(this.allList.length === 0) this.onAllLoad();
                        break;
                    case 1:
                        if(this.unpaidList.length === 0) this.onUnpaidLoad();
                        break;
                    case 2:
                        if(this.paidList.length === 0) this.onPaidLoad();
                        break;
                    case 3:
                        if(this.cancelList.length === 0) this.onCancelLoad();
                        break;
                }
            },

            //订单-全部
            onAllLoad() {
                // 异步更新数据
                getOrderList('all',this.allPage).then((response)=>{
                    if(response.data.length !== 0){
                        this.allList = this.allList.concat(response.data);
                        this.allPage++;
                    }else{
                        this.allFinished = true;
                    }
                    this.allLoading = false;
                })
            },

            //订单-未付款
            onUnpaidLoad() {
                // 异步更新数据
                getOrderList('unpaid',this.unpaidPage).then((response)=>{
                    if(response.data.length !== 0){
                        this.unpaidList = this.unpaidList.concat(response.data);
                        this.unpaidPage++;
                    }else{
                        this.unpaidFinished = true;
                    }
                    this.unpaidLoading = false;
                })
            },

            //订单-已付款
            onPaidLoad() {
                // 异步更新数据
                getOrderList('paid',this.paidPage).then((response)=>{
                    if(response.data.length !== 0){
                        this.paidList = this.paidList.concat(response.data);
                        this.paidPage++;
                    }else{
                        this.paidFinished = true;
                    }
                    this.paidLoading = false;
                })
            },

            //订单-已取消
            onCancelLoad() {
                // 异步更新数据
                getOrderList('cancel',this.cancelPage).then((response)=>{
                    if(response.data.length !== 0){
                        this.cancelList = this.cancelList.concat(response.data);
                        this.cancelPage++;
                    }else{
                        this.cancelFinished = true;
                    }
                    this.cancelLoading = false;
                })
            },

            //处理取消订单事件
            handleCancel(order_id){
                Dialog.confirm({
                    title: '警告',
                    message: '您真的要取消该订单吗',
                    cancelButtonText:'狠心取消',
                    confirmButtonText:'点错了',
                }).catch(() => {
                    cancelOrder(order_id).then((response)=>{
                        Dialog.alert({
                            title: '成功',
                            message: '订单已经取消'
                        }).then(()=>{
                            location.reload()
                        });
                    })
                })

            },
            imagesUrl(url){
                return this.unit.jointImgUrl(url)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .nav-bar-hidden{
        height: 46px;
    }

    .van-card__title{
        font-size: 16px;
    }
    .van-card__price{
        margin-top: .5rem;
        font-size: 16px;
    }
</style>