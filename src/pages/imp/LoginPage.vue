<template>
    <div class="pt-12">
        {{ $store.state.user.user }}
        <div class="p-4 max-w-xs mx-auto bg-white dark:bg-gray-600 rounded-xl shadow-xl flex flex-col space-x-2">
            <div class="block mx-auto">
                <img class="h-30 w-40 mb-3.5" src="/school_img.png" alt="Vicegerents Logo">
            </div>
            <div>
                <div class="text-xl font-medium text-secondary dark:text-secondarylight">Login</div>
                <p class="text-gray-500 dark:text-gray-300 mb-3 border-b border-gray-200 text-sm">Input your Details...</p>
            </div>
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Ref ID</span>
                <input type="text" class="input-type-1" v-model="loginBody.refId" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Password</span>
                <input type="password" class="input-type-1" v-model="loginBody.password" />
            </label>

            <input type="submit" class="form-btn-1" @click="handleSubmit" /> 
            <span class="text-xs  mt-2 font-medium text-center text-gray-500 dark:text-white">(c) 2024 - The vicegerents Family</span>
        </div>
    </div>
</template>


<script>
import { authenticateStaff } from "@/services/staff.service"

export default {
    data(){
        return {
            loginBody: {
                refId: "", 
                password: ""
            },
            upper: "d"
        }
    },
    mounted() {
        this.$store.commit("deactivateLoadingState")
    },
    updated(){
        this.$store.commit("deactivateLoadingState")
    },
    methods: {
        handleSubmit(){
            this.$store.commit("activateLoadingState")
            authenticateStaff(this.loginBody.refId, this.loginBody.password).then(x => {
                if(x === "nil"){
                    alert("Username or Password incorrect!!!");
                    this.loginBody.password = ""
                    this.$store.commit("deactivateLoadingState")
                } else {
                    alert("Login Successful")
                    x.account.password = ""
                    this.$store.commit('setUser', x)
                    if(x.account.ref_id.toString().substring(7) === "SA" && x.account.admin_rights === "yes"){
                        this.$router.push({name: "adHome"})
                    } else {
                        this.$router.push({name: "test"})
                    }
                }
            })
            
        }
    }
}
</script>