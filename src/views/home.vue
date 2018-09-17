<template>
    <ul class="routes">
        <li v-for="item in routes" :key="item.name" >
            <router-link :to="item.path">{{item.meta.title}}</router-link>
        </li>
    </ul>
</template>

<script>
import routerMain from '@/router/index.js';

export default {
    data () {
        return {
            routes: []
        }
    },
    mounted(){
        let ths = this;

        routerMain.options.routes.forEach(el => {
            if (el.name !== 'home') {
                ths.routes.push(el);
            }
        });
    }
}
</script>

<style lang="scss" scoped>
.routes {
    margin-top: 40px;
    li {
        margin-top: 10px;
        display: inline-block;
        a {
            font-size: 16px;
            margin-left: 100px;
        }
    }
}
</style>

