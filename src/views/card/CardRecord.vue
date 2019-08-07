<template>
    <div class="body">
        <div class="dropdown-body">
            <div class="dropdown-item" @click="handleDropdownItem">
                <div class="dropdown-item-title">{{dropdownTitle}}</div>
                <div class="dropdown-item-icon"><Icon name="arrow-down"></Icon></div>
            </div>
            <div class="go-back" @click="handleGoBack">返回</div>
        </div>

        <div class="list">
            <List
                    v-model="loading"
                    :finished="finished"
                    :immediate-check=false
                    finished-text="已经到底了"
                    @load="onLoad"
            >
                <Cell v-for="(log,k) in list" :key="k" :title="log.orderDetail.goods.name" :label="log.rq+' '+log.sj + '  ' + log.xz" icon="vip-card-o" size="large" value-class="right-title" :value="makeValue(log)" />
            </List>

<!--            <div class="list-group" data-month="2019/7">-->
<!--&lt;!&ndash;                <CellGroup title="2019年7月">&ndash;&gt;-->

<!--&lt;!&ndash;                </CellGroup>&ndash;&gt;-->
<!--            </div>-->

<!--            <div class="list-group" data-month="2019/6">-->
<!--                <CellGroup title="2019年6月" >-->
<!--                    <Cell title="单元格" icon="vip-card-o" size="large" value-class="right-title" value="-5" />-->
<!--                    <Cell title="单元格" icon="vip-card-o" size="large" value-class="right-title" value="-5" />-->
<!--                    <Cell title="单元格" icon="vip-card-o" size="large" value-class="right-title" value="-5" />-->
<!--                    <Cell title="单元格" icon="vip-card-o" size="large" value-class="right-title" value="-5" />-->
<!--                    <Cell title="单元格" icon="vip-card-o" size="large" value-class="right-title" value="-5" />-->
<!--                    <Cell title="单元格" icon="vip-card-o" size="large" value-class="right-title" value="-5" />-->
<!--                    <Cell title="单元格" icon="vip-card-o" size="large" value-class="right-title" value="-5" />-->
<!--                    <Cell title="单元格" icon="vip-card-o" size="large" value-class="right-title" value="-5" />-->
<!--                    <Cell title="单元格" icon="vip-card-o" size="large" value-class="right-title" value="-5" />-->
<!--                    <Cell title="单元格" icon="vip-card-o" size="large" value-class="right-title" value="-5" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="right-title" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="right-title" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="right-title" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="gold-coin-o" size="large" value-class="right-title" value="-10" />-->
<!--                </CellGroup>-->
<!--            </div>-->
<!--            <div class="list-group" data-month="2019/5">-->
<!--                <CellGroup title="2019年5月">-->
<!--                    <Cell title="单元格" icon="vip-card-o" size="large" value-class="aaaaa" value="-5" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="aaaaa" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="aaaaa" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="aaaaa" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="aaaaa" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="aaaaa" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="aaaaa" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="aaaaa" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="aaaaa" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="gold-coin-o" size="large" value-class="aaaaa" value="-10" />-->
<!--                    <Cell title="单元格" icon="gold-coin-o" size="large" value-class="aaaaa" value="-10" />-->
<!--                </CellGroup>-->
<!--            </div>-->

<!--            <div class="list-group" data-month="2019/4">-->
<!--                <CellGroup title="2019年4月">-->
<!--                    <Cell title="单元格" icon="vip-card-o" size="large" value-class="aaaaa" value="-5" />-->
<!--                    <Cell title="单元格" icon="vip-card-o" size="large" value-class="aaaaa" value="-5" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="aaaaa" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="aaaaa" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="aaaaa" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="aaaaa" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="aaaaa" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="aaaaa" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="aaaaa" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="aaaaa" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="aaaaa" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="aaaaa" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="aaaaa" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="aaaaa" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="coupon-o" size="large" value-class="aaaaa" value="-1 次" />-->
<!--                    <Cell title="单元格" icon="gold-coin-o" size="large" value-class="aaaaa" value="-10" />-->
<!--                </CellGroup>-->
<!--            </div>-->

        </div>


        <Popup
                v-model="dropdownShow"
                position="bottom"
        >
            <DatetimePicker
                    v-model="currentDate"
                    type="year-month"
                    :max-date="maxDate"
                    :formatter="formatter"
                    @confirm="handlePickerConfirm"
            />
        </Popup>
    </div>
</template>

<script>
    import {NavBar, Icon, Popup, DatetimePicker, Cell, CellGroup } from 'vant';
    import { GetCardRecord } from './api'
    export default {
        name: "CardRecord",
        components:{
            NavBar,
            Icon,
            Popup,
            DatetimePicker,
            Cell,
            CellGroup
        },
        data() {
            return {
                cardId:0,
                time:'',
                loading:false,
                finished:true,
                page:1,
                list:[],
                dropdownTitle:'',
                dropdownShow:false,
                currentDate: new Date(),
                maxDate: new Date(),
                iTime:'',
            };
        },
        mounted(){
            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth() + 1;

            this.time = y+'-'+this.AppendZero(m);

            this.onLoad();

            this.setDropdownTitle();
            window.addEventListener('scroll', this.handleScroll, true);
        },
        methods: {
            handleGoBack(){
                this.$router.go(-1);
            },
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                }
                return value;
            },
            handleDropdownItem(){
                this.dropdownShow=true;
            },
            handlePickerConfirm(value){
                var m = value.getMonth()+1;
                this.time = value.getFullYear()+'-'+m;
                this.page = 1;
                this.list = [];
                this.onLoad();
                this.setDropdownTitle(value);
            },
            setDropdownTitle(date){
                if(!date){
                    date = new Date();
                }

                let y = date.getFullYear();
                let m = date.getMonth() + 1;
                this.dropdownTitle = y+'年 '+m+'月';
                this.dropdownShow = false;
            },
            handleScroll(){
                var that = this;

                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                var listGroup = document.getElementsByClassName('list-group');
                for(var i in listGroup){
                    var itemListGroup = listGroup[i].offsetTop;
                    var num = itemListGroup-scrollTop;
                    if(num>-10 && num <10){
                        var month = listGroup[i].getAttribute('data-month');
                        var date = new Date(month+'/01');       //解决ios失效的问题
                        clearTimeout(this.iTime);
                        this.iTime = setTimeout(that.setDropdownTitle(date), 100);
                    }

                }
            },
            onLoad(){
                GetCardRecord(this.$route.query.cardId,this.time,this.page).then((response)=>{
                    if(response.data.length !== 0){
                        this.list = this.list.concat(response.data);
                        this.page++;
                    }else{
                        this.finished = true;
                    }
                    this.loading = false;
                })
            },
            makeValue(log) {
                switch (log.klxAlias.klx) {
                    case 1:
                        return log.je < 0 ? log.je+'元' : '+'+log.je+'元';
                        break;
                    case 2:
                        return log.mpzs < 0 ? log.mpzs+'张' : '+'+log.mpzs+'张';
                        break;
                    case 3:
                        return log.mpzs < 0 ? log.zqs+'张' : '+'+log.zqs+'张';
                        break;
                    case 4:
                        return log.mpzs < 0 ? log.course+'节' : '+'+log.course+'节';
                        break;
                }
            },
            AppendZero(month)
            {
                if(month<10) return "0" +""+ month;
                else return month;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .body{
    }
    .dropdown-body{
        z-index: 1000;
        width: 100%;
        height: 3rem;
        background-color: #F5F5F5;
        position: fixed;
        top:0;
        display: flex;
        /*flex-direction: column;*/
        justify-content:space-between;
    }
    .dropdown-item{
        display: flex;
        align-items:center;
    }
    .dropdown-item-title{
        margin-left: 1rem;
    }
    .dropdown-item-icon{
        margin-top: 0.3rem;
        margin-left: 0.5rem;
    }

    .go-back{
        height: 100%;
        width: 3rem;
        display: flex;
        flex-direction: column;
        justify-content:center;
        color: #1989fa;
    }

    .list{
        margin-top: 3rem;
        height: 10rem;
    }

    .right-title{
        color: orange;
        font-size: 16px;
        font-weight: bold;
    }
    .van-cell-group__title{
        font-size: 16px;
        height: 2rem;
        background-color: #F5F5F5;
        color: black;
        line-height:35px;
        font-weight: bold;
    }

</style>