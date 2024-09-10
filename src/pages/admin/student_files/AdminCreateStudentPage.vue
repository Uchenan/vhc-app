<template>
    <div>
       <PageTitleComponent backTo="adStudent" title="Create New Student" />
        <div>
            <br />
            <form @submit.prevent="handleSubmit">
                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Surname</span>
                    <input type="text"  class="input-type-1" v-model="student.bio.surname" required />
                </label>

                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Other names</span>
                    <input type="text" class="input-type-1" v-model="student.bio.other_names" required />
                </label>

                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Date of Birth</span>
                    <input type="date" class="input-type-1" v-model="student.bio.date_of_birth" required />
                </label>

                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Gender</span>
                    <select class="input-type-1" v-model="student.bio.gender"  required>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </label>


                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">State of Origin</span>
                    <input type="text" class="input-type-1" v-model="student.bio.state_of_origin" required />
                </label>


                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Religion</span>
                    <select class="input-type-1" v-model="student.bio.religion" required>
                        <option value="Islam">Islam</option>
                        <option value="Christianity">Christianity</option>
                        <option value="Others">Others</option>
                    </select>
                </label>
                
                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Blood Group</span>
                    <input type="text" class="input-type-1" v-model="student.bio.blood_group" required />
                </label>

                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Genotype</span>
                    <input type="text" class="input-type-1" v-model="student.bio.genotype" required />
                </label>

                 <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Student Allergy</span>
                    <input type="text" class="input-type-1" v-model="student.bio.student_allergy" />
                </label>

                 <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">State Specific Illness</span>
                    <input type="text" class="input-type-1" v-model="student.bio.state_specific_illness" required />
                </label>

                 <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Last School Attended</span>
                    <input type="text" class="input-type-1" v-model="student.bio.last_school_attended" required />
                </label>

                 <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Class last passed</span>
                    <input type="text" class="input-type-1" v-model="student.bio.class_last_passed" required />
                </label>

                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Class last passed date</span>
                    <input type="date" class="input-type-1" required v-model="student.bio.class_last_passed_date" />
                </label>

                 <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Quran Recitation</span>
                    <input type="text" class="input-type-1" v-model="student.bio.quran_recitation" required />
                </label>

                 <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Identification of Arabic alphabets</span>
                    <input type="text" class="input-type-1" v-model="student.bio.identification_of_arabic_alphabets" required />
                </label>

                 <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Class to Which admission is sought</span>
                    <input type="text" class="input-type-1" v-model="student.bio.class_to_which_admission_is_sought" required />
                </label>

                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Password</span>
                    <input type="password" class="input-type-1" v-model="student.account.password" required />
                </label>

                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Confirm Password</span>
                    <input type="password" class="input-type-1" v-model="confirm_password"  required />
                </label>

                <input type="submit" class="form-btn-1 w-full md:w-max my-3 px-6 " value="Submit" />
            </form>
            
        </div>
    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"
import studentModel from "@/models/student.model"
import { openModal } from "jenesius-vue-modal"
import ModalComponent from "@/components/ModalComponent.vue"



export default {
    components: {PageTitleComponent},
    data() {
        return {
            student: studentModel,
            confirm_password: ""
        }
    },
    mounted(){
    this.$store.commit('deactivateLoadingState')
    }, 
    methods: {
        async handleSubmit(){
            if(this.confirm_password === this.student.account.password){
                this.$store.dispatch('student/create', this.student).then(doc => {
                    if(doc.success === true){
                        openModal(ModalComponent, {modal_type: "success", modal_body: `Student with Ref ID of ${doc.data.account.ref_id} created successfully`})
    
                        // clearing user inputs 
                        this.student.bio.surname = ""
                        this.student.bio.other_names = ""
                        this.student.bio.date_of_birth = ""
                        this.student.bio.gender = ""
                        this.student.bio.state_of_origin = ""
                        this.student.bio.religion = ""
                        this.student.bio.blood_group = ""
                        this.student.bio.genotype = ""
                        this.student.bio.student_allergy = ""
                        this.student.bio.state_specific_illness = ""
                        this.student.bio.last_school_attended = ""
                        this.student.bio.class_last_passed = ""
                        this.student.bio.class_last_passed_date = ""
                        this.student.bio.quran_recitation = ""
                        this.student.bio.identification_of_arabic_alphabets = ""
                        this.student.bio.class_to_which_admission_is_sought = ""
                        this.student.account.password = ""
                        this.confirm_password = ""
                    } else {
                        openModal(ModalComponent, {modal_type: "failed", modal_body: `Student was not created due to internal errors`})
                    }
                })
            } else {
                openModal(ModalComponent, {modal_type: "failed", modal_body: `Passwords do not match`})
            }
            
        }
    }
}
</script>