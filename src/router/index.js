import { createRouter, createWebHistory } from 'vue-router'

import EventList from '../views/Event/List.vue'
import EventLayout from '../views/Event/Layout.vue'
import EventDetails from '../views/Event/Details.vue'
import EventRegister from '../views/Event/Register.vue'
import EventEdit from '../views/Event/Edit.vue'

import About from '../views/About.vue'

import NotFound from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'

import NProgress from 'nprogress'
import store from '@/store'
const routes = [
    {
        path: '/',
        name: 'EventList',
        component: EventList,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/events/:id',
        name: 'EventLayout',
        props: true,
        component: EventLayout,
        children: [
            {
                path: '',
                name: 'EventDetails',
                component: EventDetails,
            },
            {
                path: 'register',
                name: 'EventRegister',
                component: EventRegister,
            },
            {
                path: 'edit',
                name: 'EventEdit',
                component: EventEdit,
                meta: { requireAuth: true },
            },
        ],
    },
    {
        path: '/event/:afterEvent(.*)',
        redirect: (to) => {
            return { path: `/events/${to.params.afterEvent}` }
        },
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound,
    },
    {
        path: '/404/:resource',
        name: '404Resource',
        component: NotFound,
        props: true,
    },
    {
        path: '/network-error',
        name: 'NetworkError',
        component: NetworkError,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return { top: 0 }
    },
})
router.beforeEach((to, from) => {
    NProgress.start()

    const isNeedAuth = true // if need user

    if (to.meta.requireAuth && isNeedAuth) {
        showMessageNotAuthUser()

        if (from.href) {
            return false
        } else {
            return { path: '/' }
        }
    }
})
router.afterEach(() => {
    NProgress.done()
})

export default router

function showMessageNotAuthUser() {
    store.dispatch('notification/showFlashMessage', {
        message: 'Sorry, you are not authorized to view this page!',
    })
}
