<template>
    <div>
        <NavBar
                title="赠送记录"
                left-text=""
                left-arrow
                fixed
                :border=false
                @click-left="onClickLeft"
        />
        <div class="list">
            <List
                    v-model="loading"
                    :finished="finished"
                    :immediate-check=false
                    finished-text="已经到底了"
                    @load="onLoad"
            >
                <Cell v-for="(log,k) in list" :key="k" :title="log.receiver.nickname" size="large" value-class="right-title" :value="log.create_time" />
            </List>
        </div>
    </div>
</template>

<script>
    import { NavBar, List, Cell } from 'vant';
    import { GetGiveRecord } from './api'
    export default {
        name: "GiveRecord",
        components:{
            NavBar,
            List,
            Cell
        },
        data(){
            return {
                loading:false,
                finished:true,
                page:1,
                list:[],
            }
        },
        mounted(){
            this.onLoad();
        },
        methods:{
            onClickLeft(){
                this.$router.go(-1);
            },
            onLoad(){
                GetGiveRecord(this.$route.query.id,this.page).then((response)=>{
                    if(response.data.length !== 0){
                        this.list = this.list.concat(response.data);
                        this.page++;
                    }else{
                        this.finished = true;
                    }
                    this.loading = false;
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .list{
        margin-top: 46px;
    }
</style>