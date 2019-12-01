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
        //host: '0.0.0.0', 
        port: 3000,
        open: true
        //proxy: {}, // 设置代理理
    },
    // 第三⽅方插件配置 
    pluginOptions: {
        // ...
    }
}