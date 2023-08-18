<template>
    <div class="wrapper-content wrapper-content--fixed">
        <section>
            <div class="container">
                <!-- table -->
                <table>
                    <!-- head -->
                    <thead>
                        <tr>
                            <th @click="sort('fullname')">Name &#8595;</th>
                            <th @click="sort('username')">Username &#8595;</th>
                            <th @click="sort('email')">Email &#8595;</th>
                        </tr>
                    </thead>
                    <!-- body -->
                    <tbody>
                        <tr v-for="user in usersSort" :key="user.id">
                            <td> 
                                <img src='../assets/images/149071.png' :alt='user.username'/>
                                <span>{{ user.fullname }}</span>
                            </td>
                            <td> {{ user.username }} </td>
                            <td> {{ user.email }} </td>
                        </tr>
                    </tbody>
                </table>
                <p style="text-align:center;">
                    <span> debug: sort: {{ currentSort }}, dir: {{ currentSortDir }} </span>
                    <span> page: {{ this.page.current }}, length: {{ this.page.length }} </span>
                </p>
            </div>
        </section>
        <!-- buttons -->
        <section>
            <div class="contaier">
                <div class="button-list">
                    <div class="btn btnPrimary" @click="prevPage"> &#8592; </div>
                    <div class="btn btnPrimary" @click="nextPage"> &#8594; </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            users: [],
            currentSort: 'name',
            currentSortDir: 'asc',
            page: {
                current: 1,
                length: 4
            }
        }
    },
    created() {
        axios
            .get('https://fakestoreapi.com/users')
            .then(response => {
                this.users = response.data.map(item => {
                    return {
                        ...item,
                        fullname: this.fullName(item.name),
                    }
                });
                console.log(this.users);
            })
            .catch(error => {
                console.log(error);
            });
    },
    computed: {
        usersSort() {
            return this.users.sort((a, b) => {
                let mod = 1;
                if (this.currentSortDir === 'desc') {
                    mod = -1;
                }
                if (a[this.currentSort] < b[this.currentSort]) {
                    return -1 * mod;
                }
                if (a[this.currentSort] > b[this.currentSort]) {
                    return 1 * mod;
                }
                return 0;
            }).filter((row, index) => {
                let start = (this.page.current - 1) * this.page.length;
                let end = this.page.current * this.page.length;
                if (index >= start && index < end) {
                    return true;
                }
            })
        }
    },
    methods: {
        sort(e) {
            if (e === this.currentSort) {
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
            }
            this.currentSort = e;
        },
        prevPage() {
            if (this.page.current > 1) {
                this.page.current -= 1;
            }
        },
        nextPage() {
            if ((this.page.current * this.page.length) < this.users.length) {
                this.page.current += 1;
            }
        },
        fullName({ firstname, lastname }) {
            return `${firstname} ${lastname}`;
        },        
    }
}
</script>

<style lang="scss" scoped>
img {
    width: 60px;
    height: auto;
    border-radius: 50%;
    margin-right: 16px;
}

.button-list {
    width: 100%;
    text-align: center;

    .btn {
        border-radius: 60px;
        margin: 0 20px;
    }
}
</style>