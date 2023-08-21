// home模块专享的小仓库
// 任何的小仓库包含：state、mutations、actions、getters
// 引入请求函数
import { reqCategory, reqBannerList, reqFloorList } from '@/api';
// 仓库存储数据的地方
let state = {
    // 商品分类的数据，仓库里面数据起始值不要乱写，取决于服务器返回值类型
    category: [],
    // 首页轮播图的数据
    bannerList: [],
    // floor数据
    floorList: [],
};
// 处理业务逻辑的地方【if,异步语句等】
let actions = {
    // 商品分类的actions
    // action可以书写异步语句
    async getCategory({ commit }) {
        // 获取服务器数据存储在vuex中
        // reqCategory函数执行，返回的是Promise对象【pending,成功，失败】
        // await等待成功的结果
        let result = await reqCategory();
        commit('GETCATEGORY', result.data);
        // 判断服务器返回的状态是200-> 成功
    },
    // 获取banner图的action
    async getBannerList({ commit }) {
        // 获取首页数据
        let result = await reqBannerList();
        if (result.code === 200) {
            commit('GETBANNERLIST', result.data);
        }
    },
    // 获取floor组件的数据
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result.code === 200) {
            commit('GEEFLOORLIST', result.data);
        }
    },
};

// 唯一修改·仓库数据的地方
let mutations = {
    GETCATEGORY(state, category) {
        state.category = category;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    },
};
// 仓库计算属性
let getters = {};

// 对外暴露小仓库
export default {
    state,
    mutations,
    actions,
    getters,
};
