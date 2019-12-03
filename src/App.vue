<template>
  <div id="app">
    <!-- <m-parent></m-parent>
    <button @click="passMsg"> 非父子组件传值-bus</button> -->
    <!-- this is app -->
    <!-- <router-link to="/home/3">home</router-link>
    <button @click="toHome">home</button> -->
    <router-view></router-view>
  </div>
</template>

<script>
import bus from './util/bus'
import MParent from './views/Parent'
export default {
  components: {
    MParent,
  },
  methods: {
    passMsg() {
      bus.$emit('appmsg' , 'i am from app')
    },
    toHome(){
      this.$router.push({path:'/home',query:{name:'zhangsan'}});
      //this.$router.push({name:'home',params:{id:3}});
    }
  },
}
</script>
<style>

</style>
