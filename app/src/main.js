import Vue from 'vue';
import App from './App.vue';
import Header from '@/components/header';
import Footer from '@/components/footer';
import TypeNav from '@/components/typeNav';
import Pagination from '@/components/pagination';
import HintButton from '@/components/hintButton';
Vue.component(Header.name, Header);
Vue.component(Footer.name, Footer);
Vue.component(TypeNav.name, TypeNav);
Vue.component(Pagination.name, Pagination);
Vue.component(HintButton.name, HintButton);
/**
 * //底下的写法目前是全部引入
 * //完整引入element-ui组件库，可以使用任意ui组件【都是全局组件】
 * //引入elementui插件
 * import ElementUI from 'element-ui';
 * //引入element样式
 * import 'element-ui/lib/theme-chalk/index.css'
 * //安装使用elementUI插件
 * Vue.use(ElementUI)
 */
// 按需引入
import { Button, Row, Col, MessageBox, Message, Input } from 'element-ui';
// element-ui大多数组件，注册为全局组件vue.component||vue.use
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
// 按需引入写法不同的：MessageBox、Message、Loading、Notification
Vue.prototype.$msgBox = MessageBox;
// 消息提示框
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
// 测试获取数据
// import {reqCategory} from '@/api';
// console.log('入口文件地方'，reqCategory())
// 注册路由功能
import router from '@/router';
// 注册仓库功能
import store from './store';

// 引入mockServe文件，让模拟接口跑起来
import '@/mock/mockServe.js';

// 将项目全部请求函数引入进来（分别暴露）
import * as http from '@/api';
// import '@/assets/css/reset.css'
new Vue({
    // 配置全局事件总线
    beforeCreate() {
        // 配置全局事件总线
        Vue.prototype.$bus = this;
        // 通过Vue.prototype原型对象，将全部请求函数挂载到原型对象身上【vc:就可以使用请求函数】
        Vue.prototype.$http = http;
    },
    // 下面代码作用：给项目添加路由功能，给全部vc实例身上拥有两个属性，$route||$router
    router,
    // 下面代码的作用：给项目添加仓库功能，主要的作用是给全部vc拥有一个$store属性
    store,
    render: h => h(App),
}).$mount('#app');
