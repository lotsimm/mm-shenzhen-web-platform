const path = require('path');

module.exports = {
    // 基本路径
    publicPath: '/',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.mode = 'production';
        } else {
            // 为开发环境修改配置...
            config.mode = 'development';
        }

        Object.assign(config, {
            // 开发生产共同配置
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, './src'),
                    '@c': path.resolve(__dirname, './src/components')
                }
            }
        });
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // css相关配置

    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        host: '192.168.11.186',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            // 设置代理
            // proxy all requests starting with /api to jsonplaceholder
            'http://localhost:8080/': {
                target: 'http://192.168.11.243:8080', //真实请求的目标地址
                changeOrigin: true,
                pathRewrite: {
                    '^http://localhost:8080/': ''
                }
            }
        },
        before: (app) => {}
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
};