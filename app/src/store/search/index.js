// search模块小仓库
import { reqSearchList } from '@/api';
let state = {
    searchList: {},
};

let actions = {
    async getSearchList({ commit }, searchParams) {
        let result = await reqSearchList(searchParams);
        if (result.code === 200) {
            commit('GETSEARCHLIST', result.data);
        }
    },
};

let mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    },
};

let getters = {
    // 计算新的属性：state，当前小仓库的数据
    goodsList(state) {
        return state.searchList.goodsList;
    },
    // 品牌的数据
    trademarkList(state) {
        return state.searchList.trademarkList;
    },
    // 商品属性
    attrsList(state) {
        return state.searchList.attrsList;
    },
};

// 对外暴露
export default {
    state,
    mutations,
    actions,
    getters,
};
