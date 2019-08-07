<template>
    <div>
        首页
    </div>
</template>

<script>
    import { GetList } from './api'
    export default {
        name: "Index",
        mounted() {
            GetList().then((response)=>{

            })
        }
    }
</script>

<style lang="scss" scoped>

</style>