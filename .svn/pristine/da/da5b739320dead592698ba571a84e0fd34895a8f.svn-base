<template>
    <div>
        <NavBar
            title="二维码"
            left-text="关闭"
            left-arrow
            fixed
            :left-arrow=false
            :border=false
            @click-left="onClickLeft"
        />
        <div class="body">
            <div class="logo">
                <img class="logo-img" :src="imagesUrl(logo)" alt="">
            </div>
            <div class="qr">
                <div id="canvas" @click="manualRefreshQr"></div>
                <!--                <canvas id="canvas"></canvas>-->
            </div>
            <div class="card-num">
                {{formatNum()}}
            </div>
            <div class="prompt">
                {{prompt}}
            </div>
        </div>
    </div>

</template>

<script>
    import { NavBar } from 'vant';
    import QRCode from 'qrcode';
    import { GetCardQr,GetCardDetails } from './api'
    export default {
        name: "CardQr",
        components:{
            NavBar
        },
        data(){
            return {
                refreshTime: 60,            //刷新间隔时间
                num:'',
                prompt:'使用前请出示此二维码',
                user:localStorage.user?JSON.parse(localStorage.user):{},
                autoRefresh:'',
                card:null,
                logo:null,
            }
        },
        methods:{
            onClickLeft(){
                this.$router.go(-1);
            },
            formatNum(){
                return String(this.num).replace(/(.{4})/g, "$1 ");
            },
            //生成二维码
            makeQr(string,isRefresh){
                console.log(string);
                // if(!string){
                //     return false;
                // }

                QRCode.toCanvas(String(string), {errorCorrectionLevel: 'H',width:240}, function (error,canvas) {
                    if (error) {
                        console.log(error)
                    }else{
                        var container = document.getElementById('canvas');
                        if(isRefresh){
                            container.replaceChild(canvas,container.childNodes[0])
                        }else{
                            container.appendChild(canvas);
                        }
                        console.log('QRCode success!');
                    }
                })
            },
            //刷新二维码
            refreshQr(){
                this.getQrNum();
            },
            //手动刷新二维码
            manualRefreshQr(){
                window.clearInterval(this.autoRefresh);         //清除之前的定时任务
                this.refreshQr();

                var that = this;
                this.autoRefresh = window.setInterval(() => {
                    setTimeout(function () {
                        that.refreshQr();
                    },0)
                }, 1000 * this.refreshTime);
            },
            //获取二维码数值
            getQrNum(){
                GetCardQr(this.$route.query.id).then((response)=>{
                    this.num = response.code;
                    this.makeQr(this.num,true);
                }).catch((error)=>{
                    window.clearInterval(this.autoRefresh);
                });
            },
            imagesUrl(url){
                return this.unit.jointImgUrl(url)
            }

        },
        created(){
            GetCardDetails(this.$route.query.id).then((response)=>{
                this.logo = response.goods.photo.photopath;
                this.card = response;
            });
        },
        mounted() {
            var that = this;

            GetCardQr(this.$route.query.id).then((response)=>{
                this.num = response.code;
                this.makeQr(this.num);//初始化二维码
            }).catch((error)=>{
                window.clearInterval(this.autoRefresh);
            });

            this.autoRefresh = window.setInterval(() => {       //初始化定时刷新二维码
                setTimeout(function () {
                    that.refreshQr();
                },0)
            }, 1000 * this.refreshTime);
        },
        destroyed() {
            window.clearInterval(this.autoRefresh);
        }
    }
</script>

<style lang="scss" scoped>
    .body{
        margin-top: 46px;
        display: flex;
        flex-direction: column;
    }
    .logo{
        margin-top: 15%;
        width: 100%;
        height: 6rem;
        display: flex;
        align-items:center;
        justify-content:center;
    }
    .logo-img{
        width: 4rem;
        height: 4rem;
        border-radius:5rem;
    }
    .qr{
        width: 100%;
        display: flex;
        align-items:center;
        justify-content:center;
    }
    .card-num{
        width: 100%;
        text-align: center;
        font-size: 24px;
    }
    .prompt{
        margin-top: .5rem;
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: darkgray;
    }
</style>