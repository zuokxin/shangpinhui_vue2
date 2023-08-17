// 仓库
import vuex from 'vuex';
import vue from 'vue';
// 安装插件
vue.use(vuex);

// 引入小仓库

// 对外暴漏小仓库
// 第一个注意：需要关键字new，没有new会报错
// 第二个注意：Store构造函数，书写时大写
export default new vuex.Store({});
