<template>
    <div>
        <NavBar
            title="提交订单"
            left-text=""
            left-arrow
            fixed
            :border=false
            @click-left="onClickLeft"
        />
        <div class="nav-bar-hidden"></div>

        <Cell title="购买" icon="balance-o" />

        <!-- 联系人卡片 -->
        <ContactCard
            v-if="ContactCardShow"
            :type="cardType"
            :name="currentContact.name"
            :tel="currentContact.tel"
            @click="showList = true"
        />
        <!-- 联系人列表 -->
        <Popup v-model="showList" position="bottom">
            <ContactList
                v-model="chosenContactId"
                :list="list"
                @add="onAdd"
                @edit="onEdit"
                @select="onSelect"
            />
        </Popup>

        <!-- 联系人编辑 -->
        <Popup v-model="showEdit" position="bottom">
            <ContactEdit
                :contact-info="editingContact"
                :is-edit="isEdit"
                @save="onSave"
                @delete="onDelete"
            />
        </Popup>

        <Card
            :price="goodsDetails.price"
            :desc="goodsDetails.memo"
            :title="goodsDetails.name"
            :thumb="imagesUrl(goodsDetails.photo.photopath)"
        />

        <Cell title="购买数量" v-if="quantityShow">
            <Stepper v-model="value" />
        </Cell>

        <!-- 课程需要选择期数 -->
        <div class="course" v-if="courseShow">
            <div class="term">选择课程时间</div>
            <DropdownMenu>
                <DropdownItem v-model="term" @change="changeTerm" :options="computedOptionTerm" />
                <DropdownItem v-model="termTime" :options="computedOptionTermTime" />
            </DropdownMenu>
            <Cell title="教练" size="large" is-link :value="teacherName" @click="selectTeacher" />
        </div>

        <!--        <Cell title="使用卡券优惠哦" :border="border" />-->

        <!-- 条款 -->
        <label for="orderAgree" class="weui-agree">
            <input id="orderAgree" type="checkbox" class="weui-agree__checkbox">
            <span class="weui-agree__text">
                阅读并同意<router-link to="/orderClause">《相关条款》</router-link>
            </span>
        </label>

        <SubmitBar
            :price="computedTotal"
            button-text="提交订单"
            @submit="onSubmit"
        />
    </div>
</template>

<script>
    import {
        NavBar,
        SubmitBar,
        Cell,
        Card,
        Stepper,
        SwipeCell,
        ContactCard,
        ContactList,
        ContactEdit,
        Popup,
        DropdownMenu,
        DropdownItem,
        Dialog
    } from 'vant';

    import { getGoodsDetails, getCourseTerm, submitOrder, getTeacher } from './api'
    export default {
        name: "Order",
        components:{
            NavBar,
            SubmitBar,
            Cell,
            Card,
            Stepper,
            SwipeCell,
            ContactCard,
            ContactList,
            ContactEdit,
            Popup,
            DropdownMenu,
            DropdownItem,
            Dialog
        },
        data(){
            return {
                teacherName:'请选择',        //老师姓名
                teacher:0,                  //选中的老师id
                teacherArray:[{
                    label: '请选择',
                    value: 0,
                }],                         //老师数据
                contactCardShow:false,      //联系人
                quantityShow:false,         //是否显示选择数量
                courseShow:false,           //课程时间选择
                value:1,
                border:false,
                chosenContactId: null,
                editingContact: {},
                showList: false,
                showEdit: false,
                isEdit: false,
                list: [{
                    name: '张三',
                    tel: '13000000000',
                    id: 0
                }],
                goodsDetails:'',

                termObj:[],
                term: 0,
                termTime: 0,
                optionTerm: [{ text: '选择期', value: 0 }],
                optionTermTime: [{ text: '选择时间段', value: 0 }],

            }
        },

        methods: {
            onClickLeft(){
                Dialog.confirm({
                    message: '亲，您真的要离开吗',
                    confirmButtonText:'再想想',
                    cancelButtonText:'去意已决',
                }).catch(() => {
                    this.$router.go(-1);
                });
            },
            //提交订单
            onSubmit() {
                if(this.courseShow){
                    if(this.term === 0) {Dialog.alert({message: '请选择期数'}); return;}
                    if(this.termTime === 0) {Dialog.alert({message: '请选择时间段'}); return;}
                    if(this.teacher === 0) {Dialog.alert({message: '请选择教练'}); return;}
                }
                if(!document.getElementById('orderAgree').checked){
                    Dialog.alert({message: '请同意条款'}); return;
                }

                var that = this;
                //提交订单
                submitOrder(this.$route.query.id,this.value,this.term,this.termTime,this.teacher).then((response)=>{
                    let option = {
                        timestamp: response.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: response.nonceStr, // 支付签名随机串，不长于 32 位
                        package: response.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                        signType: response.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: response.paySign, // 支付签名
                        success: () => {
                            that.$router.push({ path: '/paySuccess' })
                        },
                        error: () => {
                            that.$router.push({ path: '/payError' })
                        }
                    };
                    // 调用微信支付（这里页面的url可能不是当前的url所以微信支付后台js安全路径最好配置为域名根目录 如:http:xxx.com/）
                    that.$wxapi.chooseWXPay(option);
                })

            },
            // 添加联系人
            onAdd() {
                this.editingContact = { id: this.list.length };
                this.isEdit = false;
                this.showEdit = true;
            },

            // 编辑联系人
            onEdit(item) {
                this.isEdit = true;
                this.showEdit = true;
                this.editingContact = item;
            },

            // 选中联系人
            onSelect() {
                this.showList = false;
            },

            // 保存联系人
            onSave(info) {
                this.showEdit = false;
                this.showList = false;

                if (this.isEdit) {
                    this.list = this.list.map(item => item.id === info.id ? info : item);
                } else {
                    this.list.push(info);
                }
                this.chosenContactId = info.id;
            },

            // 删除联系人
            onDelete(info) {
                this.showEdit = false;
                this.list = this.list.filter(item => item.id !== info.id);
                if (this.chosenContactId === info.id) {
                    this.chosenContactId = null;
                }
            },

            //期信息修改事件
            changeTerm(){
                this.termTime = 0;
            },

            //通过期数id获取课程时间列表
            getTermTime(termId){
                let termTime=[];
                this.termObj.forEach(function (v,k) {
                    if(v.value===termId) {
                        termTime =  v.children;
                        return;
                    }
                 });
                return termTime
            },
            imagesUrl(url){
                return this.unit.jointImgUrl(url)
            },
            //选择老师事件
            selectTeacher()
            {
                var that = this;
                // 单列picker
                this.$weui.picker(that.teacherArray, {
                    className: 'custom-classname',
                    container: 'body',
                    defaultValue: [that.teacher],
                    onConfirm: function (result) {
                        console.log(result)
                        that.teacherName = result[0].label;
                        that.teacher = result[0].value;
                    },
                    id: 'singleLinePicker'
                });
            }
        },
        computed: {
            cardType() {
                return this.chosenContactId !== null ? 'edit' : 'add';
            },

            currentContact() {
                const id = this.chosenContactId;
                return id !== null ? this.list.filter(item => item.id === id)[0] : {};
            },
            //课程期数信息
            computedOptionTerm(){
                const init = this.optionTerm;
                return init.concat(this.termObj);
            },
            //课程时间段信息
            computedOptionTermTime() {
                const term = this.term;
                var time = [];
                if(term>0){
                    time = this.getTermTime(term)
                }
                const init = this.optionTermTime;
                return init.concat(time);
            },
            //合计价格计算
            computedTotal(){
                return this.goodsDetails.price * 100 * this.value;
            }
        },
        mounted() {

            getGoodsDetails(this.$route.query.id).then((response)=>{
                this.goodsDetails = response;
                if([2,3].indexOf(this.goodsDetails.klxAlias.klx)>=0){        //判断是否显示购买个数
                    this.quantityShow = true;
                }
                if(this.goodsDetails.klxAlias.klx ===4){         //判断是否是课程
                    getCourseTerm(this.$route.query.id).then((res)=>{       //获取课程排课数据
                        this.termObj = res;
                    });

                    //获取教练信息
                    getTeacher().then((resteacher)=>{
                        this.teacherArray = this.teacherArray.concat(resteacher);
                    });

                    this.courseShow = true;
                }
            });


        }

    }
</script>

<style lang="scss" scoped>
    .nav-bar-hidden{
        height: 46px;
    }
    .course{
        background-color: #fafafa;
    }
    .term{
        width: 100%;
        height: 2.6rem;
        line-height:3rem;
        margin-left: 1rem;
        color: #323233;
        font-size: 14px;
    }
    .van-dropdown-item--down{
        z-index: 1000!important;
    }
    .weui-agree{
        margin-top: 1rem;
        font-size: 14px;
    }

</style>