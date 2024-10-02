<template>
    <div>
        <PageTitleComponent backTo="adAcademic" title="Create Academic Session" />
        <br /> 

        <form>
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Name</span>
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
            
            <div class="border-b border-gray-200 w-full my-2 shadow">
                <table class="divide-y divide-green-400 w-full">
                    <thead class="bg-gray-100">
                        <tr class="divide-x">
                        <th class="px-6 py-2 text-sm text-gray-500 text-left">
                            Terms
                            <button @click="addTerm"><i class="bg-green-500 font-bold text-white ml-2 px-3 rounded mdi mdi-plus"></i></button>
                        </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white  divide-y divide-gray-300">
                        <tr class="whitespace-nowrap divide-x">
                            <td class="px-6 py-4 text-sm text-gray-500 whitespace-normal">
                                <h2 class="text-lg text-center">First Term</h2>
                                <div class="border-y py-2 my-1">
                                    <span class="text-primary font-bold">Juniour Secondary School 1</span>
                                    <p><i class="mdi mdi-circle-small"></i>Subject Marks Allocation => Tst1 [20], Tst2 [20], Exam[60] </p>
                                    <p><i class="mdi mdi-circle-small"></i>Grading System => 0-30 [F9], 31-49[E8] </p>
                                </div>
                                <div class="border-y py-2 my-1">
                                    <span class="text-primary font-bold">Juniour Secondary School 1</span>
                                    <p><i class="mdi mdi-circle-small"></i>Subject Marks Allocation => Tst1 [20], Tst2 [20], Exam[60] </p>
                                    <p><i class="mdi mdi-circle-small"></i>Grading System => 0-30 [F9], 31-49[E8] </p>
                                </div>
                            </td>
                        </tr>

                        <tr class="bg-gray-100 whitespace-nowrap divide-x">
                            <td class="px-6 py-4 text-sm text-gray-500 whitespace-normal">
                                <h2 class="text-lg text-center">Second Term</h2>
                                <div class="border-y py-2 my-1">
                                    <span class="text-primary font-bold">Juniour Secondary School 1</span>
                                    <p><i class="mdi mdi-circle-small"></i>Subject Marks Allocation => Tst1 [20], Tst2 [20], Exam[60] </p>
                                    <p><i class="mdi mdi-circle-small"></i>Grading System => 0-30 [F9], 31-49[E8] </p>
                                </div>
                                <div class="border-y py-2 my-1">
                                    <span class="text-primary font-bold">Juniour Secondary School 1</span>
                                    <p><i class="mdi mdi-circle-small"></i>Subject Marks Allocation => Tst1 [20], Tst2 [20], Exam[60] </p>
                                    <p><i class="mdi mdi-circle-small"></i>Grading System => 0-30 [F9], 31-49[E8] </p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>




        </form>

    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"
import { openModal } from "jenesius-vue-modal"
import ModalComponent from "@/components/ModalComponent.vue"
import AddTermComponent from "@/components/academic_parts/AddTermComponent.vue";

export default {
    components: {PageTitleComponent},
    data(){
        return {
            academic: {
                name: "", 
                from_year: "", 
                to_year: "", 
                active: false, 
                terms: []
            },
            years: []
        }
    },
    mounted(){
        this.years = this.calculate_years()
        this.$store.commit('deactivateLoadingState')
    }, 
    watch: {
        
    },
    methods: {
        async addTerm(e){
            e.preventDefault()

            let modal = await openModal(AddTermComponent, {}, {backgroundClose: false})
            modal.on('return', (val) => {
                if(val == false){
                    modal.close()
                } 
            })
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