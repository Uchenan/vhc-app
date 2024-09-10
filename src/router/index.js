import { createWebHistory, createRouter } from "vue-router"
import admin from "@/router/admin"
import important from "@/router/important"
import student from "@/router/student"
import apply from "./apply"
import staff from "@/router/staff"
import store from "@/store"
import { setBlockTracking } from "vue"

const routes = [
    {
        name: "empty",
        path: "/",
        redirect: "/login"
    },
    ...admin,
    ...important,
    ...student,
    ...staff,
    ...apply 
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes 
})

router.beforeEach(() => {
    store.commit('activateLoadingState')
})

export default router