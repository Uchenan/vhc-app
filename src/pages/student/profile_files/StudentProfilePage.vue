<template>
    <div>
        <PageTitleComponent backTo="suHome" title="My Profile" />
        <img class="w-20 h-20 bg-white my-2 mx-auto rounded-2xl shadow-lg p-2" :src="$store.getters['user/details'].bio.img_url" />

        <div class="flex flex-col items-center w-full py-2 tweak-one bg-white">
            <span class="text-2xl font-bold">{{ `${student.bio.surname.toUpperCase()} ${student.bio.other_names.toUpperCase()}` }}</span>
            <span>ID: {{ student.account.ref_id }}</span>
        </div>

        <br /><br />
        <!-- Personal information form -->
        <span :class="(bioExpand)? 'block border-0 p-3 bg-gray-300 font-bold' : 'block border-2 p-3 bg-white'" @click="bioExpand = !bioExpand">
            <i :class="(bioExpand)? 'mdi mdi-chevron-down mr-1' : 'mdi mdi-chevron-right mr-1' "></i>Bio Data
        </span>
        <Collapse class="v-collapse" :when="bioExpand" >
            <!-- NON-EDITABLE FIELDS -->
            <div class="flex flex-wrap p-4 bg-gray-100">
                <!-- FIRST PART OF NON-EDIATABLES -->
                <div class="w-full md:w-1/2">
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Surname</span>
                        <div class="mb-4">{{ student.bio.surname || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Other names</span>
                        <div class="mb-4">{{ student.bio.other_names || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Date of Birth</span>
                        <div class="mb-4">{{ student.bio.date_of_birth || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">State of Origin</span>
                        <div class="mb-4">{{ student.bio.state_of_origin || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Religion</span>
                        <div class="mb-4">{{ student.bio.religion || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Nationality</span>
                        <div class="mb-4">{{ student.bio.nationality || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Blood Group</span>
                        <div class="mb-4">{{ student.bio.blood_group || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Genotype</span>
                        <div class="mb-4">{{ student.bio.genotype || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Class to which admission is sought</span>
                        <div class="mb-4">{{ student.bio.class_to_which_admission_is_sought || "NOT SPECIFIED" }}</div>
                    </label>
                </div>
                <!-- SECOND PART OF NON-EDIATABLES -->
                <div class="w-full md:w-1/2">
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Gender</span>
                        <div class="mb-4">{{ student.bio.gender || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Student Allergy</span>
                        <div class="mb-4">{{ student.bio.student_allergy || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">State Specific Illness</span>
                        <div class="mb-4">{{ student.bio.state_specific_sickness || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Last School Attended</span>
                        <div class="mb-4">{{ student.bio.last_school_attended || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Class Last Passed</span>
                        <div class="mb-4">{{ student.bio.class_last_passed || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Class last passed date</span>
                        <div class="mb-4">{{ student.bio.class_last_passed_date || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Quran Recitation</span>
                        <div class="mb-4">{{ student.bio.quran_recitation || "NOT SPECIFIED" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Identification of Arabic Alphabets</span>
                        <div class="mb-4">{{ student.bio.identification_of_arabic_alphabets || "NOT SPECIFIED" }}</div>
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
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Student ID</span>
                        <div class="mb-4">{{ student.account.ref_id || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Password</span>
                        <div class="mb-4">{{ student.account.password || "***********" }}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Position</span>
                        <div class="mb-4">{{ student.account.position || "NOT SPECIFIED" }}</div>
                    </label>
                </div>
                <!-- SECOND PART OF NON-EDIATABLES -->
                <div class="w-full md:w-1/2">
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Security Question</span>
                        <input type="text" class="input-type-1" v-model="student.account.security_question" />
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Security Answer</span>
                        <input type="text" class="input-type-1" v-model="student.account.security_answer" />
                    </label>
                    <button @click="updateHandler" class="py-2 px-8 bg-secondary hover:bg-secondarydark hover:text-white rounded-sm my-2 mb-6 focus:outline-none"><i class="mdi mdi-update"></i> Update</button>
                </div>
            </div>
        </Collapse>

        <!-- Academic information form -->
        <span :class="(academicExpand)? 'block border-0 p-3 bg-gray-300 font-bold' : 'block border-2 p-3 bg-white'" @click="academicExpand = !academicExpand">
            <i :class="(academicExpand)? 'mdi mdi-chevron-down mr-1' : 'mdi mdi-chevron-right mr-1' "></i>Academics
        </span>
        <Collapse class="v-collapse" :when="academicExpand" >
            <!-- NON-EDITABLE FIELDS -->
            <div class="flex flex-wrap p-4 bg-gray-100">
                <!-- FIRST PART OF NON-EDIATABLES -->
                <div class="w-full md:w-1/2">
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Current Class</span>
                        <div class="mb-4">{{ student.academic.level || "NOT SPECIFIED"}}</div>
                    </label>
                </div>
                <!-- SECOND PART OF NON-EDIATABLES -->
                <div class="w-full md:w-1/2">
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Additional Responsibility(Prefect) </span>
                        <div class="mb-4">{{ student.academic.prefect || "NOT SPECIFIED" }}</div>
                    </label>
                </div>
            </div>
        </Collapse>

        <!-- Parental/sponsorship information form -->
        <span :class="(parentalExpand)? 'block border-0 p-3 bg-gray-300 font-bold' : 'block border-2 p-3 bg-white'" @click="parentalExpand = !parentalExpand">
            <i :class="(parentalExpand)? 'mdi mdi-chevron-down mr-1' : 'mdi mdi-chevron-right mr-1' "></i>Parent/ Sponsor
        </span>
        <Collapse class="v-collapse-long" :when="parentalExpand" >
            <!-- NON-EDITABLE FIELDS -->
            <div class="flex flex-wrap p-4 bg-gray-100">
                <!-- FIRST PART OF NON-EDIATABLES -->
                <div class="w-full md:w-1/2">
                    <h3 class="text-lg border-b-2 mb-2">Father's Information </h3>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Full name</span>
                        <div class="mb-4">{{ student.father.name || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Occupation</span>
                        <div class="mb-4">{{ student.father.occupation || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Post</span>
                        <div class="mb-4">{{ student.father.post || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Phone Number 1</span>
                        <div class="mb-4">{{ student.father.phone_no_one || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Phone Number 2</span>
                        <div class="mb-4">{{ student.father.phone_no_two || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Email Address</span>
                        <div class="mb-4">{{ student.father.email || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Office Address</span>
                        <div class="mb-4">{{ student.father.office_address || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Residence Address</span>
                        <div class="mb-4">{{ student.father.residence_address || "NOT SPECIFIED"}}</div>
                    </label>

                    <br /> 
                    <div>
                        <h3 class="text-lg border-b-2 mb-2">Guardian / Sponsor's Information </h3>
                        <label class="my-2">
                            <span class="block font-medium text-slate-700 text-sm dark:text-white">Full name</span>
                            <div class="mb-4">{{ student.sponsor.name || "NOT SPECIFIED"}}</div>
                        </label>
                        <label class="my-2">
                            <span class="block font-medium text-slate-700 text-sm dark:text-white">Occupation</span>
                            <div class="mb-4">{{ student.sponsor.occupation || "NOT SPECIFIED"}}</div>
                        </label>
                        <label class="my-2">
                            <span class="block font-medium text-slate-700 text-sm dark:text-white">Post</span>
                            <div class="mb-4">{{ student.sponsor.post || "NOT SPECIFIED"}}</div>
                        </label>
                        <label class="my-2">
                            <span class="block font-medium text-slate-700 text-sm dark:text-white">Phone Number 1</span>
                            <div class="mb-4">{{ student.sponsor.phone_no_one || "NOT SPECIFIED"}}</div>
                        </label>
                        <label class="my-2">
                            <span class="block font-medium text-slate-700 text-sm dark:text-white">Phone Number 2</span>
                            <div class="mb-4">{{ student.sponsor.phone_no_two || "NOT SPECIFIED"}}</div>
                        </label>
                        <label class="my-2">
                            <span class="block font-medium text-slate-700 text-sm dark:text-white">Email Address</span>
                            <div class="mb-4">{{ student.sponsor.email || "NOT SPECIFIED"}}</div>
                        </label>
                        <label class="my-2">
                            <span class="block font-medium text-slate-700 text-sm dark:text-white">Office Address</span>
                            <div class="mb-4">{{ student.sponsor.office_address || "NOT SPECIFIED"}}</div>
                        </label>
                        <label class="my-2">
                            <span class="block font-medium text-slate-700 text-sm dark:text-white">Residence Address</span>
                            <div class="mb-4">{{ student.sponsor.residence_address || "NOT SPECIFIED"}}</div>
                        </label>
                    </div>
                </div>
                <!-- SECOND PART OF NON-EDIATABLES -->
                <div class="w-full md:w-1/2">
                    <h3 class="text-lg border-b-2 mb-2">Mother's Information </h3>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Full name</span>
                        <div class="mb-4">{{ student.mother.name || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Occupation</span>
                        <div class="mb-4">{{ student.mother.occupation || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Post</span>
                        <div class="mb-4">{{ student.mother.post || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Phone Number 1</span>
                        <div class="mb-4">{{ student.mother.phone_no_one || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Phone Number 2</span>
                        <div class="mb-4">{{ student.mother.phone_no_two || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Email Address</span>
                        <div class="mb-4">{{ student.mother.email || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Office Address</span>
                        <div class="mb-4">{{ student.mother.office_address || "NOT SPECIFIED"}}</div>
                    </label>
                    <label class="my-2">
                        <span class="block font-medium text-slate-700 text-sm dark:text-white">Residence Address</span>
                        <div class="mb-4">{{ student.mother.residence_address || "NOT SPECIFIED"}}</div>
                    </label>

                </div>
            </div>
        </Collapse>
        


        
        <button class="py-2 px-8 bg-secondary hover:bg-secondarydark hover:text-white rounded-sm my-2 mb-6 focus:outline-none">
            <i class="mdi mdi-update"></i> Request for a change 
        </button>


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
            bioExpand: false,
            accountExpand: false,
            academicExpand: false,
            parentalExpand: false 
        }
    },
    computed: {
        student() {
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
            this.$store.dispatch('user/update', this.student).then(doc => {
                if(doc === true){
                    openModal(ModalComponent, {modal_type: "success", modal_body: `${this.student.account.ref_id} details were updated successfully`})
                } else {
                    openModal(ModalComponent, {modal_type: "failed", modal_body: "Account updated failed due to internal errors"})
                }
            })
            console.log(this.student)
        }
    }
}
</script>

<style scoped>
.v-collapse {
    transition: height 350ms ease-out; 
}

.v-collapse-long {
    transition: height 700ms ease-out; 
}
</style>