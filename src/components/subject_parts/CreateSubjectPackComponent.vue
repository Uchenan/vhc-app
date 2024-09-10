<template>
    <div class="bg-white p-5 rounded-xl flex items-center flex-col shadow-2xl w-4/5 md:w-3/5 lg:w-2/5 tweak">
        <h2 class="text-xl mb-2 border-b-2 w-full font-bold"><i class="mdi mdi-folder-plus-outline mr-2"></i>Create Subject Package</h2>
        
        <div class="w-full">
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white"><i class="mdi mdi-form-textbox pr-1"></i>Name</span>
                <input type="text" class="input-type-1" v-model="subjectPackage.name" required />
            </label>

            
            <div class="my-2 bg-gray-200 p-2 rounded" v-if="subjectPackage.subjects.length > 0">
                <span class="text-sm border-b mb-2">Selected Subjects</span>
                <div>
                    <span v-for="(value, index) in subjectPackage.subjects" :key="index" class="bg-white px-3 py-0 rounded m-2 inline-block w-max">
                        {{ value.name }} <i @click="removeSubject(value)" class="mdi mdi-close text-danger ml-2"></i>
                    </span>
                </div>

            </div>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-xs dark:text-white"><i class="mdi mdi-list-status pr-1"></i>Select subjects from options</span>
                <select class="input-type-1 scrollbar" v-model="subjectPackage.subjects" multiple>
                    <option v-for="(value, index) in allSubjects" :key="index" :value="value">
                        {{ value.name }}
                    </option> 
                </select>
            </label>


            <div>
                <button class="btn-1 nr-2" @click="$emit('return', subjectPackage)"><i class="mdi mdi-update mr-1"></i>Submit</button> 
                <button class="btn-1 bg-danger" @click="$emit('return', 'close')"><i class="mdi mdi-trash-can mr-1"></i>Close</button>
            </div>
        </div>
    </div>
</template>

<script>
import { openModal } from "jenesius-vue-modal"
import SelectComponent from "@/components/SelectComponent.vue"
import { toRaw } from 'vue'


export default {
    // modal_type detects the type of icon that will be used 
    props: ['file_list', 'file_title'],
    data(){
        return {
            subjectPackage: {
                name: "", 
                subjects: []
            }
        }
    },
    computed: {
        allSubjects() {
            // let subjectNames = []
            
            let res = structuredClone(toRaw(this.$store.getters['subject/details']))
            // filtering the list of subjects that will be populated when add sub subjects is clicked 
            // res.forEach(x => {
            //     if(x.sub_subjects.length === 0){
            //         subjectNames.push(x)
            //     }
            // })

            return res 
        }
    }, 
    methods: {
        async addSubject() {
            let modal = await openModal(SelectComponent, {file_title: 'Subject', file_list: []})
            modal.on('return', (value) => {
                if(value === "nice"){

                } else {
                    return 
                }
            })
        },
        removeSubject(val){
            this.subjectPackage.subjects.splice(this.subjectPackage.subjects.indexOf(val), 1)
        }

    }

}
</script>

<style scoped>
.tweak {
    z-index: 100; 
}
</style>