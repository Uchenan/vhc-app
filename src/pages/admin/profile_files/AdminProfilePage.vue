<template>
    <div>
        <PageTitleComponent backTo="adHome" title="Edit Staff" />
        <br />
        <div class="mx-auto w-min">
            <img class="w-full mx-auto h-20 bg-gray-200 rounded-tr-lg rounded-tl-lg" ref="profile_pic" :src="$store.getters['user/details'].bio.img_url" />
            <input type="file" accept="img/jpeg, img/png" ref="select_img" @change="selectImg"  hidden /> 
            <button class="block w-max bg-primary text-white rounded-br-lg rounded-bl-lg py-2 px-3 hover:bg-primarydark" @click="clickImg">Change Picture </button> 
        </div>

        <div class="flex flex-col items-center w-full py-2 tweak-one bg-white">
                <span class="text-2xl font-bold">{{ `${staff.bio.surname.toUpperCase()} ${staff.bio.other_names.toUpperCase()}` }}</span>
            <span>ID: {{ staff.account.ref_id }}</span>
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
                <input type="date"  class="input-type-1" v-model="staff.bio.date_of_birth" />
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
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Job Position</span>
                <input type="text" class="input-type-1" v-model="staff.account.position" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Admin Rights Enabled?</span>
                <select class="input-type-1" v-model="staff.account.admin_rights">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </label>
            
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Security Question</span>
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
                <textarea class="input-type-1" v-model="staff.contact.addr_one" ></textarea>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Home Address 2</span>
                <textarea class="input-type-1" v-model="staff.contact.addr_two" ></textarea>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Email Address</span>
                <input type="email" class="input-type-1" v-model="staff.contact.email" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Phone Number 1</span>
                <div class="flex items-stretch mb-3">
                    <button class="bg-primary dark:bg-black text-white w-min px-4 rounded-tl-lg rounded-bl-lg focus:outline-none " disabled>+234</button>
                    <input type="number" v-model="staff.contact.tel_one" class="w-full p-2 border dark:bg-gray-700 text-gray-500 dark:text-white rounded-tr-lg rounded-br-lg border-slate-300 dark:border-slate-700 focus:outline-none" />
                </div>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Phone Number 2</span>
                <div class="flex items-stretch mb-3">
                    <button class="bg-primary dark:bg-black text-white w-min px-4 rounded-tl-lg rounded-bl-lg focus:outline-none " disabled>+234</button>
                    <input type="number" v-model="staff.contact.tel_two" class="w-full p-2 border dark:bg-gray-700 text-gray-500 dark:text-white rounded-tr-lg rounded-br-lg border-slate-300 dark:border-slate-700 focus:outline-none" />
                </div>
            </label>
        </form>

        <button @click="updateHandler" class="py-2 px-8 bg-secondary hover:bg-secondarydark hover:text-white rounded-sm my-2 mb-6 focus:outline-none"><i class="mdi mdi-update"></i> Update</button>


    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"
import { openModal } from "jenesius-vue-modal"
import ModalComponent from "@/components/ModalComponent.vue"
import UploadFileComponent from "@/components/UploadFileComponent.vue"
import { imageStaffUploader } from "@/helpers/imageUploader"
import axios from "axios"

export default {
    components: {PageTitleComponent},
    data(){
        return {
            selectedImg: "",
            formData: null,
            result: ""
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
        // this.$refs.profile_pic.src = this.staff.bio.img_id
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
                        file_title: `${this.staff.bio.surname} ${this.staff.bio.other_names}`
                    })
                    modal.on('return', (value) => {
                        if(value === true){
                            modal.close()
                            this.$store.commit('activateLoadingState')
                            // this.formData.append("file", this.selectedImg)
                            
                            imageStaffUploader(this.staff.account.ref_id, this.selectedImg).then(res => {
                                // this.$refs.profile_pic.src = res.secure_url
                                if(res == null){
                                    alert("An internal error occurred")
                                    return 
                                }
                                
                                this.staff.bio.img_url = res.secure_url 

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
.tweak-ofne {
    position: -webkit-sticky;
    position: sticky; 
    top: 0;
    z-index: 1;
}
</style>