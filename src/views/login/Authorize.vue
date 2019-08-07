<template>
    
</template>

<script>
    import { GetAuthorizeUrl, Authorize } from './api'
    export default {
        name: "Authorize",
        mounted:function () {
            let code = this.$route.query.code;
            if(code){
                Authorize(code).then((response)=>{
                    localStorage.setItem('openid', response.openid);
                    localStorage.setItem('user', JSON.stringify(response));

                    let originRouter = localStorage.originRouter;
                    if(originRouter){
                        localStorage.removeItem('originRouter');
                        this.$router.push({ path: originRouter })
                    }else{
                        this.$router.push({ name: 'goods' })
                    }
                });
            }else{
                GetAuthorizeUrl(encodeURI(process.env.VUE_APP_BASE_URL+'/authorize')).then((response)=>{
                    this.goToUrl(response.auth_url);
                });
            }
        },
        methods:{
            goToUrl(url) {
                window.location.href = url;
            }
        },
    }
</script>

<style scoped>

</style>