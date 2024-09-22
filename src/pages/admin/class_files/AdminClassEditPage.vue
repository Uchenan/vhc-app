<template>
    <div>
       <PageTitleComponent backTo="adClass" :title="title" />
       <br />
        <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Name</span>
            <input type="text" class="input-type-1" v-model="level.name" />
        </label>

        <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Code for Processing (0/4) </span>
            <input type="text" class="input-type-1" maxlength="4" v-model.trim="level.code" disabled />
        </label>

        <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Class Teacher</span>
            <select class="input-type-1" v-model="level.class_teacher">
                <option v-for="(value, index) in allStaffs" :key="index" :value="value.ref_id">
                    {{ value.name }}
                </option>
            </select>
        </label>

        <label class="my-2" v-if="class_mode == 'single'">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Class Type</span>
            <input type="text" class="input-type-1" value="Single" disabled />
        </label>

        <label class="my-2" v-else>
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Class Type</span>
            <input type="text" class="input-type-1" value="Arms Oriented" disabled />
        </label>

        <!-- <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Class Structure</span>
            <select class="input-type-1" v-model="mode">
                <option value="single">Single </option>
                <option value="package">Arms Oriented</option>
            </select>
        </label> -->


        <!-- SINGLE DISPLAY  -->
        <div class="" v-if="class_mode === 'single'" >
            <div class="border-b border-gray-200 w-full my-2 shadow">
                <table class="divide-y divide-green-400 w-full">
                    <thead class="bg-gray-100">
                        <tr class="divide-x">
                        <th class="px-6 py-2 text-xs text-gray-500 text-left">
                            Subjects Offering 
                        </th>
                        <th class="px-6 py-2 text-xs text-gray-500">
                            
                        </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white  divide-y divide-gray-300" v-if="level.arms.length > 0">
                        <tr class="whitespace-nowrap divide-x">
                            <td class="px-6 py-4 text-sm text-gray-500 whitespace-normal">
                                <b>{{ level.arms[0].subjectPackage }}: </b>
                                {{included_subjects(level.arms[0].subjectPackage) }}
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500">
                                <button class="btn-1" @click="updateSingleSubjectPackage"><i class="mdi mdi-update mr-2"></i>Change Subject Package </button> 
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


        <!-- ARMS ORIENTED DISPLAY  -->
        <div class="p-2" v-else >
            <div class="mb-4">
                <span class="font-bold text-primary">Arms Added</span> |
                <button class="btn-1 text-xs" @click="addArm"><i class="mdi mdi-plus"></i> Add</button>
            </div>
            <div class="border-b border-gray-200  my-2 shadow w-full">
                <table class="table-auto divide-y w-full divide-green-400">
                    <thead class="bg-gray-100">
                        <tr class="divide-x" style="whitespace: break-spaces;">
                            <th class="w-1 px-6 py-2 text-xs text-gray-500">
                                S/N
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500">
                                Arm
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500">
                                Subjects Offering 
                            </th>
                            <th class="w-2/12 px-6 py-2 text-xs text-gray-500">
                                Actions 
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white  divide-y divide-gray-300" v-if="level.arms.length > 0">
                        <tr class="divide-x" 
                            v-for="(value, index) in level.arms" :key="index">
                            <td class="px-6 py-4 text-sm text-gray-500">
                                {{ index + 1}}
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500">
                                {{ value.department }} 
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500  whitespace-normal">
                                <b>{{ value.subjectPackage }} : </b>
                                {{included_subjects(value.subjectPackage) }}
                                <!-- {{value.subjectPackage }} -->
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500">
                                <i class="mdi mdi-update mr-2 text-primary" style="font-size: 25px;" @click="updateArmsSubjectPackage(value)"></i>
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

        <br />

        <!-- DISPLAYED FOR BOTH SINGLE AND ARMS ORIENTED CLASS TYPES -->
        <span class="block font-medium text-slate-700 text-sm dark:text-white">Class Subjects Permissions</span>
        <div class="border-b border-gray-200 w-full my-2 shadow">
            <table class="divide-y divide-green-400 w-full">
                <thead class="bg-gray-100">
                    <tr class="divide-x">
                    <th class="w-12 text-center py-2 text-xs text-gray-500">
                        S/N
                    </th>
                    <th class="px-6 py-2 text-xs text-gray-500">
                        Subject 
                    </th>
                    <th class="px-6 py-2 text-xs text-gray-500">
                        Teacher
                    </th>
                    <th class="px-6 py-2 text-xs text-gray-500">
                        Actions 
                    </th>
                    </tr>
                </thead>
                <tbody class="bg-white  divide-y divide-gray-300" v-if="level.subjects_permissions.length > 0">
                    <tr class="whitespace-nowrap divide-x" 
                        v-for="(value, index) in level.subjects_permissions" :key="index">
                        <td class="w-12 text-center py-4 text-sm text-gray-500">
                            {{ index + 1}}
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-500">
                            <!-- {{  value.code }}  -->
                            {{ decode_subject_code(value.code) }}
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-500">
                            {{ decode_teacher(value.teacher) || "NOT ASSIGNED" }}
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-500">
                            <i class="mdi mdi-account-school mr-2 hover:cursor-pointer" style="font-size: 25px;" @click="changeSubjectsPermissions(value.code)" ></i>
                        </td>
                    </tr>
                </tbody>
                <tbody class="bg-white  divide-y divide-gray-300" v-else>
                    <tr class="whitespace-nowrap divide-x">
                        <td class="px-6 py-4 text-sm text-gray-500 text-center" colspan="3">
                            --- No Permissions are available [Internal Error] -----
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <br />
        
        <!-- VIEW ALL STUDENTS IN THE CLASS  -->
        <span class="block font-medium text-slate-700 text-sm dark:text-white">Students in Class</span>
        <div class="border-b border-gray-200 w-full my-2 shadow">
            <table class="divide-y divide-green-400 w-full">
                <thead class="bg-gray-100">
                    <tr class="divide-x">
                        <th class="w-12 text-center py-2 text-xs text-gray-500">
                            S/N
                        </th>
                        <th class="px-6 py-2 text-xs text-gray-500">
                            Name 
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white  divide-y divide-gray-300" v-if="allStudentsInClass.length > 0">
                    <tr class="whitespace-nowrap divide-x" 
                        v-for="(value, index) in allStudentsInClass" :key="index">
                        <td class="w-12 text-center py-4 text-sm text-gray-500">
                            {{ index + 1 }}
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-500">
                            {{ `${value.bio.surname} ${value.bio.other_names}` }}
                        </td>
                    </tr>
                </tbody>
                <tbody class="bg-white  divide-y divide-gray-300" v-else>
                    <tr class="whitespace-nowrap divide-x" >
                        <td class="w-12 text-center py-4 text-sm text-gray-500" colspan="2">
                            --- No Student is recorded under this class ---
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- {{ allStudentsInClass }} -->




        <!-- SUBMIT BUTTON -->
        <button class="form-btn-1 px-6 mb-8 bg-danger mr-2" @click="deleteClass"><i class="mdi mdi-trash-can mr-2"></i>Delete Class</button>
        <button class="form-btn-1 px-6 mb-8" @click="update"><i class="mdi mdi-upload mr-2"></i>Update Information</button>
    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"

import { openModal } from "jenesius-vue-modal"
import ConfirmComponent from "@/components/ConfirmComponent.vue"
import ArmSelectionComponent from "@/components/class_parts/ArmSelectionComponent.vue"
import { toRaw } from 'vue'
import ModalComponent from '@/components/ModalComponent.vue'
import SelectComponent from '@/components/SelectComponent.vue'

export default {
    components: {PageTitleComponent},
    data() {
        return {
            level: structuredClone(toRaw(this.$store.getters['level/specific'](this.$route.params.code))),
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
        // this.decode_teacher("right here")

    },
    computed: {
        title(){
            return `Edit Class - ${this.level.code}`
        },
        class_mode(){
            let mode = this.level.arms.findIndex(x => x.department == "common")
            if(mode >= 0){
                return "single"
            } else {
                return "arms_oriented"
            }
        }, 
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
        },
        allStudentsInClass() {
            let res = this.$store.getters['student/details'].filter(x => x.academic.level === this.level.code)

            return res 

        },

    },
    methods: {
        async changeSubjectsPermissions(val){
            let modal = await openModal(SelectComponent, {file_title: "Teacher", file_list: this.allStaffs})
            modal.on('return', (value) => {
                if(value == false){
                    modal.close()
                } else {
                    this.level.subjects_permissions.forEach(x => {
                        if(x.code == val){
                            x.teacher = value.ref_id 
                        }
                    })
                    modal.close()
                }
            })
        },
        decode_teacher(ref_id){
            let name = ""
            this.allStaffs.forEach(x => {
                if(x.ref_id === ref_id){
                    name = x.name 
                }
            })

            return name 
        },
        decode_subject_code(code){
            let name
            if(code !== '' && code.length == 7){
                name = code.toString().substr(4)
                this.allSubjectPackages.forEach(subjectPackage => {
                    subjectPackage.subjects.forEach(subject => {
                        if(subject.code === name){
                            // console.log("match " + subject.code + " " + code)
                            // console.log(subject.code + " " + subject.name)
                            name = subject.name
                            return
                        }else if(subject.sub_subjects.length > 0){
                            // console.log("Do not match " + subject.code + " " + code)
                            subject.sub_subjects.forEach(innerSubject => {
                                if(innerSubject.code === name){
                                    name = innerSubject.name 
                                }
                            })
                        }
                    })
                })
            }

            return name 
        },
        async update(){
            let modal = await openModal(ConfirmComponent, {file_body: "Save Changes to the database?"})

            modal.on('return', (value) => {
                if(value == false) {
                    modal.close()
                } else {
                    this.$store.dispatch('level/update', this.level).then(res => {
                        if(res == true){
                            openModal(ModalComponent, {modal_type: "success", modal_body: "Class details updated Successfully"})
                        } else {
                            openModal(ModalComponent, {modal_type: "failed", modal_body: res})
                        }
                    })
                }
            })
        },
        async deleteClass() {
            let modal = await openModal(ConfirmComponent, {file_body: "You sure you want to delete this class from the database?"})

            modal.on('return', (value) => {
                if(value == false) {
                    modal.close()
                } else {
                    this.$store.dispatch('level/removeLevel', this.level.code).then(res => {
                        if(res == true){
                            openModal(ModalComponent, {modal_type: "success", modal_body: "Class details updated Successfully"})
                            this.$router.push({name: 'adClass'})
                        } else {
                            openModal(ModalComponent, {modal_type: "failed", modal_body: res})
                        }
                    })
                }
            })
        },
        async updateArmsSubjectPackage(val){
            let modal = await openModal(SelectComponent, {file_title: `${val.department} Subject Package`, file_list: this.allSubjectPackages})
            modal.on('return', (value) => {
                if (value == false){
                    modal.close()
                } else {
                    let check = confirm("Changing Subject Package may alter already included scores of the students in this class. Continue?")
                    if(check == false){
                        modal.close()
                        return 
                    } else {
                        val.subjectPackage = value.name
                        this.adjustSubjectsPermissions()
                    }
                    modal.close()
                }
            })
        },
        async updateSingleSubjectPackage(){
            let modal = await openModal(SelectComponent, {file_title: "Subjects", file_list: this.allSubjectPackages})
            modal.on('return', (value) => {
                if (value == false){
                    modal.close()
                } else {
                    let check = confirm("Changing Subject Package may alter already included scores of the students in this class. Continue?")
                    if(check == false){
                        modal.close()
                        return 
                    } else {
                        this.level.arms[0].subjectPackage = value.name
                        this.adjustSubjectsPermissions()
                    }
                    modal.close()
                }
            })
        },
        adjustSubjectsPermissions(){
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
        },
        included_subjects(val){
            if(val == ""){
                return ""
            }
            let selected = this.allSubjectPackages.filter(x => x.name === val)
            let res = ""

            if(selected.length <= 0){
                return res
            }

            
            // let new_selected = Object.assign({}, toRaw(selected[0]))
            selected[0].subjects.forEach(x => {
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
                    this.adjustSubjectsPermissions()
                    modal.close()
                }
            })
        },
        async removeSubjectPackage(val){
            let modal = await openModal(ConfirmComponent, {file_body: "Are you sure you want to remove this Arm from the class?"})
            modal.on('return', (value) => {
                if(value == false){
                    modal.close()
                } else {
                    const check = this.level.arms.findIndex(x => x === val)
                    if(check >= 0){
                        this.level.arms.splice(check, 1)
                        this.adjustSubjectsPermissions()
                    }
                }
                modal.close()
            })
        }
    }
}
</script>