<template>
    <div class="body">
        <NavBar
                title="阅读并同意"
                left-text=""
                left-arrow
                fixed
                :border=false
                @click-left="onClickLeft"
        />
        <div class="nav-bar-hidden"></div>
        <div class="title"><h2>《泳客承诺书》</h2></div>
<!--        <div class="content">{{content}}</div>-->
        <div class="content">
            <p>1、购卡前，汉通游泳馆工作人员已于我本人进行了充分沟通，我本人对以上事项及可能产生的法律后果完全清楚、明白，并自愿承担由此产生的一切法律责任。</p>
            <p>2、本人承诺：由于我本人对身体状况估计不足或因自身体质等原因所引起的一切责任均由本人自行承担，与汉通游泳馆无关，汉通游泳馆不承担任何责任。我的承诺同样有效于我的继承人、近亲属。</p>
        </div>

        <div class="title"><h2>《泳友游泳健康告知书》</h2></div>
        <!--        <div class="content">{{content}}</div>-->
        <div class="content">
            <p>根据《湖北省游泳场所管理办法》、《经营高危险性体育项目许可管理办法》、《游泳场所卫生规范》等相关要求规定：严禁肝炎、红眼病、高血压、心脏病、脑血管疾病、中耳炎、肠道传染病、精神病、性病等患者进入游泳馆游泳。为确保泳友健身安全， 为广大泳友提供良好的健身环境，我们郑重告知：</p>
            <p>1、以上病患者不适应参加游泳活动，汉通游泳馆已将以上内容书面告知您本人。</p>
            <p>2、请您参加游泳活动前充分评估自身身体状况，确认无身体不适现象及以上提示疾病存在。</p>
            <p>3、游泳属高危险性健身项目。如您在游泳期间感觉身体不适，请立即停止游泳并告知身边的游泳管理工作人员。</p>
        </div>
        <div style="margin-top: 3rem"></div>
    </div>
</template>

<script>
    import { NavBar } from 'vant';
    export default {
        name: "OrderClause",
        components:{
            NavBar
        },
        data(){
            return {
                content:'',
            }
        },
        methods:{
            onClickLeft(){
                this.$router.go(-1);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .body{
        width: 100%;
        display: flex;
        flex-direction:column;
        align-items:center;
    }
    .nav-bar-hidden{
        height: 46px;
    }
    .title{
        margin-top: 2rem;
        margin-bottom: .5rem;
        width: 100%;
        display: flex;
        justify-content:center;
    }
    .content{
        width: 86%;
    }
</style>