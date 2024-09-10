<template>
    <div class="pt-12">
        <div class="p-4 max-w-xs mx-auto bg-white dark:bg-gray-600 rounded-xl shadow-xl flex flex-col space-x-2">
            <div class="block mx-auto">
                <img class="h-30 w-40 mb-3.5" src="/school_img.png" alt="Vicegerents Logo">
            </div>
            <div>
                <div class="text-xl font-medium text-secondary dark:text-secondarylight">Login</div>
                <p class="text-gray-500 dark:text-gray-300 mb-3 border-b border-gray-200 text-sm">Input your Details...</p>
            </div>
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white"><i class="mdi mdi-account pr-1"></i>Ref ID</span>
                <input type="text" class="input-type-1" v-model="loginBody.ref_id" required />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white"><i class="mdi mdi-lock pr-1"></i>Password</span>
                <input type="password" class="input-type-1" v-model="loginBody.password" required />
            </label>

            <input type="submit" class="form-btn-1" @click="handleSubmit" /> 
            <span class="text-xs  mt-2 font-medium text-center text-gray-500 dark:text-white">(c) 2024 - The vicegerents Family</span>
        </div>
        <div class="text-center mt-2">
            <router-link :to="{name: 'applyLogin'}" class="text-sm font-normal text-right mt-1">Applicants Login &gt; </router-link>
        </div>
    </div>
</template>


<script>
import { openModal } from "jenesius-vue-modal"
import ModalComponent from "@/components/ModalComponent.vue"

export default {
    data(){
        return {
            loginBody: {
                ref_id: "", 
                password: ""
            },
            upper: "d",
            result: "r"
        }
    },
    mounted() {
        this.$store.commit("deactivateLoadingState")
    },
    updated(){
        this.$store.commit("deactivateLoadingState")
    },
    methods: {
        async handleSubmit(){
            if(this.loginBody.ref_id == ""){
                openModal(ModalComponent, {modal_type: "failed", modal_body: "Ref ID is not provided"})
                return
            }

            if(this.loginBody.password == ""){
                openModal(ModalComponent, {modal_type: "failed", modal_body: "Password is not provided"})
                return
            }

            // states whether the user is permitted or not [true, false, ERR_NET]
            const res = await this.$store.dispatch('user/authenticateUser', this.loginBody)
            
            if(res === "ERR_NET"){
                openModal(ModalComponent, {modal_type: "warning", modal_body: "Check Internet Connection"})
            } else if(res === true){
                openModal(ModalComponent, {modal_type: "success", modal_body: "Login Successful"}).then(() => {
                    
                    // checking if the user account is disabled or not 
                    const userDisabled = this.$store.getters['user/details'].account.disable_acct

                    // Redirects the user to the appropriate portal 
                    const position = this.$store.getters['user/details'].account.position
                    const admin_rights = this.$store.getters['user/details'].account.admin_rights || ""

                    if(userDisabled === "yes"){
                        // if the account is disabled 
                        openModal(ModalComponent, {modal_type: "info", modal_body: "Your account is disabled. Please contact the Admin for assistance!"})
                        this.$store.commit('user/UNSET_USER')
                        this.$store.commit('token/UNSET_TOKEN')
                    } else {
                        // if the account is not disabled 
                        if(admin_rights === "yes"){
                            // if admin rights is granted to user
                            // redirects to the admin portal
                            this.$router.push({name: 'adHome'})
                        } else {
                            if(position === "student"){
                                // redirects to the students portal 
                                this.$router.push({name: 'suHome'})
                            } else if(position === "admin"){
                                // redirects to the admin portal
                                this.$router.push({name: 'adHome'})
                            } else if(position !== ""){
                                // redirects to the staff portal if admin or staff privileges are not granted
                                this.$router.push({name: 'saHome'})
                            }
                            else {
                                openModal(ModalComponent, {modal_type: "warning", modal_body: "Invalid User Category"})
                                return 
                                this.$store.commit('user/UNSET_USER')
                            }
                        }
                    }

                })
                

            } else {
                openModal(ModalComponent, {modal_type: "failed", modal_body: "Invalid User ID or password"})
            }

            this.loginBody.password = ""

            
        }
    }
}
</script>