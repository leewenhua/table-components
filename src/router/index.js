import Vue from 'vue';
import Router from 'vue-router';
import tableRouter from '@/router/tableComponents/index.js';

Vue.use(Router);

let router = tableRouter;
let routerMain = new Router({
    routes: router
});

routerMain.beforeEach((to, from, next) => {
    // 路由发生变化修改页面title
    if (to.meta.title) {
        document.title = to.meta.title
    }

    // let allowBack = true //    给个默认值true

    // if (to.meta.allowBack !== undefined) {
    //     allowBack = to.meta.allowBack
    // }

    // if (!allowBack) {
    //     history.pushState(null, null, location.href)
    // }
    next();
})
export default routerMain;

