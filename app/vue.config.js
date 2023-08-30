module.exports = {
    productionSourceMap: false,
    // 关闭eslint校验工具
    lintOnSave: true,
    // 配置代理跨域
    devServer: {
        proxy: {
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn;',
            },
        },
    },
};
