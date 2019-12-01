<template>
    <div>
        <h1>Parent</h1>
        <h3>{{msg}}</h3>
        <h5>vuex <span style="color:red">{{showCount}}</span></h5>
        <button @click="addClick">增加</button>
        <m-child :msg="mChildMsg" @showChildMsg="showMsg" ref="child"></m-child>
        <h3>{{childMsg}}</h3>
    </div>
</template>

<script>
    import MChild from './Child'
    import {mapState,mapMutations,mapActions} from 'vuex'
    export default {
        // computed: {
        //     count() {
        //         return this.$store.state.count
        //     }
        // },
        computed: {
            ...mapState({
                showCount: 'count'
            })
        },
        data() {
            return {
                mChildMsg : '',
                msg : '',
                childMsg : ''
            }
        },
        components: {
            MChild,
        },
        methods: {
            showMsg(val) {
                this.msg = val
            },
            ...mapActions({
                addClick:'delayAdd'
            }),
            // ...mapMutations({
            //     addClick:'add'
            // }),
            // ...mapMutations([
            //     'add'
            // ])
            // add(){
            //     //this.$store.commit('add')
            //     this.$store.dispatch('delayAdd')
            // }
        },
        mounted () {
            this.mChildMsg = "from parent msg";
            this.childMsg = this.$children[0].childMsg;
            console.log('ref' , this.$refs.child.childMsg);
        },
    }
</script>

<style scoped>

</style>