<template>
    <div class="pt-12 w-full mx-4  md:w-5/12 lg:w-3/12">
        <div class="p-4 mx-auto backdrop-blur-sm dark:bg-gray-600 rounded-2xl shadow-xl flex flex-col space-x-2 z-0">
            <div class="block mx-auto">
                <img class="h-30 w-40 mb-3.5" src="/school_img.png" alt="Vicegerents Logo">
            </div>
            <div>
                <div class="text-xl font-medium text-secondarydark dark:text-secondarydark">Applicant Login</div>
                <p class="text-gray-500 dark:text-gray-300 mb-3 border-b border-gray-200 text-sm">Input your Details...</p>
            </div>
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white"><i class="mdi mdi-account pr-1"></i>Generated ID</span>
                <input type="text" class="input-type-1 bg-transparent" v-model="loginBody.gen_id" required />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white"><i class="mdi mdi-lock pr-1"></i>Pin</span>
                <input type="text" class="input-type-1 bg-transparent" v-model="loginBody.pin" required />
            </label>

            <input type="submit" class="form-btn-1" @click="handleSubmit" /> 
            <span class="text-xs  mt-2 font-medium text-center text-gray-500 dark:text-white">(c) 2024 - The vicegerents Family</span>
        </div>
        <div class="text-center mt-2">
            <router-link :to="{name: 'login'}" class="text-sm font-normal"> &lt; Back to Login Page </router-link>
        </div>
    </div>
</template>

<script>
import { openModal } from 'jenesius-vue-modal';
import ModalComponent from "@/components/ModalComponent.vue"

export default {
    data(){
        return {
            loginBody: {
                gen_id: "",
                pin: ""
            }
        }
    },
    mounted() {
        this.$store.commit("deactivateLoadingState");
    },
    methods: {
        async handleSubmit(){
            if(this.loginBody.gen_id == ""){
                openModal(ModalComponent, {modal_type: "failed", modal_body: "Generated ID is not provided"})
                return
            }

            if(this.loginBody.pin == ""){
                openModal(ModalComponent, {modal_type: "failed", modal_body: "Password is not provided"})
                return
            }

            console.log(this.loginBody)
            // states whether the applicant is permitted or not [true, false, ERR_NET]
            const res = await this.$store.dispatch('applicant/authenticateApplicant', this.loginBody)
            
            if(res === "ERR_NET"){
                openModal(ModalComponent, {modal_type: "warning", modal_body: "Check Internet Connection"})
            } else if(res === true){
                openModal(ModalComponent, {modal_type: "success", modal_body: "Welcome Dear. Let's make today count"}).then(() => {
                    this.$router.push({name: 'applyHome'})
                })
            } else {
                openModal(ModalComponent, {modal_type: "failed", modal_body: "Invalid Applicant ID or password"})
            }
        }
    }
};
</script>
