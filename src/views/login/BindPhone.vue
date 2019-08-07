<template>
    <div>
        <div class="page__hd">
            <h2>绑定手机号</h2>
        </div>

        <div class="weui-cells weui-cells_form">
            <div class="weui-cell weui-cell_select weui-cell_select-before">
                <div class="weui-cell__hd">
                    <select class="weui-select" name="select2">
                        <option value="1">+86</option>
                    </select>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="phone" key="phone" type="number" pattern="[0-9]*" placeholder="请输入号码"/>
                </div>
            </div>

            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input"  v-model="captcha" type="number" pattern="[0-9]*" v-focus="countFlag" ref="input" autofocus placeholder="请输入验证码"/>
                </div>
                <div class="weui-cell__ft">

                    <a href="javascript:;" style="min-width: 5rem" :class="{'forbid':countFlag}" class="weui-vcode-btn" @click="sendCaptcha">{{btnMsg}}</a>
                </div>
            </div>
        </div>

        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" href="javascript:" @click="login" id="login">下一步</a>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import { SendPhoneCode, BindPhone } from './api'
    export default {
        name: "BindPhone",
        components:{
        },
        data(){
            return{
                phone:'',
                captcha:'',
                btnMsg:'获取验证码',
                countNum:60,            // 倒计时周期
                countFlag:false,        // 用于倒计时标记，true-正在倒计时
                intervalBtn:{},         // 定时器
            }
        },
        directives: {
            focus: {
                inserted: function(el, { value }) {
                    if (value) {
                        el.focus();
                    }
                }
            }
        },
        methods:{
            //发送验证码
            sendCaptcha(){

                this.captcha='';

                //模拟阻止点击事件
                if(this.countFlag){
                    return false;
                }

                if(this.phone === '' || this.phone === undefined){
                    this.$weui.topTips('请输入手机号码!');
                    return false;
                }
                if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
                    this.$weui.topTips('请输入正确的手机号码!');
                    return false;
                }

                //发送请求
                SendPhoneCode(this.phone,this.captcha).then((result)=>{
                    //触发定时器方法
                    this.countDown();
                    Toast.success('发送成功！');
                });
            },
            // 倒计时
            countDown(){
                // 更改btn状态
                this.countFlag =! this.countFlag;
                // 设置倒计时
                this.intervalBtn = setInterval(() => {
                    if(this.countNum <= 1) {
                        // 重置btn提示信息
                        this.btnMsg = "获取验证码";
                        // 清除定时器
                        clearInterval(this.intervalBtn)
                        // 更改btn状态
                        this.countFlag =! this.countFlag;
                        // 重置倒计时状态
                        this.countNum = 60;

                        return true;
                    };
                    // 倒计时
                    this.countNum -- ;

                    this.btnMsg = this.countNum + '秒后重发';
                }, 1000);
            },
            login(){
                if(this.phone === '' || this.phone === undefined){
                    this.$weui.topTips('请输入手机号码!');
                    return false;
                }
                if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
                    this.$weui.topTips('请输入正确的手机号码!');
                    return false;
                }

                if(this.captcha === '' || this.captcha === undefined){
                    this.$weui.topTips('请输入验证码!');
                    return false;
                }

                if(this.captcha.length !== 6){
                    this.$weui.topTips('验证码位数错误');
                    return false;
                }

                BindPhone(this.phone,this.captcha).then((response)=>{
                    let originRouter = localStorage.originRouter;
                    localStorage.removeItem('originRouter');
                    if(originRouter){
                        this.$router.push({ path: originRouter })
                    }else{
                        this.$router.push({ name: 'goods' })
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page__hd{
        padding: 3rem 0;
    }
    .page__hd h2{
        width: 100%;
        text-align:center;
    }
    #login{
        width: 100%;
    }
    .forbid{
        color: gainsboro;
    }
</style>