// 仓库
import vuex from 'vuex';
import vue from 'vue';
// 安装插件
vue.use(vuex);

// 引入小仓库
import home from './home';
import search from './search';
import detail from './detail';
import user from './user';
import shopcart from './shopcart';
import trade from './trade';

// 对外暴漏小仓库
// 第一个注意：需要关键字new，没有new会报错
// 第二个注意：Store构造函数，书写时大写
export default new vuex.Store({
    // 大仓库需要注册全部小仓库
    // vuex新增的一个配置项：模块式开发，右侧v也是对象
    modeules: {
        home,
        search,
        detail,
        user,
        shopcart,
        trade,
    },
});
