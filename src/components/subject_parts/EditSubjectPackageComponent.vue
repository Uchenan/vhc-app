<template>
    <div class="bg-white p-5 rounded-xl flex items-center flex-col shadow-2xl w-4/5 md:w-3/5 lg:w-2/5 tweak">
        <h2 class="text-xl text-pink-700 mb-2 border-b-2 w-full font-bold"><i class="mdi mdi-file-document mr-2"></i> {{ file_title || "N/A" }}</h2>

        <label class="my-2 w-full">
            <span class="block font-medium text-slate-700 text-sm dark:text-white"><i class="mdi mdi-file pr-1"></i>Name</span>
            <input type="text" class="input-type-1" v-model="new_name" :placeholder="file_title" required />
        </label>

        <div class="w-full" v-if="items.length > 0">
            <span class="text-sm border-b w-full text-center">Subjects Included </span> 
            <div class="h-48 overflow-scroll scrollbar">
                <div class="my-3 p-2 rounded-lg bg-gray-200" v-for="(value, index) in items" :key="index" @click="$emit('return', value)">
                    <div>
                        <i class="mdi mdi-radiobox-marked mr-2"></i>
                        <span>{{ value.name }}</span> <i class="ml-2 mdi mdi-star text-secondary" v-if="value.sub_subjects.length > 0" ></i>
                        <i class="mdi text-danger mdi-close ml-6 float-right hover:cursor-pointer" @click="removeSubject(value)" style="font-size: 18px; "></i>
                    </div>
                </div> 
            </div>
        </div>
        
        <div class="w-full bg-gray-200 my-2 mb-4 text-center" v-else>
            --- No subjects included --- 
        </div>

        <div>
            <button class="btn-1 mr-4 bg-pink-700" @click="$emit('return', false)"><i class="mdi mdi-cancel mr-2"></i>Close</button>
            <button class="btn-1" @click="updateSubjectPack"><i class="mdi mdi-update mr-2"></i>Update</button> 
            <button class="btn-1" @click="addSubject"><i class="mdi mdi-plus mr-2"></i>Add subject</button> 
            <button class="btn-1 bg-danger ml-4" @click="deleteSubject"><i class="mdi mdi-trash-can mr-2"></i>Delete</button>
        </div>
    </div>
</template>

<script>
import { openModal, pushModal } from 'jenesius-vue-modal'
import { toRaw } from "vue"
import SelectComponent from '../SelectComponent.vue'
import ModalComponent from '../ModalComponent.vue'
import ConfirmComponent from '../ConfirmComponent.vue'

export default {
    // modal_type detects the type of icon that will be used 
    props: ['file_list', 'file_title'],
    data(){
        return {
            new_name: "",
            items: Array(...this.file_list)
        }
    },
    computed: {
        allSubjects() {
            let res = structuredClone(toRaw(this.$store.getters['subject/details']))
            return res 
        }
    },
    methods: {
        async deleteSubject(val){
            let vv = await pushModal(ConfirmComponent, {file_body: "Delete this Subject Package?"})
            vv.on('return', (val) => {
                if(val){
                    this.$store.dispatch('subjectPackage/remove', {
                        name: this.file_title
                    }).then(res => {
                        if(res === true){
                            openModal(ModalComponent, {modal_type: "success", modal_body: "Successfully deleted the subject package"})
                            this.$emit('return', false)
                        } else {
                            openModal(ModalComponent, {modal_type: "failed", modal_body: "Subject Package was not deleted"})
                            this.$emit('return', false)
                        }
                    })
                }
                vv.close()
            })
            
        }, 
        removeSubject(val) {
            this.items = this.items.filter(x => x !== val)
        },
        async addSubject(){
            let vv = await pushModal(SelectComponent, {file_title: "Subject", file_list: this.allSubjects})
            vv.on('return', (val) => {
                if(val){
                    const res = this.items.findIndex(x => x.name === val.name)
                    if(res === -1){
                        this.items.push(val)
                    }
                    vv.close()
                } 
            })
        },
        async updateSubjectPack(){
            let vv = await pushModal(ConfirmComponent, {file_body: "Are you sure you want to update this Subject Package?"})
            vv.on('return', (val) => {
                if(val){
                    // ensuring that the default name of the subject package is 
                    // used if a new one is not provided by the user
                    if(this.new_name == ""){
                        this.new_name = this.file_title
                    }
        
                    this.$store.dispatch('subjectPackage/update', {
                        name: this.file_title,
                        new_name: this.new_name, 
                        subjects: this.items 
                    }).then(val =>{
                        if(val === true){
                            openModal(ModalComponent, {modal_type: "success", modal_body: "Successfully updated the subject package"})
                            this.$emit('return', false)
                        } else {
                            openModal(ModalComponent, {modal_type: "failed", modal_body: "Subject Package was not updated"})
                            this.$emit('return', false)
                        }
                    })
                }

                vv.close()
            })

        }
    }

}
</script>

<style scoped>
.tweak {
    z-index: 100; 
}

</style>