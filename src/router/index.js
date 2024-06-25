import { createWebHistory, createRouter } from "vue-router"
import admin from "@/router/admin"
import important from "@/router/important"
import store from "@/store"

const routes = [
    ...admin,
    ...important,
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes 
})

router.beforeEach(() => {
    store.commit('activateLoadingState')
})

export default router