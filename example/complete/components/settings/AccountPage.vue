<template>
    <div>
        <h1>Account</h1>

        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                routes: [],
            };
        },
        created() {
            this.addRoutes(this.$findAllRoutes());
        },
        methods: {
            addRoutes(routes) {
                routes.forEach(route => {
                    this.routes.push(route);

                    if (route.children && route.children.length > 0)
                        this.addRoutes(route.children);
                });
            },
        },
    }
</script>

<style scoped lang="scss">

</style>
