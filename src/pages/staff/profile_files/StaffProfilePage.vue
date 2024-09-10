<template>
    <div>
        <PageTitleComponent backTo="saHome" title="My Profile" />
        <img class="w-20 h-20 bg-white my-2 mx-auto rounded-2xl shadow-lg p-2" :src="$store.getters['user/details'].bio.img_url" />

        <div class="flex flex-col items-center w-full py-2 tweak-one bg-white">
            <span class="text-2xl font-bold">{{ `${staff.bio.surname.toUpperCase()} ${staff.bio.other_names.toUpperCase()}` }}</span>
            <span>ID: {{ staff.account.ref_id }}</span>
        </div>

        <!-- Personal information form -->
        <span :class="(personalExpand)? 'block border-0 p-3 bg-gray-300 font-bold' : 'block border-2 p-3 bg-white'" @click="personalExpand = !personalExpand">
            <i :class="(personalExpand)? 'mdi mdi-chevron-down mr-1' : 'mdi mdi-chevron-right mr-1' "></i>Personal
        </span>
        <Collapse class="v-collapse" :when="personalExpand" >
            <!-- NON-EDITABLE FIELDS -->
            <div class="flex flex-wrap p-4 bg-gray-100">
                <!-- FIRST PART OF NON-EDIATABLES -->
                <div class="w-full md:w-1/2">
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Title</span>
                        <div class="mb-4">{{ staff.bio.title || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Surname</span>
                        <div class="mb-4">{{ staff.bio.surname || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Other names</span>
                        <div class="mb-4">{{ staff.bio.other_names || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Gender</span>
                        <div class="mb-4">{{ staff.bio.gender || "NOT SPECIFIED" }}</div>
                    </label>
                </div>
                <!-- SECOND PART OF NON-EDIATABLES -->
                <div class="w-full md:w-1/2">
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Date of Birth</span>
                        <div class="mb-4">{{ staff.bio.date_of_birth || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">State of Origin</span>
                        <div class="mb-4">{{ staff.bio.state_of_origin || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Nationality</span>
                        <div class="mb-4">{{ staff.bio.nationality || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Religion</span>
                        <div class="mb-4">{{ staff.bio.religion || "NOT SPECIFIED" }}</div>
                    </label>
                </div>
            </div>
        </Collapse>

        <!-- Account information form -->
        <span :class="(accountExpand)? 'block border-0 p-3 bg-gray-300 font-bold' : 'block border-2 p-3 bg-white'" @click="accountExpand = !accountExpand">
            <i :class="(accountExpand)? 'mdi mdi-chevron-down mr-1' : 'mdi mdi-chevron-right mr-1' "></i>Account
        </span>
        <Collapse class="v-collapse" :when="accountExpand" >
            <!-- NON-EDITABLE FIELDS -->
            <div class="flex flex-wrap p-4 bg-gray-100">
                <!-- FIRST PART OF NON-EDIATABLES -->
                <div class="w-full md:w-1/2">
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Staff ID</span>
                        <div class="mb-4">{{ staff.account.ref_id || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Password</span>
                        <div class="mb-4">{{ staff.account.password || "***********" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Position</span>
                        <div class="mb-4">{{ staff.account.position || "NOT SPECIFIED" }}</div>
                    </label>
                </div>
                <!-- SECOND PART OF NON-EDIATABLES -->
                <div class="w-full md:w-1/2">
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Security Question</span>
                        <input type="text" class="input-type-1" v-model="staff.account.security_question" />
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Security Answer</span>
                        <input type="text" class="input-type-1" v-model="staff.account.security_answer" />
                    </label>
                    <button @click="updateHandler" class="py-2 px-8 bg-secondary hover:bg-secondarydark hover:text-white rounded-sm my-2 mb-6 focus:outline-none"><i class="mdi mdi-update"></i> Update</button>
                </div>
            </div>
        </Collapse>


        <!-- Academics information form -->
        <span :class="(academicExpand)? 'block border-0 p-3 bg-gray-300 font-bold' : 'block border-2 p-3 bg-white'" @click="academicExpand = !academicExpand">
            <i :class="(academicExpand)? 'mdi mdi-chevron-down mr-1' : 'mdi mdi-chevron-right mr-1' "></i>Academics 
        </span>
        <Collapse class="v-collapse" :when="academicExpand" >
            <!-- NON-EDITABLE FIELDS -->
            <div class="flex flex-wrap p-4 bg-gray-100">
                <!-- FIRST PART OF NON-EDIATABLES -->
                <div class="w-full md:w-1/2">
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Class Teacher</span>
                        <div class="mb-4">{{ staff.academic.class_teacher || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Position</span>
                        <div class="mb-4">{{ staff.academic.position || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Subject Holding</span>
                        <div class="mb-4">{{ staff.academic.subjects_holding || "NOT SPECIFIED" }}</div>
                    </label>
                </div>
            </div>
        </Collapse>


        <!-- Bank information form -->
        <span :class="(bankExpand)? 'block border-0 p-3 bg-gray-300 font-bold' : 'block border-2 p-3 bg-white'" @click="bankExpand = !bankExpand">
            <i :class="(bankExpand)? 'mdi mdi-chevron-down mr-1' : 'mdi mdi-chevron-right mr-1' "></i> Bank 
        </span>
        <Collapse class="v-collapse" :when="bankExpand" >
            <!-- NON-EDITABLE FIELDS -->
            <div class="flex flex-wrap p-4 bg-gray-100">
                <!-- FIRST PART OF NON-EDIATABLES -->
                <div class="w-full md:w-1/2">
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Account Name</span>
                        <div class="mb-4">{{ staff.bank.acct_name || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Bank Name</span>
                        <div class="mb-4">{{ staff.bank.bank_name || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Account Number</span>
                        <div class="mb-4">{{ staff.bank.acct_no || "NOT SPECIFIED" }}</div>
                    </label>
                </div>
            </div>
        </Collapse>


        <!-- Contact information form -->
        <span :class="(contactExpand)? 'block border-0 p-3 bg-gray-300 font-bold' : 'block border-2 p-3 bg-white'" @click="contactExpand = !contactExpand">
            <i :class="(contactExpand)? 'mdi mdi-chevron-down mr-1' : 'mdi mdi-chevron-right mr-1' "></i> Contact  
        </span>
        <Collapse class="v-collapse" :when="contactExpand" >
            <!-- NON-EDITABLE FIELDS -->
            <div class="flex flex-wrap p-4 bg-gray-100">
                <!-- FIRST PART OF NON-EDIATABLES -->
                <div class="w-full md:w-1/2">
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Phone Number 1</span>
                        <div class="mb-4">{{ staff.contact.tel_one || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Phone Number 2 </span>
                        <div class="mb-4">{{ staff.contact.tel_two || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Email Address</span>
                        <div class="mb-4">{{ staff.contact.email || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Home Address 1</span>
                        <div class="mb-4">{{ staff.contact.addr_one || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Home Address 2 </span>
                        <div class="mb-4">{{ staff.contact.addr_two || "NOT SPECIFIED" }}</div>
                    </label>
                </div>
            </div>
        </Collapse>

        

        <button @click="updateHandler" class="py-2 px-8 bg-secondary hover:bg-secondarydark hover:text-white rounded-sm my-2 mb-6 focus:outline-none"><i class="mdi mdi-update"></i> Request for a change</button>


    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"
import { openModal } from "jenesius-vue-modal"
import ModalComponent from "@/components/ModalComponent.vue"

export default {
    components: {PageTitleComponent},
    data(){
        return {
            personalExpand: false,
            accountExpand: false,
            academicExpand: false,
            bankExpand: false,
            contactExpand: false 
        }
    },
    computed: {
        staff() {
            let res = Object.assign({}, this.$store.getters['user/details'])
            let result = JSON.stringify(res)
            return JSON.parse(result)
        }
    },
    mounted() {
        this.$store.commit('deactivateLoadingState')
        
    },
    methods: {
        updateHandler(){
            this.$store.dispatch('user/update', this.staff).then(doc => {
                if(doc === true){
                    openModal(ModalComponent, {modal_type: "success", modal_body: `${this.staff.account.ref_id} details were updated successfully`})
                } else {
                    openModal(ModalComponent, {modal_type: "failed", modal_body: "Account updated failed due to internal errors"})
                }
            })
            // this.$store.commit('activateLoadingState')
            // updateStaff(this.$route.params.staffId, this.staff).then(doc => {
            //     // crafting log message
            //     let initiator = `${this.$store.state.user.user.bio.title} ${this.$store.state.user.user.bio.surname} ${this.$store.state.user.user.bio.other_names}`
            //     let recipient = `${this.staff.bio.title} ${this.staff.bio.surname} ${this.staff.bio.other_names}`
            //     let message = `${initiator} updated ${recipient}'s account details`
                
                
            //     alert("Staff Account Update Successfully")

            //     // stores a log body message in the database 
            //     createLog(logBodyForm(message))

            //     this.$store.commit('deactivateLoadingState')
            // }, () => {
            //     alert("An Internal error occurred. Staff's record is not updated ")
            // })
        }
    }
}
</script>

<style scoped>
.tweak-ofne {
    position: -webkit-sticky;
    position: sticky; 
    top: 0;
    z-index: 1;
}
</style>