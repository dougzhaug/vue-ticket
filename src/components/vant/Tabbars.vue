<template>
    <Tabbar v-model="current">
        <TabbarItem name="goods" to="/goods">
            <div class="tabber-content">
                <Icon name="shop-o" size="24"></Icon>
                <div class="tabber-text">商城</div>
            </div>
        </TabbarItem>
        <TabbarItem name="my" icon="" to="/my">
            <div class="tabber-content">
                <Icon name="user-o" size="24"></Icon>
                <div class="tabber-text">我的</div>
            </div>
        </TabbarItem>
    </Tabbar>
</template>

<script>
    import { Tabbar, TabbarItem,Icon} from 'vant';
    export default {
        name: "Tabbars",
        props:{
            active:{
                default:''
            }
        },
        components:{
            Tabbar,
            TabbarItem,
            Icon
        },
        data(){
            return {
                current:this.active
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tabber-content{
        display: flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
    }
    .tabber-text{
        margin-top: .2rem;
    }
</style>