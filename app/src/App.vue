<template>
    <div>
        <Header></Header>
        <!-- 路由·组件出口 -->
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
export default {
    components: {
        Header,
        Footer,
    },
}
</script>

<style></style>
