import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/game',
        name: 'Game',
        component: () => import('../views/Game.vue')
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
