<template>
    <div>
        <h3>Child</h3>
        <h5>{{msg}}</h5>
        <button @click="passMsg"> 走你 </button>
        <button @click="getParentVal('123123')"> 获取父组件的变量 </button>
        <h3>{{parentVal}}</h3>
        <h3>app value {{appVal}}</h3>
    </div>
</template>

<script>
import bus from '../util/bus'
    export default {
        props: {
            msg:{
                type: String,
                default: ''
            }
        },
        data() {
            return {
                childMsg: 'child msg',
                parentVal : '',
                appVal:''
            }
        },
        methods: {
            passMsg() {
                this.$emit('showChildMsg' , 'i am from child')
            },
            getParentVal(val){
                this.parentVal = val + this.$parent.mChildMsg
            }
        },
        mounted () {
            bus.$on('appmsg' , (val)=>{
                this.appVal = val
            });
        },
        
    }
</script>

<style lang="scss" scoped>

</style>