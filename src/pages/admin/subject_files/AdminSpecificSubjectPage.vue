<template>
    <div>
       <PageTitleComponent backTo="adSubject" :title="title" />
       <br /> 
       <p class="text-center text-danger font-bold" v-show="!hideAddSubjectButton">This Subject cannot hold other subjects because this subject is already
       a part of another composite subject </p>
       <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Name</span>
            <input type="text" class="input-type-1" v-model="subject.name" disabled />
        </label>

        <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Code for Processing</span>
            <input type="text" class="input-type-1" v-model="subject.code" disabled />
        </label>

        <label class="my-2">
            <div class="flex items-center my-1">
                <span class="mr-4 block font-medium text-slate-700 text-sm dark:text-white">Included Subjects </span>
            </div>
            <div class="bg-gray-300 p-2" v-if="subject.sub_subjects.length > 0">
                <span class="bg-white px-4 py-1 m-2 inline-block rounded-md" v-for="(value, index) in subject.sub_subjects" :key="index">
                    <span>{{ value.name }}</span>
                    <i class="mdi mdi-close ml-2" @click="removeSubSubject(value)"></i>
                </span>
            </div>
            <div class="bg-gray-300 p-2 text-center" v-else>
                --- No Internal Subjects ---
            </div>
        </label>

        <span class="text-center text-xs font-medium block">Only the included subjects is changeable</span>

        <button v-show="hideAddSubjectButton" class="form-btn-1 w-full md:w-max my-3 px-6 bg-primary mx-2" @click="addSubSubject"> <i class="mdi mdi-plus"></i> Include Subject </button>
        <button class="form-btn-1 w-full md:w-max my-3 px-6 bg-primary mx-2" @click="updateSubject"> <i class="mdi mdi-update"></i> Update Subject </button>
        <button class="form-btn-1 w-full md:w-max my-3 px-6 bg-danger mx-2" @click="delSubject"> <i class="mdi mdi-delete"></i> Delete Subject </button>
    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"

import { isProxy, toRaw } from "vue"
import { openModal } from "jenesius-vue-modal"
import ModalComponent from "@/components/ModalComponent.vue"
import ConfirmComponent from "@/components/ConfirmComponent.vue"
import SelectComponent from "@/components/SelectComponent.vue"


export default {
    components: {PageTitleComponent},
    data(){
        return {
            hideAddSubjectButton: true, 
            subject: structuredClone(toRaw(this.$store.getters['subject/specific'](this.$route.params.code)))
            // subject: JSON.parse(JSON.stringify(this.$store.getters['subject/specific'](this.$route.params.code)))
            
        }
    },
    mounted(){
        this.$store.commit("deactivateLoadingState")
        openModal(ModalComponent, {modal_type: "warning", modal_body: "The Name and Code of a subject cannot be changed. Only included subjects are changeable"})

        // confirming that the selected subject is not part of a composite
            this.allSubjects.forEach(x => {
                x.sub_subjects.forEach(y => {
                    if(y.code == this.subject.code){
                        this.hideAddSubjectButton = false 
                    }
                })
            })
        // this.subject = this.$store.getters['subject/specific'](this.$route.params.code)
    },     
    computed: {
        title(){
            return `Manage Subject - ${this.subject.code}`
        },
        store_subject() {
            return this.$store.getters['subject/specific'](this.$route.params.code)
        },
        allSubjects() {
            let result = this.$store.getters['subject/details']
            if(isProxy(result)){
                return toRaw(result)
            } else {
                return result 
            }
        }
    },
    methods: {
        async delSubject(){
            let modal = await openModal(ConfirmComponent, {file_body: "Are you sure you want to delete this subject?"})
            modal.on('return', (value) => {
                if(value == false){
                    modal.close()
                    return 
                } else {
                    this.$store.dispatch('subject/removeSubject', this.subject.code).then(res => {
                        if(res == true){
                            openModal(ModalComponent, {modal_type: "success", modal_body: "Successfully deleted this subject"})
                            this.$router.push({name: 'adSubject'})
                        } else {
                            openModal(ModalComponent, {modal_type: "failed", modal_body: "An error occurred. Subject was not deleted"})
                        }
                    })
                }
            })
        },
        async updateSubject() {
            let modal = await openModal(ConfirmComponent, {file_body: "Are you sure you want to update this subject?"})
            modal.on('return', (value) => {
                if(value == false){
                    modal.close()
                    return 
                } else {
                    this.$store.dispatch('subject/update', this.subject).then(res => {
                        if(res == true){
                            openModal(ModalComponent, {modal_type: "success", modal_body: "Successfully updated this subject"})
                        } else {
                            openModal(ModalComponent, {modal_type: "failed", modal_body: "An error occurred. Subject was not updated"})
                        }
                    })
                }
            })
            
        },
        removeSubSubject(val) {
            this.subject.sub_subjects.forEach(x => {
                if(x == val){
                    this.subject.sub_subjects.splice(this.subject.sub_subjects.indexOf(x), 1)
                }
            })
        },
        async addSubSubject() {
            let subjectNames = []
            // filtering the list of subjects that will be populated when add sub subjects is clicked 
            this.allSubjects.forEach(x => {
                if(x.name !== this.subject.name){
                    if(x.sub_subjects.length === 0){
                        subjectNames.push(toRaw(x))
                    }
                }
            })
            
            
            let modal = await openModal(SelectComponent, {file_list: subjectNames, file_title: 'Subject'})
            modal.on('return', (value) => {
                // adding the selected subject to the list of included subjects
                this.allSubjects.forEach(x => {
                    if(x.name == value.name){
                        
                        const e = this.subject.sub_subjects.find(el => el.name === value.name)

                        if(e === undefined){
                            this.subject.sub_subjects.push(value)
                        }
                        
                    }
                })

                // let sub_subjects = [...new Set(this.subject.sub_subjects)]
                // this.subject.sub_subjects = sub_subjects

                modal.close()
            })
        }
    }
}
</script>