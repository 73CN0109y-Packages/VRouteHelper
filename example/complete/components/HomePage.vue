<template>
    <div>
        <h1>{{ $route.meta.title }}</h1>
        <small>{{ $route.meta.subTitle }}</small>

        <ul>
            <li v-for="route in routes">
                <router-link :to="{ name: route.name }">{{ route.name }} - {{ resolveRouteName(route) }}</router-link>
            </li>
        </ul>
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
            // Get all the routes so we can render a list of them
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
            resolveRouteName(route) {
                // Get the full path for a route
                return this.$resolveRouteName(route.name, 'fullpath');
            },
        },
    }
</script>

<style scoped lang="scss">

</style>
