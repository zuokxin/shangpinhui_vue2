import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/assets/css/reset.css'
import typeNav from '@/components/typeNav'
Vue.component(typeNav.name, typeNav)
new Vue({
    render: (h) => h(App),
    router,
}).$mount('#app')
