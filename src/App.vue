<template>
    <div class="wrapper">

        <header>
            <div class="navbar">
                <div class="container">
                    <div class="navbar-content">
                        <div class="logo">Users CRM</div>
                        <ul class="navbar-list">
                            <li class="navbar-item" v-for="link in links" :key="link.title">
                                <router-link 
                                    class="navbar-link"
                                    :to="link.to"
                                    :title="link.title">
                                    {{ link.title }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
        <router-view></router-view>
        <!-- <footer></footer> -->
    </div>
</template>

<script>
    export default {
        data: () => ({
            links: [
                { to: '/', title: 'Home' },
                { to: '/users', title: 'Users' },
            ]
        }),
    }
</script>

<style lang="scss">
.navbar-link {
    &.router-link-exact-active {
        color: #5247e7;
    }
}
</style>
