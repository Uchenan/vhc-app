<template>
    <div>
        <PageTitleComponent backTo="adStudent" title="Edit Student" />
        <br />
        <div class="mx-auto w-min">
            <img class="w-full mx-auto h-20 bg-gray-200 rounded-tr-lg rounded-tl-lg" ref="profile_pic" :src="student.bio.img_url" />
            <input type="file" accept="img/jpeg, img/png" ref="select_img" @change="selectImg"  hidden /> 
            <button class="block w-max bg-primary text-white rounded-br-lg rounded-bl-lg py-2 px-3 hover:bg-primarydark" @click="clickImg">Change Picture </button> 
        </div>


        {{ student.academic }}
        {{  available_departments }}
        <div class="flex flex-col items-center w-full py-2 tweak-one bg-white">
            <span class="text-2xl font-bold">{{ fullname }}</span>
            <span class="text-md">{{ `${student.account.ref_id}` }}</span>
            <button @click="updateHandler" class="py-1 px-6 bg-secondary hover:bg-secondarydark hover:text-white rounded-md my-2 focus:outline-none"><i class="mdi mdi-update"></i> Update</button>
        </div>
        <!-- Personal information form -->
        <span class="block text-2xl my-3 font-bold border-b-2 flex items-center">Personal</span>
        <form>
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Surname</span>
                <input type="text" class="input-type-1" v-model="student.bio.surname" />
            </label>

             <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Other names</span>
                <input type="text"  class="input-type-1" v-model="student.bio.other_names" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Gender</span>
                <select class="input-type-1" v-model="student.bio.gender" >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
            </label>

             <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Date Of Birth</span>
                <input type="date"  class="input-type-1" v-model="student.bio.date_of_birth" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">State of Origin</span>
                <input type="text" class="input-type-1" v-model="student.bio.state_of_origin" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Nationality</span>
                <input type="text" class="input-type-1" v-model="student.bio.nationality"  /> 
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Religion</span>
                <select class="input-type-1" v-model="student.bio.religion">
                    <option>Christianity</option>
                    <option>Islam</option>
                </select>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Blood Group</span>
                <input type="text" class="input-type-1" v-model="student.bio.blood_group"  /> 
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Genotype</span>
                <input type="text" class="input-type-1" v-model="student.bio.genotype"  /> 
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Student Allergy</span>
                <input type="text" class="input-type-1" v-model="student.bio.student_allergy"  /> 
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">State Specific Sickness</span>
                <input type="text" class="input-type-1" v-model="student.bio.state_specific_sickness"  /> 
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Last school attended</span>
                <input type="text" class="input-type-1" v-model="student.bio.last_school_attended"  /> 
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Class last passed</span>
                <input type="text" class="input-type-1" v-model="student.bio.class_last_passed"  /> 
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Class last passed date</span>
                <input type="date" class="input-type-1" v-model="student.bio.class_last_passed_date"  /> 
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Quran Recitation</span>
                <select class="input-type-1" v-model="student.bio.quran_recitation">
                    <option>Fluently</option>
                    <option>Average </option>
                    <option> Fair </option> 
                    <option>Poor </option> 
                </select>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Identification of Arabic Alphabets</span>
                <select class="input-type-1" v-model="student.bio.identification_of_arabic_alphabets">
                    <option>Fluently</option>
                    <option>Average </option>
                    <option> Fair </option> 
                    <option>Poor </option> 
                </select>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Class to which admission is sought</span>
                <input type="text" class="input-type-1" v-model="student.bio.class_to_which_admission_is_sought"  /> 
            </label>
        </form>


        <br/>

         <!-- Account information form -->
        <span class="block text-2xl my-3 font-bold border-b-2 flex items-center">Account</span>
        <form>
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Ref ID</span>
                <input type="text" class="input-type-1"  v-model="student.account.ref_id" disabled/>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Position</span>
                <input type="text" class="input-type-1" v-model="student.account.position" disabled />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Disable Account?</span>
                <select class="input-type-1" v-model="student.account.disable_acct">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </label>
            
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Security Question</span>
                <input type="text"  class="input-type-1" v-model="student.account.security_question" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Security Answer</span>
                <input type="text"  class="input-type-1" v-model="student.account.security_answer" />
            </label>
        </form>

        <br/>

        <br/>

         <!-- Academics information form -->
        <span class="block text-2xl my-3 font-bold border-b-2 flex items-center">Academics</span>
        <form>
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Class</span>
                <select class="input-type-1" v-model="student.academic.level">
                    <option v-for="(value, index) in allLevels" :key="index" :value="value.code">
                        {{ value.name }}
                    </option>
                </select>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Department</span>
                <select class="input-type-1" v-model="student.academic.department">
                    <option v-for="(value, index) in available_departments" :key="index">
                        {{ value }}
                    </option>
                </select>
            </label>


             <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Prefect</span>
                <input type="number" max="10"  class="input-type-1" v-model="student.academic.prefect"/>
            </label>
        </form>

        <br />

        <!-- Father information form -->
        <span class="block text-2xl my-3 font-bold border-b-2 flex items-center">Father</span>
        <form>
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Father's Name</span>
                <input class="input-type-1" v-model="student.father.name" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Occupation</span>
                <input class="input-type-1" v-model="student.father.occupation" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Post</span>
                <input type="text" class="input-type-1" v-model="student.father.post" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Phone Number 1</span>
                <div class="flex items-stretch mb-3">
                    <button class="bg-primary dark:bg-black text-white w-min px-4 rounded-tl-lg rounded-bl-lg focus:outline-none " disabled>+234</button>
                    <input type="number" v-model="student.father.phone_no_one" class="w-full p-2 border dark:bg-gray-700 text-gray-500 dark:text-white rounded-tr-lg rounded-br-lg border-slate-300 dark:border-slate-700 focus:outline-none" />
                </div>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Phone Number 2</span>
                <div class="flex items-stretch mb-3">
                    <button class="bg-primary dark:bg-black text-white w-min px-4 rounded-tl-lg rounded-bl-lg focus:outline-none " disabled>+234</button>
                    <input type="number" v-model="student.father.phone_no_two" class="w-full p-2 border dark:bg-gray-700 text-gray-500 dark:text-white rounded-tr-lg rounded-br-lg border-slate-300 dark:border-slate-700 focus:outline-none" />
                </div>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Email</span>
                <input type="email" class="input-type-1" v-model="student.father.email" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Office Address</span>
                <textarea class="input-type-1" v-model="student.father.office_address"></textarea>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Residence Address</span>
                <textarea type="email" class="input-type-1" v-model="student.father.residence_address"></textarea>
            </label>
        </form>

        <br />
        <!-- Mother information form -->
        <span class="block text-2xl my-3 font-bold border-b-2 flex items-center">Mother</span>
        <form>
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Mother's Name</span>
                <input class="input-type-1" v-model="student.mother.name" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Occupation</span>
                <input class="input-type-1" v-model="student.mother.occupation" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Post</span>
                <input type="text" class="input-type-1" v-model="student.mother.post" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Phone Number 1</span>
                <div class="flex items-stretch mb-3">
                    <button class="bg-primary dark:bg-black text-white w-min px-4 rounded-tl-lg rounded-bl-lg focus:outline-none " disabled>+234</button>
                    <input type="number" v-model="student.mother.phone_no_one" class="w-full p-2 border dark:bg-gray-700 text-gray-500 dark:text-white rounded-tr-lg rounded-br-lg border-slate-300 dark:border-slate-700 focus:outline-none" />
                </div>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Phone Number 2</span>
                <div class="flex items-stretch mb-3">
                    <button class="bg-primary dark:bg-black text-white w-min px-4 rounded-tl-lg rounded-bl-lg focus:outline-none " disabled>+234</button>
                    <input type="number" v-model="student.mother.phone_no_two" class="w-full p-2 border dark:bg-gray-700 text-gray-500 dark:text-white rounded-tr-lg rounded-br-lg border-slate-300 dark:border-slate-700 focus:outline-none" />
                </div>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Email</span>
                <input type="email" class="input-type-1" v-model="student.mother.email" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Office Address</span>
                <textarea class="input-type-1" v-model="student.mother.office_address"></textarea>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Residence Address</span>
                <textarea type="email" class="input-type-1" v-model="student.mother.residence_address"></textarea>
            </label>
        </form>

        <br />

        <!-- Sponsor/ Guardian information form -->
        <span class="block text-2xl my-3 font-bold border-b-2 flex items-center">Sponsor / Guardian</span>
        <form>
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Sponsor or Guardian's Name</span>
                <input class="input-type-1" v-model="student.sponsor.name" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Occupation</span>
                <input class="input-type-1" v-model="student.sponsor.occupation" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Post</span>
                <input type="text" class="input-type-1" v-model="student.sponsor.post" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Phone Number 1</span>
                <div class="flex items-stretch mb-3">
                    <button class="bg-primary dark:bg-black text-white w-min px-4 rounded-tl-lg rounded-bl-lg focus:outline-none " disabled>+234</button>
                    <input type="number" v-model="student.sponsor.phone_no_one" class="w-full p-2 border dark:bg-gray-700 text-gray-500 dark:text-white rounded-tr-lg rounded-br-lg border-slate-300 dark:border-slate-700 focus:outline-none" />
                </div>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Phone Number 2</span>
                <div class="flex items-stretch mb-3">
                    <button class="bg-primary dark:bg-black text-white w-min px-4 rounded-tl-lg rounded-bl-lg focus:outline-none " disabled>+234</button>
                    <input type="number" v-model="student.sponsor.phone_no_two" class="w-full p-2 border dark:bg-gray-700 text-gray-500 dark:text-white rounded-tr-lg rounded-br-lg border-slate-300 dark:border-slate-700 focus:outline-none" />
                </div>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Email</span>
                <input type="email" class="input-type-1" v-model="student.sponsor.email" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Office Address</span>
                <textarea class="input-type-1" v-model="student.sponsor.office_address"></textarea>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Residence Address</span>
                <textarea type="email" class="input-type-1" v-model="student.sponsor.residence_address"></textarea>
            </label>
        </form>

    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"
import { openModal } from "jenesius-vue-modal"
import ModalComponent from "@/components/ModalComponent.vue"
import UploadFileComponent from "@/components/UploadFileComponent.vue"
import { imageStudentUploader } from "@/helpers/imageUploader"
import { toRaw } from 'vue'


export default {
    components: {PageTitleComponent},
    data(){
        return {
            student: structuredClone(toRaw(this.$store.getters['student/specific'](this.$route.params.ref_id))),
            available_departments: [],
            fullname: ""
        }
    },
    watch:{
        "student.academic.level": {
            handler: function(val){
                this.available_departments = []
                this.student.academic.department = ""
                this.departmentsChoice(val)
            }
        }
    }, 
    computed: {
        allLevels(){
            return this.$store.getters['level/details']
        }
    },
    mounted() {
        let names = structuredClone(toRaw(this.student.bio))
        this.fullname = `${names.surname.toUpperCase()} ${names.other_names.toUpperCase()}`

        this.$store.dispatch('level/fetchLevels')
        this.departmentsChoice(this.student.academic.level)
        this.$store.commit('deactivateLoadingState')
    },
    methods: {
        departmentsChoice(val){
            let level = this.allLevels.filter(x => x.code === val)
            if(level.length !== 0){
                level[0].arms.forEach(x => {
                    this.available_departments.push(x.department)
                })
            }
        },
        LevelNameFormatter(val){
            const level = this.allLevels.filter(x => x.code === val)
            if(level.length == 0){
                return ""
            } else {
                return level[0].name 
            }
        },
        updateHandler(){
            this.$store.dispatch('student/update', this.student).then(doc => {
                if(doc === true){
                    openModal(ModalComponent, {modal_type: "success", modal_body: `${this.student.account.ref_id} details were updated successfully`})
                    let names = structuredClone(toRaw(this.student.bio))
                    this.fullname = `${names.surname.toUpperCase()} ${names.other_names.toUpperCase()}`
                } else {
                    openModal(ModalComponent, {modal_type: "failed", modal_body: "Account updated failed due to internal errors"})
                }
            })
        },
        clickImg(){
            this.$refs.select_img.click()
        },
        selectImg(){
            let img = this.$refs.select_img.files[0]
            if(img){
                const reader = new FileReader()
    
                reader.onloadend = async () => {
                    this.selectedImg = reader.result 
                    const modal = await openModal(UploadFileComponent, {file_preview: this.selectedImg, 
                        file_body: "Upload this image now?",
                        file_title: `${this.student.bio.surname} ${this.student.bio.other_names}`
                    })
                    modal.on('return', (value) => {
                        if(value === true){
                            modal.close()
                            this.$store.commit('activateLoadingState')
                            // this.formData.append("file", this.selectedImg)
                            
                            imageStudentUploader(this.student.account.ref_id, this.selectedImg).then(res => {
                                // this.$refs.profile_pic.src = res.secure_url
                                if(res == null){
                                    alert("An internal error occurred")
                                    return 
                                }
                                
                                this.student.bio.img_url = res.secure_url 

                                this.updateHandler()

                                this.$store.commit('deactivateLoadingState')
                            }).catch(err => {
                                console.log(err)
                            })
                        } else {
                            console.log("Just go home") 
                            modal.close()
                        }
                    })
                    img = null 
                }
                reader.readAsDataURL(img)
            }

        }
    }
}
</script>

<style scoped>
.tweak-oner {
    position: -webkit-sticky;
    position: sticky; 
    top: 0;
    z-index: 1;
}
</style>