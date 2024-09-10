<template>
    <div>
        <PageTitleComponent backTo="adSubject" title="Create New Subject" />

        <br />        
        <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Name</span>
            <input type="text" class="input-type-1" v-model="subject.name" />
        </label>

        <label class="my-2">
            <!-- <span class="block font-medium text-slate-700 text-sm dark:text-white">Code for Processing ({{ subject.code.length + "/3"}}) </span> -->
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Code for Processing </span>
            <input type="text" class="input-type-1 uppercase" v-model="subject.code" maxlength="3" />
        </label>

        <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Composite Subject?</span>
            <select class="input-type-1" v-model="composite">
                <option value="y">Yes</option>
                <option value="n">No</option>
            </select>
        </label>

        <div v-if="composite === 'y'" class="bg-gray-200 p-2">
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Select Subjects</span>
                <select class="input-type-1" v-model="select_subject">
                    <option value="mm" selected>-</option>
                    <option v-for="(value, index) in allSubjects" :key="index" :value="value">
                        {{ value.name }}
                    </option>
                </select>
            </label>

            <br />

            <span>Included Subjects:</span>
            <div>
                <span class="bg-white px-4 py-1 m-2 inline-block rounded-md" v-for="(value, index) in subject.sub_subjects" :key="index">
                    {{ value.name }} <i class="ml-2 mdi mdi-close text-danger" @click="removeSelectedSubject(index)"></i>
                </span>
            </div>
        </div>

        <button class="form-btn-1 w-full md:w-max my-3 px-6" @click="submitSubject">Submit</button>
        
    </div>
</template>


<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"

import { openModal } from "jenesius-vue-modal"
import ModalComponent from "@/components/ModalComponent.vue"
import ConfirmComponent from "@/components/ConfirmComponent.vue"
import SelectComponent from "@/components/SelectComponent.vue"


export default {
    components: {PageTitleComponent},
    data(){
        return {
            subject: {
                name: "",
                code: "", 
                sub_subjects: []
            },
            allSubjects: [], 
            composite: 'n',
            select_subject: "mm",

        }
    },
    watch: {
        "subject.code": function(val){
            this.subject.code = this.subject.code.toString().toUpperCase()
        },
        "select_subject": function(val){
            this.allSubjects.forEach(x => {
                if(x.name == val.name){
                    // adds this to the sub subjects list if it does not exist initially in the database 
                    if(this.subject.sub_subjects.indexOf(x) === -1){
                        this.subject.sub_subjects.push(x)
                    }
                    this.select_subject = "mm"
                }
            });
        },
        "composite": function(val){
            if(val == 'n'){
                this.subject.sub_subjects = []
            }
        }
    },
    mounted() {
        this.allSubjects = this.initializeAllSubjects()
        this.$store.commit('deactivateLoadingState')
    },
    methods: {
        initializeAllSubjects(){
            let result = []
            this.$store.getters['subject/details'].forEach(x => {
                if(x.sub_subjects.length === 0){
                    result.push(x)
                }
            })

            return result
        },
        removeSelectedSubject(val){
            this.subject.sub_subjects.splice(val, 1)
        },
        async submitSubject(){
            if(this.subject.name == ""){
                openModal(ModalComponent, {modal_type: "failed", modal_body: "Please input subject name"})
                return 
            }
            if(this.subject.code == ""){
                openModal(ModalComponent, {modal_type: "failed", modal_body: "Please input subject code"})
                return 
            }

            let modal = await openModal(ConfirmComponent, {file_body: "Are you sure you want to create this subject?"})
            modal.on('return', (val) => {
                if(val == false){
                    modal.close()
                    return
                } else {
                    this.$store.dispatch('subject/createSubject', this.subject).then(res => {
                        if(res == true){
                            openModal(ModalComponent, {modal_type: "success", modal_body: "Subject was created successfully"})
                            this.$router.push({name: "adSubject"})
                        } else {
                            openModal(ModalComponent, {modal_type: "failed", modal_body: "An internal error occurred. Subject was not created!"})
                        }
                    })
                    modal.close()
                }
            })
        }
    }
}
</script>