// detail模块的小仓库
import { reqDetailList, reqAddOrUpdateCart } from '@/api';
let state = {
    // 商品详情的数据
    detailInfo: {},
};

let actions = {
    async getDetailInfo({ commit }, skuId) {
        // 商品详情请求，需要携带商品ID
        let result = await reqDetailList(skuId);
        if (result.code === 200) {
            commit('GETDETAILINFO', result.data);
        }
    },
    // 加入购物车|将来修改商品个数的地方，右侧是载荷对象【两个K,两个V】
    // eslint-disable-next-line no-unused-vars
    async addOrUpdateCart({ state }, { skuId, skuNum }) {
        // 底下即为：加入购物车（修改商品个数）的请求，参数顺序不能瞎写
        let result = await reqAddOrUpdateCart(skuId, skuNum);

        if (result.code === 200) {
            // 如果加入购物车成功，返回Promise即为成功
            return 'ok';
        } else {
            return Promise.reject();
        }
    },
};

let mutations = {
    GETDETAILINFO(state, detailInfo) {
        state.detailInfo = detailInfo;
    },
};

let getters = {
    // 面包屑的数据
    categoryView(state) {
        return state.detailInfo.categoryView || {};
    },
    // 商品信息的数据
    skuInfo() {
        return state.detailInfo.skuInfo || {};
    },
    // 商品销售属性列表的数据
    spuSaleAttrList() {
        return state.detailInfo.spuSaleAttrList || [];
    },
};

// 对外暴露
export default {
    state,
    mutations,
    actions,
    getters,
};
