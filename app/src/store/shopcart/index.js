/* eslint-disable no-unused-vars */
// 购物车小仓库
import { reqShopCart, reqDeleteCart, reqUpdateChecked } from '@/api';
// 规范：利用vuex存储数据
import { SET_USERID } from '@/utils/USER_ID';
let state = {
    // vuex仓库存储用户临时身份，vuex存储数据是非持久化的，SET_USERID执行返回结果，是通过本地存储获取的
    USE_ID: SET_USERID(),
    shopCartInfo: [],
};
let mutations = {
    GETSHOPCART(state, payload) {
        state.shopCartInfo = payload;
    },
};

let actions = {
    // 获取用户购物车的数据
    async getShopCart({ commit }) {
        let result = await reqShopCart();
        if (result.code === 2000) {
            commit('GETSHOPCART', result.data);
        }
    },
    // 修改某一个商品勾选状态
    async updateChecked({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateChecked(skuId, isChecked);
        if (result.code === 200) {
            return 'ok';
        } else {
            return Promise.reject();
        }
    },
    // 修改全部商品的勾选状态
    allUpdateChecked({ commit, state, dispatch }, isChecked) {
        let arr = [];
        // 获取购物车商品的个数进行遍历
        state.shopCartInfo[0].cartInfoList.forEach(item => {
            // 调用修改某一个商品的action
            let ps = dispatch('updateChecked', { skuId: item.skuId, isChecked });
            arr.push(ps);
        });
        // Promise.all()参数需要的是一个数组【数组里面需要Promise】
        // promise.all()执行一次，返回的是一个Promise对象
        // promise.all()的状态取决于数组里面的promise状态：四个都成功、返回成功的promise，只要有一个失败，返回失败的promise状态
        return Promise.all(arr);
    },
    // 删除某一个商品的数据
    async deleteCartById({ commit }, skuId) {
        let result = await reqDeleteCart(skuId);
        if (result.code === 200) {
            return 'ok';
        } else {
            return Promise.reject();
        }
    },
    // 删除选中的商品
    deleteAllCart({ commit, state, dispatch }) {
        let arr = [];
        // 获取仓库里面购物车的数据
        state.shopCartInfo[0].cartInfoList.forEach(item => {
            // 商品的勾选状态是勾选的，发请求一个个删除
            if (item.isChecked === 1) {
                let ps = dispatch('deleteCartById', item.skuId);
                arr.push(ps);
            }
        });
        return Promise.all(arr);
    },
};

let getters = {
    // 计算数据里面第一个元素：对象
    CartInfo(state) {
        return state.shopCartInfo[0] || {};
    },
};

// 对外暴露
export default {
    state,
    mutations,
    actions,
    getters,
};
