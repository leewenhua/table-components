import home from '@/views/home';
import tableComponents from '@/views/tableComponents/index';

let arr = [
    {
        path: '/',
        name: 'home',
        component: home,
        meta: {
            title: '主页'
        }
    },
    {
        path: '/tableComponents',
        name: 'tableComponents',
        component: tableComponents,
        meta: {
            title: '表格公用组件'
        }
    }
];

export default arr;
