<template>
    <div>
       <PageTitleComponent backTo="adClass" title="Create Class" />
       <br />

        <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Name</span>
            <input type="text" class="input-type-1" v-model="level.name" required  />
        </label>

        <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Code for Processing ( {{level.code.length }} /4) </span>
            <input type="text" class="input-type-1" maxlength="4" v-model.trim="level.code" required/>
        </label>

        <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Class Teacher</span>
            <select class="input-type-1" v-model="level.class_teacher">
                <option v-for="(value, index) in allStaffs" :key="index" :value="value.ref_id">
                    {{ value.name }}
                </option>
            </select>
        </label>

        <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Class Structure</span>
            <select class="input-type-1" v-model="mode">
                <option value="single">Single </option>
                <option value="package">Arms Oriented</option>
            </select>
        </label>


        <!-- SINGLE DISPLAY  -->
        <div class="" v-if="mode === 'single'" >
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Select Subject Package</span>
                <select class="input-type-1 mb-0" v-model="single_sub_pack">
                    <option v-for="(value, index) in allSubjectPackages" :key="index" :value="value.name" >
                        {{ value.name }}
                    </option>
                </select>
                <span><b>Included Subjects := </b> {{ included_subjects(single_sub_pack) || " " }} </span>
            </label>
        </div>


        <!-- ARMS ORIENTED DISPLAY  -->
        <div class="p-2" v-else >
            <div class="mb-4">
                <span class="font-bold text-primary">Arms Added</span> |
                <button class="btn-1 text-xs" @click="addArm"><i class="mdi mdi-plus"></i> Add</button>
            </div>
            <div class="border-b border-gray-200 w-full my-2 shadow">
                <table class="divide-y divide-green-400 w-full">
                    <thead class="bg-gray-100">
                        <tr class="divide-x">
                        <th class="px-6 py-2 text-xs text-gray-500">
                            S/N
                        </th>
                        <th class="px-6 py-2 text-xs text-gray-500">
                            Arm
                        </th>
                        <th class="px-6 py-2 text-xs text-gray-500">
                            Subjects Offering 
                        </th>
                        <th class="px-6 py-2 text-xs text-gray-500">
                            
                        </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white  divide-y divide-gray-300" v-if="level.arms.length > 0">
                        <tr class="whitespace-nowrap divide-x" 
                            v-for="(value, index) in level.arms" :key="index">
                            <td class="px-6 py-4 text-sm text-gray-500">
                                {{ index + 1}}
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500">
                                {{ value.department }} 
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500 whitespace-normal">
                                <b>{{ value.subjectPackage }} : </b>
                                {{included_subjects(value.subjectPackage) }}
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500">
                                <i @click="removeSubjectPackage(value)" class="mdi mdi-cancel text-danger hover:cursor-pointer" style="font-size: 25px;"></i> 
                            </td>
                        </tr>
                    </tbody>
                    <tbody class="bg-white  divide-y divide-gray-300" v-else>
                        <tr class="whitespace-nowrap divide-x">
                            <td class="px-6 py-4 text-sm text-gray-500 text-center" colspan="3">
                                ---- No arm have been created  ----
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>

        <!-- SUBMIT BUTTON -->
        <button class="form-btn-1 px-6 mb-8" @click="submit">Submit</button>
    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"

import { openModal, pushModal } from "jenesius-vue-modal"
import ConfirmComponent from "@/components/ConfirmComponent.vue"
import ArmSelectionComponent from "@/components/class_parts/ArmSelectionComponent.vue"
import { toRaw } from 'vue'
import ModalComponent from '@/components/ModalComponent.vue'

export default {
    components: {PageTitleComponent},
    data() {
        return {
            level: {
                name: "",
                code: "", 
                class_teacher: "", 
                arms: [
                    // {department: "Science", subjectPackage: "JSS Package"}
                ], //{name: "", subjects: []}
                subjects_permissions: []
            },
            mode: "single",
            single_sub_pack: ""

        }
    },
    watch: {
        "level.code": function(val){
            this.level.code = val.toString().toLowerCase()
        },
        "single_sub_pack": function(val){
            if(val == ""){
                return 
            }
            let res = {subjectPackage: val}
            this.level.arms = []
            this.level.arms.push(res)
        },
        "mode": function(val){
            this.single_sub_pack = ""
            this.level.arms = []
        }
    },
    mounted(){
        this.$store.dispatch('staff/fetchStaffs')
        this.$store.dispatch('subjectPackage/fetchSubjectPackage')
        this.$store.commit("deactivateLoadingState")
    },
    computed: {
        allStaffs() {
            let res = []
            this.$store.getters['staff/details'].forEach(x => {
                res.push({
                    name: `${x.bio.title} ${x.bio.surname} ${x.bio.other_names}`,
                    ref_id: x.account.ref_id 
                })
            })
            return res
        },
        allSubjectPackages(){
            let res = []
            this.$store.getters['subjectPackage/details'].forEach(x => {
                res.push(x)
            })
            return res
        }
    },
    methods: {
        async submit(){
            if(this.level.name == "" || this.level.code == "" ){
                openModal(ModalComponent, {modal_type: "failed", modal_body: "Name and Code of class are important"})
                return
            }

            if(this.level.code.length !== 4){
                openModal(ModalComponent, {modal_type: "failed", modal_body: "Class code must have exactly four characters which may be made up of only alphabets and numbers"})
                return 
            }

            let modal = await openModal(ConfirmComponent, {file_body: "Do you want to create this class?"})

            modal.on('return', (value) => {
                if(value == false) {
                    modal.close()
                } else {
                    this.level.subjects_permissions = []

                    this.level.arms.forEach(x => {
                        let res = this.allSubjectPackages.filter(y => y.name === x.subjectPackage)
                        res.forEach(elem => {
                            elem.subjects.forEach(innerElem => {
                                if(innerElem.sub_subjects.length === 0){
                                    const check = this.level.subjects_permissions.filter(ee => ee.code.toString().substr(4) === innerElem.code)
                                    if(check.length == 0){
                                        this.level.subjects_permissions.push({
                                            code: this.level.code + innerElem.code,
                                            teacher: ""
                                        })
                                    }
                                } else if(innerElem.sub_subjects.length > 0){
                                    innerElem.sub_subjects.forEach(innerInnerElem => {
                                        const check = this.level.subjects_permissions.filter(ee => ee.code.toString().substr(4) === innerInnerElem.code)
                                        if(check.length == 0){
                                            this.level.subjects_permissions.push({
                                                code: this.level.code + innerInnerElem.code,
                                                teacher: ""
                                            })
                                        }
                                    })
                                }
                            })
                        })
                    })
                    

                    this.$store.dispatch('level/create', this.level).then(res => {
                        if(res == true){
                            openModal(ModalComponent, {modal_type: "success", modal_body: "Class Created Successfully"})
                            this.$router.push({name: 'adClass'})
                        } else {
                            openModal(ModalComponent, {modal_type: "failed", modal_body: res})
                        }
                    })
                }
            })
        },
        included_subjects(val){
            if(val == ""){
                return ""
            }
            let selected = this.allSubjectPackages.filter(x => x.name === val)
            let new_selected = Object.assign({}, toRaw(selected[0]))
            let res = ""
            new_selected.subjects.forEach(x => {
                res += ` ${x.name}, `
            })
            return res
        },
        async addArm(){
            let modal = await openModal(ArmSelectionComponent, {allSubjectPackages: this.allSubjectPackages})
            modal.on('return', (value) => {
                if (value == false){
                    modal.close()
                } else {
                    if(value.department == "" || value.subjectPackage == ""){
                        openModal(ModalComponent, {modal_type: "failed", modal_body: "Invalid Arm"})
                    } else {
                        const check = this.level.arms.findIndex(x => x.department === value.department)
                        if(check < 0){
                            this.level.arms.push(value)
                        } else {
                            openModal(ModalComponent, {modal_type: "failed", modal_body: "Am arm with the same name already exists"})
                        }
                    }
                    modal.close()
                }
            })
        },
        removeSubjectPackage(val){
            const check = this.level.arms.findIndex(x => x === val)
            if(check >= 0){
                this.level.arms.splice(check, 1)
            }
        }
    }
}
</script>