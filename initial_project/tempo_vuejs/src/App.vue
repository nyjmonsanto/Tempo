<template>
    <div id="app">
        <header></header>
        <div class="admin-content">
            <div class="content">
                <div class="container mt-3">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "app"
};
</script>