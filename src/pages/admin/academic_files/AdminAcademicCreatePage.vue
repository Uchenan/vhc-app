<template>
    <div>
        <PageTitleComponent backTo="adAcademic" title="Create Academic Session" />
        <br /> 

        <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Name <span class="text-xs text-danger">(Edit other fields. This field will be generated automatically)</span> </span>
            <input type="text" class="input-type-1" disabled v-model="academic.name" />
            
        </label>
    
        <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">From What Year?</span>
            <select class="input-type-1" v-model="academic.from_year" @change="formatAcademicName('from_year')">
                <option v-for="value in years" :key="value">
                    {{ value }}
                </option>
            </select>
        </label>

        <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">To What Year?</span>
            <select class="input-type-1" v-model="academic.to_year" @change="formatAcademicName('to_year')">
                <option v-for="value in years" :key="value">
                    {{ value }}
                </option>
            </select>
        </label>

        <button class="btn-1 text-xs mb-2" @click="add_mark_allocation"><i class="mdi mdi-plus mr-1"></i> Add Mark Allocation</button>
        <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Mark Allocation Setting </span>
            <div class="border-b border-gray-200 w-full my-2 shadow">
                <table class="divide-y divide-green-400 w-full">
                    <thead  class="bg-gray-100">
                        <tr class="divide-x divide-y">
                            <th>S/N</th>
                            <th>Selected Classes</th>
                            <th>Mark Structure</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y" v-if="academic.mark_allocation_type.length > 0">
                        <tr class="divide-x" v-for="(value, index) in academic.mark_allocation_type" :key="index">
                            <td class="text-center">{{ index + 1 }}</td>
                            <td class="p-2">
                                <span class="block" v-for="val in value.levels_included">
                                    {{ decode_level_code(val) }}
                                </span>
                            </td>
                            <td>
                                <span class="block" v-for="val in value.score_type">
                                    <i class="mdi mdi-radiobox-marked text-primary mr-2 my-2"></i>{{ val.name_of_assessment + "  => [" + val.mark_obtainable + "]" }}
                                </span>
                            </td>
                            <td class="text-center text-md text-danger">
                                <i class="mdi mdi-close" @click="remove_mark_allocation(index)"></i>
                            </td>
                        </tr>
                    </tbody>
                    <tbody class="divide-y" v-else>
                        <tr class="divide-x">
                            <td colspan="3" class="text-center p-2"> --- No Mark Allocation created --- </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </label>

        <br /> <br />

        <button class="btn-1 text-xs mb-2" @click="add_grade"><i class="mdi mdi-plus mr-1"></i> Add Grading System</button>
        <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Grade Setting</span>
            <div class="border-b border-gray-200 w-full my-2 shadow">
                <table class="divide-y divide-green-400 w-full">
                    <thead  class="bg-gray-100">
                        <tr class="divide-x divide-y">
                            <th>S/N</th>
                            <th>Selected Classes</th>
                            <th>Grading System</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y" v-if="academic.grade_type.length > 0">
                        <tr class="divide-x" v-for="(value, index) in academic.grade_type" :key="index">
                            <td class="p-1">{{ index + 1 }}</td>
                            <td class="p-1">
                                <span v-for="val in value.levels_included" :key="val">
                                    {{ decode_level_code(val) }}
                                </span>
                            </td>
                            <td class="p-1">
                                <span class="block font-medium border-b">{{ value.grade_name }}</span>
                                <span class="block my-1" v-for="val in value.grade_type" :key="val">
                                    <i class="mdi mdi-radiobox-marked ml-2"></i>
                                    {{ `${val.grade} => ${val.remark} [${val.from} - ${val.to}]` }}
                                </span>
                            </td>
                            <td class="p-1 text-center font-medium">
                                <i class="mdi mdi-close text-danger cursor-pointer" @click="remove_grade(index)"></i>
                            </td>
                           
                        </tr>
                    </tbody>
                    <tbody class="divide-y" v-else>
                        <tr class="divide-x">
                            <td colspan="3" class="text-center p-2"> --- No grade type created --- </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </label>
        
        <br /><br />
        <button class="btn-1 py-2 bg-secondarydark px-4 block w-full md:w-max mb-4" @click="create_session"> <i class="mdi mdi-check-circle-outline"></i> Create Session</button>
    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"
import { openModal } from "jenesius-vue-modal"
import ModalComponent from "@/components/ModalComponent.vue"
import AddMarkAllocation from "@/components/academic_parts/AddMarkAllocation.vue";
import AddGrade from "@/components/academic_parts/AddGrade.vue";
import level_decoder from "@/helpers/level_decoder";

export default {
    components: {PageTitleComponent},
    data(){
        return {
            academic: {
                name: "", 
                from_year: "", 
                to_year: "", 
                active: false, 
                mark_allocation_type: [], 
                grade_type: [],
                terms: []
            },
            years: []
        }
    },
    mounted(){
        this.years = this.calculate_years()
        this.$store.dispatch('level/fetchLevels')
        this.$store.commit('deactivateLoadingState')
    }, 
    watch: {
        
    },
    computed: {
        allLevels(){
            return this.$store.getters['level/details']
        }
    },
    methods: {
        create_session(){
            alert(JSON.stringify(this.academic))
            this.$store.dispatch("session/create", this.academic).then(data => {
                if(data === true){
                    openModal(ModalComponent, {modal_type: "success", modal_body: "Session Created Successfully!"})
                    this.$router.push({name: 'adAcademic'})
                } else {
                    openModal(ModalComponent, {modal_type: "failed", modal_body: "An internal error occurred"})
                }
            })
        },
        remove_grade(val){
            let res = confirm("Are you sure you want to remove this grade system?")
            if(res === true){
                this.academic.grade_type.splice(val, 1)
            }
        },
        async add_grade(){
            let levels = []
            
            this.allLevels.forEach(el => {
                let res = 0
                this.academic.grade_type.forEach(grade => {
                    if(grade.levels_included.includes(el.code)){
                        res = 1
                    }
                })

                if(res == 0){
                    levels.push(el)
                }
            })
            // alert(JSON.stringify(levels))

            if(levels.length === 0){
                openModal(ModalComponent, {modal_type: "warning", modal_body: "All Classes have been given grading system"})
                return false 
            }

            let modal = await openModal(AddGrade, {allLevels: levels}, {backgroundClose: false})
            modal.on('return', (val) => {
                if(val === false){
                    modal.close()
                } else {
                    if(val.levels_included.length > 0 && val.grade_type.length > 0){
                        this.academic.grade_type.push(val)
                    } else {
                        openModal(ModalComponent, {modal_type: "failed", modal_body: "Invalid grade system detected!"})
                    }
                    modal.close()
                }
            })
        },
        remove_mark_allocation(val){
            let res = confirm("Are you sure you want to remove this allocation?")
            if(res === true){
                this.academic.mark_allocation_type.splice(val, 1)
            }
        },
        async add_mark_allocation(){
            let levels = []

            this.allLevels.forEach(el => {
                let res = 0
                this.academic.mark_allocation_type.forEach(mark_alloc => {
                    if(mark_alloc.levels_included.includes(el.code)){
                        res = 1
                    }
                })

                if(res == 0){
                    levels.push(el)
                }
            })

            if(levels.length === 0){
                openModal(ModalComponent, {modal_type: "warning", modal_body: "All Classes have been received Mark Allocation settings"})
                return false 
            }

            let modal = await openModal(AddMarkAllocation, {}, {backgroundClose: false})
            modal.on('return', (val) => {
                if(val === false){
                    modal.close()
                } else {
                    if(val.levels_included.length < 1 || val.score_type.length < 1){
                        openModal(ModalComponent, {modal_type: "failed", modal_body: "Invalid Mark Allocation detected!"})
                        modal.close()
                    } else {
                        this.academic.mark_allocation_type.push(val)
                        modal.close()
                    }
                }
            })
            
        },
        decode_level_code(val){
            return level_decoder(val)
            // let res = this.allLevels.filter(x => x.code === val)
            // return res[0].name
        }, 
        calculate_years() {
            let yrs = []
            let d = new Date().getFullYear()
            d -= 3 
            for(let i = 0; i < 12; i++){
                d += 1 
                yrs.push(d)    
            }
            return yrs 
        }, 
        formatAcademicName(val){
            if(this.academic.from_year !== '' && this.academic.to_year !== ''){
                if(this.academic.from_year > this.academic.to_year){
                    if(val === "from_year"){
                        openModal(ModalComponent, {modal_type: "failed", modal_body: "Invalid combination of years!"})
                        this.academic.from_year = ""
                        this.academic.name = ""
                    } else {
                        openModal(ModalComponent, {modal_type: "failed", modal_body: "Invalid combination of years!"})
                        this.academic.to_year = ""
                        this.academic.name = ""
                    }
                } else {
                    if(this.academic.from_year == this.academic.to_year){
                        this.academic.name = `${this.academic.from_year} Academic Session`
                    } else {
                        this.academic.name = `${this.academic.from_year}/${this.academic.to_year} Academic Session`
                    }
                }
            }
        }
    }
}
</script>