<template>
    <div>
       <PageTitleComponent backTo="adHome" :title="title" />
        

        <div class="flex border-b-2 text-sm mt-2 mb-6">
            <button :class="(display == 'single')? 'py-2 px-6 bg-gray-300' : 'py-2 px-6' " @click="display = 'single' ">Single</button>
            <button  :class="(display == 'package')? 'py-2 px-6 bg-gray-300' : 'py-2 px-6' " @click="display = 'package' ">Package</button> 
        </div>
        

        <div v-if="display == 'single' ">
            <router-link class="form-btn-1 py-1 px-3" :to="{name: 'adCreateSubject' }">
                <i class="mdi mdi-plus"></i> New Subject
            </router-link>
            <h1 class="text-xl font-medium text-primarydark mt-6 pb-1 mb-1">Created Subjects</h1>
            <br />
            
            <!-- SINGLE SUBJECT DISPLAY -->
            <div v-if="subjects.length > 0">
                <span class="block text-center text-xs"><i class="mdi mdi-star text-secondary"></i> = Composite Subject</span>
                <span class="block font-medium text-center mt-3">{{ subjects.length + " subjects created"}}</span>
                <router-link class="p-3 my-3 shadow-md rounded-md block" v-for="(value, index) in subjects" 
                :key="index" :to="{name: 'adEditSubject', params: {code: value.code}}">
                    <i class="mdi mdi-radiobox-marked mr-2"></i>{{ value.name }}
                    <i class="mdi mdi-star text-secondary float-right" v-if="value.sub_subjects.length > 0" ></i>
                </router-link>
            </div>        
            <div v-else class="text-center text-xs mt-3">
                --- No Subject Created ---
            </div>
        </div>

        <div v-else-if="display == 'package' ">
            <button class="form-btn-1 py-1 px-3" @click="createSubjectPackage">
                <i class="mdi mdi-plus"></i> New Subject Package
            </button>
            <h1 class="text-xl font-medium text-primarydark mt-6 pb-1">Created Subject Package</h1>

            <!-- SUBJECT PACKAGE DISPLAY -->
            <div v-if="subjectPackage.length > 0">
                <div v-for="(value, index) in subjectPackage" :key="index" class="bg-gray-200 my-4 p-3 rounded-md">
                    <h2 class="border-b-2 font-medium mb-2 text-pink-700">
                        <i class="mdi mdi-radiobox-marked mr-2"></i>{{ value.name }}
                        <i @click="editSubjectPackage(value)" class="mdi mdi-file-edit mr-2 text-white bg-pink-700 py-1 px-2 float-right rounded hover:cursor-pointer" style="font-size: 17px;"></i>
                    </h2>
                    <!-- <span>Subjects included </span>  -->
                    <span class="block mt-2 text-center text-xs"><i class="mdi mdi-star text-secondary"></i> = Composite Subject</span>

                    <div class="">
                        <span v-for="(inner_value, inner_index) in value.subjects" :key="inner_index" class="block mx-4 my-3 bg-white p-2 rounded-md">
                            <i class="mdi mdi-circle-slice-8 mr-2"></i> {{ inner_value.name }} 
                            <i class="ml-4 mdi mdi-star text-secondary" v-if="inner_value.sub_subjects.length > 0"></i>
                        </span>
                    </div>
                </div>
            </div>        
            <div v-else class="text-center text-xs mt-3">
                --- No Subject Package Created ---
            </div>

        </div> 

        <div v-else>
            --- An internal error occurred. Please refresh page to continue --- 
        </div>


        <br />

    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"
import EditSubjectPackageComponent from "@/components/subject_parts/EditSubjectPackageComponent.vue"
import CreateSubjectPackComponent from "@/components/subject_parts/CreateSubjectPackComponent.vue"
import { openModal, pushModal } from "jenesius-vue-modal"
import ModalComponent from "@/components/ModalComponent.vue"
import ConfirmComponent from "@/components/ConfirmComponent.vue"


export default {
    components: {
        PageTitleComponent
    },
    data(){
        return {
            subjects: [],
            subjectPackage: [], 
            display: "single"
        }
    },
    computed: {
        title(){
            return (this.display === "single")? 'Manage Subjects' : 'Manage Subjects Packages'
        }
    },
    mounted(){
        this.initializer()
    },
    methods: {
        initializer(){
        this.$store.dispatch('subject/fetchSubjects').then(res => {
            if(res){
                this.subjects = this.$store.getters['subject/details']
            } else {
                alert("Weak Internet Connection")
                this.$router.push({name: "adHome"})
            }
        })
        this.$store.dispatch('subjectPackage/fetchSubjectPackage').then(res => {
            if(res){
                this.subjectPackage = this.$store.getters['subjectPackage/details']
            } else {
                alert("Weak Internet Connection")
                this.$router.push({name: "adHome"})
            }
        })
        }, 
        async editSubjectPackage(value){
            let modal = await openModal(EditSubjectPackageComponent, {file_title: value.name, file_list: value.subjects}, {backgroundClose: false})

            modal.on('return', (val) => {
                if(val == false){
                    this.initializer()
                    modal.close()
                } 
            })


        },
        async createSubjectPackage() {
            let vv = await pushModal(ConfirmComponent, {file_body: "Do you want to create this subject group?"})
            let modal = await openModal(CreateSubjectPackComponent)

            modal.on("return", (value) => {
                if(value === "close") {
                    modal.close()
                } else {
                    let con = confirm("Do you want to create this Subject Package?")
                    if(con === true){
                        if(value.name == "" || value.subjects.length < 0) {
                            openModal(ModalComponent, {modal_type: "failed", modal_body: "New Subject Package name is compulsory"})
    
                        } else {
                            this.$store.dispatch('subjectPackage/create', value).then(res => {
                                if(res == true){
                                    openModal(ModalComponent, {modal_type: "success", modal_body: "Subject Package created successfully"})
                                } else {
                                    openModal(ModalComponent, {modal_type: "failed", modal_body: "Subject Package creation failed!"})
                                }
                            })
                        }
                    }
                    this.initializer()
                    modal.close()
                }
            })
        }
    }
}
</script>