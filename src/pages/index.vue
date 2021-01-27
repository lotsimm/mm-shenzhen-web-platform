<template>
    <div class="index">
        <Header class="i-header"/>
        <div class="main-content">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header.vue";
    export default {
        name: "index.vue",
        components:{Header}
    }
</script>

<style scoped>
.index{
    display: flex;
    flex-direction: column;
    height: 100vh;

}
.main-content{
    flex: 1;
    overflow: auto;
}
</style>