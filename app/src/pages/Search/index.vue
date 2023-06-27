<template>
    <div>
        <h1>search组件</h1>
        <h2>{{ $route.params.keywords }}</h2>
        <h2>{{ $route.query.keywords }}</h2>
    </div>
</template>

<script>
export default {
    mounted() {
        // console.log(this.$router)
    },
}
</script>

<style></style>
