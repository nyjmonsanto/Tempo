<template>
    <div id="app">
        <div class="container mt-5">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    name: "app"
};
</script>

<style>
    #app {
        text-align: center;
        width: 100%;
    }
</style>
