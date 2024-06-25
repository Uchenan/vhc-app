<template>
    <div>
       <PageTitleComponent backTo="adStaff" title="Create Staff" />
        <div>
            <br />
            <form @submit.prevent="handleSubmit">
                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Title</span>
                    <select class="input-type-1" v-model="staff.bio.title" required>
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Master">Master</option>
                    </select>
                </label>

                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Surname</span>
                    <input type="text"  class="input-type-1" v-model="staff.bio.surname" required />
                </label>

                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Other names</span>
                    <input type="text" class="input-type-1" v-model="staff.bio.other_names" required />
                </label>

                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Gender</span>
                    <select class="input-type-1" v-model="staff.bio.gender" required>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </label>

                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Date of Birth</span>
                    <input type="date" class="input-type-1" v-model="staff.bio.dob" required />
                </label>

                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">State of Origin</span>
                    <input type="text" class="input-type-1" v-model="staff.bio.state_of_origin" required />
                </label>

                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Nationality</span>
                    <input type="text" class="input-type-1" v-model="staff.bio.nationality" required />
                </label>

                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Religion</span>
                    <select class="input-type-1" v-model="staff.bio.religion" required>
                        <option value="Islam">Islam</option>
                        <option value="Christianity">Christianity</option>
                        <option value="Others">Others</option>
                    </select>
                </label>

                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Job Position</span>
                    <input type="text" class="input-type-1" v-model="staff.account.job_position" required />
                </label>

                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Admin Rights Enabled?</span>
                    <select class="input-type-1" v-model="staff.account.admin_rights">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </label>

                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Password</span>
                    <input type="password" class="input-type-1" v-model="staff.account.password" required />
                </label>

                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Confirm Password</span>
                    <input type="password" class="input-type-1" v-model="checkPassword"  required />
                </label>

                <input type="submit" class="form-btn-1 w-full md:w-max my-3 px-6 " value="Submit" />
            </form>
            
        </div>
    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"
import staffModel from "@/models/staff.model"
import { createStaff } from "@/services/staff.service"
import { createLog, logBodyForm } from "@/services/log.service"


export default {
    components: {PageTitleComponent},
    data() {
        return {
            staff: staffModel,
            checkPassword: ""
        }
    },
    mounted(){
        this.$store.commit('deactivateLoadingState')
    }, 
    methods: {
        handleSubmit(){
            this.$store.commit('activateLoadingState')
            if(this.staff.account.password === this.checkPassword){
                createStaff(this.staff).then(doc => {
                    if(doc === "nil"){
                        setTimeout(() => {
                            alert("An internal error occurred - 105. Staff is not created.")
                            this.$store.commit('deactivateLoadingState')
                        }, 3000)
                    } else {
                        alert("Staff created successfully")


                        // crafting log message
                        let initiator = `${this.$store.state.user.user.bio.title} ${this.$store.state.user.user.bio.surname} ${this.$store.state.user.user.bio.other_names}`
                        let recipient = `${this.staff.bio.title} ${this.staff.bio.surname} ${this.staff.bio.other_names}`
                        let message = `${initiator} created a new staff: "${recipient}"`
                        

                        // stores a log body message in the database 
                        createLog(logBodyForm(message))


                        this.staff.bio.title = ""
                        this.staff.bio.surname = ""
                        this.staff.bio.other_names = ""
                        this.staff.bio.gender = ""
                        this.staff.bio.dob = ""
                        this.staff.bio.state_of_origin = ""
                        this.staff.bio.nationality = ""
                        this.staff.bio.religion = ""
                        this.staff.account.job_position = ""
                        this.staff.account.admin_rights = ""
                        this.staff.account.password = ""
                        this.checkPassword = ""

                        this.$store.commit('deactivateLoadingState')
                    }
                }, err => {
                    alert("An internal error occurred - 104. Staff is not created.")
                })
            } else {
                alert("The passwords don not match!!! Please try again")
                this.$store.commit('deactivateLoadingState')
                this.checkPassword = ""


            }
            
        }
    }
}
</script>