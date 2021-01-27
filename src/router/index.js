import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index.vue'
import login from '../pages/login.vue'
import home from '../pages/home.vue'
import manage from '../pages/manage.vue'

Vue.use(Router)

const router =  new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: login,
        },
        {
            path: '/index',
            name: 'index',
            component: index,
            redirect:'home',
            children:[
                {
                    path: '/home',
                    name: 'home',
                    component: home,
                },
                {
                    path: '/manage/:type',
                    name: 'manage',
                    component: manage,
                },
            ]
        },
    ]
})
// router.beforeEach((to, from, next) => {
//     console.log(to)
//         if(!localStorage.getItem('token') && to.path != '/') {
//             // window.location.href = '/#/login'
//             next({ path: '/' })
//         } else {
//             next()
//         }
//
// })
export default router