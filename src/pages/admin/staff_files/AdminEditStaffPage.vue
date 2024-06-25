<template>
    <div>
        <PageTitleComponent backTo="adStaff" title="Edit Staff" />
        <div class="w-20 h-20 bg-gray-400 my-2 mx-auto rounded-2xl"></div>

        <div class="flex flex-col items-center w-full py-2 tweak-one bg-white">
            <span class="text-2xl font-bold">{{ `${staff.bio.surname.toUpperCase()} ${staff.bio.other_names.toUpperCase()}` }}</span>
            <button @click="updateHandler" class="py-1 px-6 bg-secondary hover:bg-secondarydark hover:text-white rounded-md my-2 focus:outline-none"><i class="mdi mdi-update"></i> Update</button>
        </div>
        <!-- Personal information form -->
        <span class="block text-2xl my-3 font-bold border-b-2 flex items-center">Personal</span>
        <form>
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Title</span>
                 <select class="input-type-1" v-model="staff.bio.title">
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Master">Master</option>
                </select>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Surname</span>
                <input type="text" class="input-type-1" v-model="staff.bio.surname" />
            </label>

             <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Other names</span>
                <input type="text"  class="input-type-1" v-model="staff.bio.other_names" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Gender</span>
                <select class="input-type-1" v-model="staff.bio.gender" >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Others</option>
                </select>
            </label>

             <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Date Of Birth</span>
                <input type="date"  class="input-type-1" v-model="staff.bio.dob" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">State of Origin</span>
                <input type="text" class="input-type-1" v-model="staff.bio.state_of_origin" />
            </label>

             <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Nationality</span>
                <select class="input-type-1" v-model="staff.bio.nationality" >
                    <option>Nigeria</option>
                    <option>Ghana</option>
                    <option>Others</option>
                </select>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Religion</span>
                <select class="input-type-1" v-model="staff.bio.religion">
                    <option>Christianity</option>
                    <option>Islam</option>
                </select>
            </label>
        </form>


        <br/>

         <!-- Account information form -->
        <span class="block text-2xl my-3 font-bold border-b-2 flex items-center">Account</span>
        <form>
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Ref ID</span>
                <input type="text" class="input-type-1"  v-model="staff.account.ref_id" disabled/>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Job Position</span>
                <input type="text" class="input-type-1" v-model="staff.account.job_position" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Admin Rights Enabled?</span>
                <select class="input-type-1" v-model="staff.account.admin_rights">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </label>
            
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Securty Question</span>
                <input type="text"  class="input-type-1" v-model="staff.account.security_question" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Security Answer</span>
                <input type="text"  class="input-type-1" v-model="staff.account.security_answer" />
            </label>
        </form>

          <br/>

         <!-- Work information form -->
        <!-- <span class="block text-2xl my-3 font-bold border-b-2 flex items-center">Work</span>
        <form>
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Role</span>
                <select class="input-type-1">
                    <option>Teacher</option>
                    <option>Bursar</option>
                    <option>Fashion Designer</option>
                </select>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Class Teacher</span>
                <select class="input-type-1">
                    <option>JSS 1</option>
                    <option>JSS 2</option>
                    <option>JSS 3</option>
                </select>
            </label>

             <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Subjects Handling</span>
                <div class="my-2 flex flex-wrap">
                    <span class="tablet-1">JSS 3 Social Studies <i class="mdi mdi-close-circle"></i></span>
                    <span class="tablet-1">JSS1 History <i class="mdi mdi-close-circle"></i> </span>
                    <span class="tablet-1">JSS1 History <i class="mdi mdi-close-circle"></i> </span>
                    <span class="tablet-1">JSS1 History <i class="mdi mdi-close-circle"></i> </span>
                    <span class="tablet-1">JSS1 History <i class="mdi mdi-close-circle"></i> </span>
                </div>

                
                <span class="block font-bold my-1 text-slate-700 text-xs dark:text-white">Add Subject</span>
                <div class="flex items-stretch mb-3">
                    <select class="w-full p-2 border  text-gray-500 dark:bg-gray-700 dark:text-white rounded-tl-lg rounded-bl-lg border-slate-300 dark:border-slate-700 focus:outline-none focus:border-primarylight focus:ring-1">
                        <option>Basic Technology </option>
                        <option>Social Studies </option>
                        <option>Agricultural Science </option>
                    </select>
                    <button class="bg-primary dark:bg-black text-white w-min px-4 rounded-tr-lg rounded-br-lg focus:outline-none "><i class="mdi mdi-plus"></i></button>
                </div>
            </label>
        </form> -->

        <br/>

         <!-- Bank information form -->
        <span class="block text-2xl my-3 font-bold border-b-2 flex items-center">Bank</span>
        <form>
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Account Name</span>
                <input type="text" class="input-type-1" v-model="staff.bank.acct_name" />
            </label>

             <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Account Number</span>
                <input type="number" max="10"  class="input-type-1" v-model="staff.bank.acct_no"/>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Bank Name</span>
                <input type="text"  class="input-type-1" v-model="staff.bank.bank_name" />
            </label>
        </form>

        <br />

        <!-- Contact information form -->
        <span class="block text-2xl my-3 font-bold border-b-2 flex items-center">Contact</span>
        <form>
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Home Address 1</span>
                <textarea class="input-type-1" v-model="staff.contact.home_addr_one" ></textarea>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Home Address 2</span>
                <textarea class="input-type-1" v-model="staff.contacthome_addr_two" ></textarea>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Email Address</span>
                <input type="email" class="input-type-1" v-model="staff.contact.email" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Phone Number 1</span>
                <div class="flex items-stretch mb-3">
                    <button class="bg-primary dark:bg-black text-white w-min px-4 rounded-tl-lg rounded-bl-lg focus:outline-none " disabled>+234</button>
                    <input type="number" v-model="staff.contact.tel_1" class="w-full p-2 border dark:bg-gray-700 text-gray-500 dark:text-white rounded-tr-lg rounded-br-lg border-slate-300 dark:border-slate-700 focus:outline-none" />
                </div>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Phone Number 2</span>
                <div class="flex items-stretch mb-3">
                    <button class="bg-primary dark:bg-black text-white w-min px-4 rounded-tl-lg rounded-bl-lg focus:outline-none " disabled>+234</button>
                    <input type="number" v-model="staff.contact.tel_2" class="w-full p-2 border dark:bg-gray-700 text-gray-500 dark:text-white rounded-tr-lg rounded-br-lg border-slate-300 dark:border-slate-700 focus:outline-none" />
                </div>
            </label>
        </form>

    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"
import staffModel from "@/models/staff.model"
import { getSpecificStaff, updateStaff } from "@/services/staff.service"
import { createLog, logBodyForm } from "@/services/log.service"

export default {
    components: {PageTitleComponent},
    data(){
        return {
            staff: staffModel
        }
    },
    computed(){
        titles: {
            return this.$store.state.titles
        }
    },
    mounted() {
        getSpecificStaff(this.$route.params.staffId).then(doc => {
            this.staff = doc
            this.$store.commit('deactivateLoadingState')
        })
    },
    methods: {
        updateHandler(){
            this.$store.commit('activateLoadingState')
            updateStaff(this.$route.params.staffId, this.staff).then(doc => {
                // crafting log message
                let initiator = `${this.$store.state.user.user.bio.title} ${this.$store.state.user.user.bio.surname} ${this.$store.state.user.user.bio.other_names}`
                let recipient = `${this.staff.bio.title} ${this.staff.bio.surname} ${this.staff.bio.other_names}`
                let message = `${initiator} updated ${recipient}'s account details`
                
                
                alert("Staff Account Update Successfully")

                // stores a log body message in the database 
                createLog(logBodyForm(message))

                this.$store.commit('deactivateLoadingState')
            }, () => {
                alert("An Internal error occurred. Staff's record is not updated ")
            })
        }
    }
}
</script>

<style scoped>
.tweak-one {
    position: -webkit-sticky;
    position: sticky; 
    top: 0;
    z-index: 1;
}
</style>