<template>
    <div>
        this is home
        <h1>{{routerVal}}</h1>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                routerVal: ''
            }
        },
        mounted () {
            this.routerVal = this.$route.query.name;
        },
    }
</script>

<style scoped>

</style>