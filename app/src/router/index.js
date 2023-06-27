import VueRouter from 'vue-router'
import Vue from 'vue'
// 使用插件
Vue.use(VueRouter)
// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, res, rej) {
    res && rej
        ? originPush.call(this, location, res, rej)
        : originPush.call(
              this,
              location,
              () => console.log(this),
              () => {}
          )
}
VueRouter.prototype.replace = function (location, res, rej) {
    res && rej
        ? originReplace.call(this, location, res, rej)
        : originReplace.call(
              this,
              location,
              () => console.log(this),
              () => {}
          )
}
export default new VueRouter({
    //配置路由
    routes: [
        {
            path: '/home',
            component: Home,
        },
        {
            path: '/search/:keywords?',
            name: 'search',
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
            redirect: '/home',
        },
    ],
})
