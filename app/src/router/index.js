import VueRouter from 'vue-router'
import Vue from 'vue'
// 使用插件
Vue.use(VueRouter)
// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
export default new VueRouter({
    //配置路由
    routes: [
        {
            path: '/home',
            component: Home,
        },
        {
            path: '/search',
            component: Search,
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/register',
            component: Register,
        },
        {
            path: '*',
            redirect: "/home",
        },
    ],
})
