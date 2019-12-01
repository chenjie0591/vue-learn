### vue 安装

1. 安装node

   ```
   选择对应系统进⾏行行下载，下载完成后直接安装即可
   	http://nodejs.cn/download/
   安装完成后，使用以下命令能打印出版本后即安装完成
   	node -v
   ```

2. 安装 vue-cli3

   ```shell
   // 安装vue-cli3
   	npm install -g @vue/cli
   // 安装完成后，使用以下命令，能打印出版本即安装完成
   	vue -v
   // 安装yarn
   	npm install -g yarn
   // 安装完成后，使用以下命令，能打印出版本即安装完成
   	yarn --version
   ```

3. 初始化项目

   ```shell
   // 在工程文件夹中（可以是空文件夹）
   	vue ui
   // 即可在浏览器中打开编辑项目
   1、点击在此文件夹中创建项目
   2、输入项目文件夹 -- base-learn
   	 包管理器 -- 选择 yarn(不需要翻墙，速度快)
   	 初始化 git 仓库 -- 打开(其他关闭)
   3、选择手动
   4、Babel Router vuex CSS Pre-processors Linter/Formatter 配置文件，这些选项打开，其他关闭
   5、一路默认，保存创建项目
   ```

4. 手动建立 vue.config.js文件 ， 在src同级

   ```js
   // vue.config.js 常⽤用配置 
   module.exports = {
   	// 基本路路径, vue.cli 3.3以前请使⽤用baseUrl 
     publicPath: '/',
   	// 输出⽂文件⽬目录
   	outputDir: 'dist',
   	// ⽤用于嵌套⽣生成的静态资产(js，css，img，fonts)的⽬目录。 
     assetsDir: '',
   	// ⽣生产环境sourceMap
   	productionSourceMap: true,
   	// webpack配置 
     configureWebpack: () => {},
     chainWebpack: () => {},
   	// css相关配置
   	css: {
   		// 启⽤用 CSS modules
       modules: false,
   		// 是否使⽤用css分离插件 
       extract: true,
   		// 开启 CSS source maps? 
       sourceMap: false,
   		// css预设器器配置项 
       loaderOptions: {},
   	},
   // webpack-dev-server 相关配置 
     devServer: {
       host: '0.0.0.0', 
       port: 8080,
       open: true, //启动成功后自动打开浏览器
       proxy: {}, // 设置代理理
     },
   // 第三⽅方插件配置 
     pluginOptions: {
   		// ...
     }
   }
   ```

### vue核心组件

1. 父子组件传值

   + 新建组件Parent.vue , Child.vue

     ```js
     //Parent.vue
     <template>
         <div>
             <h1>Parent</h1>
             <h3>{{msg}}</h3>
     				<!--@msg向子组件传值，在子组件中使用props来接收msg的值-->
             <!--@showChildMsg,接收子组件传过来的值，showChildMsg为$emit的名称-->
             <!--ref给该标签设置一个id，可以使用$refs.childRef来获取子组件的值或方法-->
             <m-child :msg="'from parent msg'" @showChildMsg="showMsg" ref="childRef"></m-child>
             <h3>{{childMsg}}</h3>
         </div>
     </template>
     
     <script>
         //引入child组件
         import MChild from './Child'
         export default {
             data() {
                 return {
                     msg: '',
                     childMsg:''
                 }
             },
             components: {
               	//注册组件，在标签上使用为<m-chid></m-child>
                 MChild,
             },
             methods: {
                 //@showChildMsg触发的事件，该事件为子组件(child.vue)传过来的值
               	//参数val为默认
                 showMsg(val) {
                     this.msg = val
                 }
             },
             mounted () {
                 //可以使用$children[序列值] 来获取子组件的方法或值
                 this.childMsg = this.$children[0].childMsg;
                 console.log('ref' , this.$refs.childRef.childMsg);
             },
         }
     </script>
     
     <style scoped>
     
     </style>
     ```

     ```js
     //Child.vue
     <template>
         <div>
             <h3>Child</h3>
             <h5>{{msg}}</h5>
             <button @click="passMsg"> 走你 </button>
         </div>
     </template>
     
     <script>
         export default {
     				//接收父组件传过来的变量申明
             props: {
                 msg:{
                     type: String,
                     default: ''
                 }
             },
             data() {
                 return {
                     childMsg: 'child msg'
                 }
             },
             methods: {
               	//向父组件传值，showChildMsg为该组件标签的@showChildMsg事件名称
                 passMsg() {
                     this.$emit('showChildMsg' , 'i am from child')
                   	//可以使用$parent 来获取父组件的方法或值
                 }
             },
             
         }
     </script>
     
     <style scoped>
     
     </style>
     ```

     ```js
     //App.vue
     <template>
       <div id="app">
         <m-parent></m-parent>
       </div>
     </template>
     
     <script>
     //引入parent主键
     import MParent from './views/Parent'
     export default {
       components: {
         //注册组件，在标签上使用为<m-parent></m-parent>
         MParent,
       },
       
     }
     </script>
     <style>
     
     </style>
     ```
     

2. 非父子组件传值（利用bus.js来传值）

   + 新建bus.js

     ```js
     import Vue from 'vue'
     export default new Vue
     ```

   + app.vue 

     ```html
     <!--定义按钮-->
     <button @click="passMsg"> 非父子组件传值-bus</button>
     <script>
     import bus from './util/bus'
     export default {
       methods: {
         passMsg() {
           //使用$emit的方法传给bus，appmsg这个名称必须与接收方保持一致
           bus.$emit('appmsg' , 'i am from app')
         }
       },
     }
     </script>
     ```

   + child.vue

     ```html
     <!--展示由app.vue传过来的值-->
     <h3>app value {{appVal}}</h3>
     
     <script>
     import bus from '../util/bus'
         export default {
             data() {
                 return {
                     appVal:''
                 }
             },
             mounted () {
               	//利用$on来监听bus中的appmsg的变化
                 bus.$on('appmsg' , (val)=>{
                     this.appVal = val
                 });
             },
             
         }
     </script>
     ```

3. 路由

   + 路由基本配置

     ```html
     <script>
     // 路径: /src/router/index.js
     // path: 路由访问路径
     // component: 访问路径对应的组件
     // name: 路路由指定命名，设置后可⽤用params传参及使⽤用name进⾏行行路路由跳转
     const routes = [
       {
         path: '/home',
    name: 'home',
         component: () => import('../views/Home.vue')
       }
     ]
     </script>
     <!--App.vue中加入此标签，可以通过访问 http://localhost:3000/#/home 来展示home的内容-->
     <router-view></router-view>
     ```
     
   + 路由跳转
   
     ```html
     <!--在App.vue中使用router-link来实现跳转-->
     <router-link to="/home">home</router-link>
     <script>
     // js调用路由跳转
       toHome(){
           this.$router.push({path:'/home'});
         }
     </script>
     ```
   
   + 路由传参
   
     ```html
     <script>
     	//路由的申明 /:变量名
       {
         path: '/home/:id',
         name: 'home',
         component: () => import('../views/Home.vue')
       }
     </script>
     
     <!--App.vue中-->
     <!--1. 可以通过router-link后面跟值-->
     <router-link to="/home/3">home</router-link>
     <script>
     	//可以通过js 传参  path为query , name为params
       //this.$router.push({path:'/home',query:{name:'zhangsan'}});
       this.$router.push({name:'home',params:{id:3}});
     </script>
     
     <!--参数接收 Home.vue中-->
     <h1>{{$route.params.id}}</h1>
     <script>
       //通过 this.$route.params来取
     	mounted(){
         //router-link 与  this.$router.push({name:'home',params:{id:3}});
         this.routerVal = this.$route.params.id;
         //this.$router.push({path:'/home',query:{name:'zhangsan'}});
         //this.routerVal = this.$route.query.name;
       },
     </script>
     
     ```
   
   + 路由嵌套
   
     ```html
     <script>
     //路由的配置
     const routes = [
       {
         path: '/home',
         name: 'home',
         component: () => import('../views/Home.vue'),
         children:[{
           path: '/child',
           component: () => import('../views/Child.vue')
         }]
       }
     ]
     </script>
     <!--在Home.vue中,访问路径: http://localhost:3000/#/child-->
     <router-view></router-view>
     ```
   
   + 导航守卫
   
     ```js
     //main.js中
     router.beforeEach((to , from , next) => {
       console.log(to.path);
       next();
     })
     //to: 将进⼊入的路路由对象
     //from: 将离开的路路由对象
     //next() 确认完成操作，最后⼀一定要调⽤用，不不然路路由就不不会进⾏行行切换
     ```

4. vuex

   - state : 存放变量

   - mutations : 改变state的方法

   - actions： 异步改变state的方法，也可以是同步

     ```js
     // /src/store/index.js 中申明 vuex的基本属性
     import Vue from 'vue'
     import Vuex from 'vuex'
     
     Vue.use(Vuex)
     
     export default new Vuex.Store({
       state: {
         count: 0,
       },
       mutations: {
         add(state){
           state.count ++
         },
         decrease(state){
           state.count --
         }
       },
       actions: {
         delayAdd(context){
           setTimeout(() => {
             context.commit('add')
           },1000);
         }
       },
       modules: {
       }
     })
     ```

     编辑路由，改变默认页面

     ```json
     {
       path : '/',
       component: () => import('../views/Parent.vue')
     }
     ```

     基本使用

     ```html
     <h5>vuex <span style="color:red">{{showCount}}</span></h5>
     <button @click="addClick">增加</button>
     <script>
       export default {
             computed: {
                showCount() {
                    return this.$store.state.count
                }
             },
             methods: {
                 add(){
                   	//调用mutations中的add方法
                     this.$store.commit('add')
                   	//调用actions中的delayAdd方法
                     //this.$store.dispatch('delayAdd')
                 }
             },
         }
     </script>
     ```

     使用辅助函数

     ```html
     <h5>vuex <span style="color:red">{{showCount}}</span></h5>
     <button @click="addClick">增加</button>
     <script>
         import {mapState,mapMutations,mapActions} from 'vuex'
         export default {
             computed: {
                 ...mapState({
                     showCount: 'count' //等同于 this.$store.state.count
                 })
             },
             methods: {
               	//事件名称与Actions方法名与Mutations一样
                 ...mapActions({
                   	//事件方法addClick,提交 this.$store.dispatch('delayAdd')
                     addClick:'delayAdd'
                 }),
               
               	// 当事件名称(@click) 与 Mutations方法名称不一样是，使用对象
                 // ...mapMutations({
                 //     addClick:'add' //事件方法addClick，提交this.$store.commit('add')
                 // }),
               
               	// 当事件名称(@click) 与 Mutations方法名称不一样是，使用数组
                 // ...mapMutations([
                 //     'add' //事件方法add，提交this.$store.commit('add')
                 // ])
             },
         }
     </script>
     ```

     

     