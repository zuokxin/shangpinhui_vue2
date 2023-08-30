<template>
    <div>
        <Header></Header>
        <!-- 路由·组件出口 -->
        <router-view></router-view>
        <Footer v-show="$route.meta.show"></Footer>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped></style>
