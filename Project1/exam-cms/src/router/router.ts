// 一级路由
import Login from '../views/login';
import Main from '../views/main';

// 二级路由
// import Content from '../components/Content';

export default {
    routes: [{
        path: '/main',
        component: Main,
        children: [{
            path: '/list/content',
            component: ()=>null
        }]
    },{
        path: '/login',
        component: Login
    }]
}