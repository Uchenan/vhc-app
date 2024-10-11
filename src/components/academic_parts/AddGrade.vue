<template>
    <div class="bg-white p-5 rounded-xl shadow-2xl w-4/5 h-4/5 md:w-3/5 lg:w-2/5 tweak scrollbar overflow-y-scroll">
        <h2 class="text-xl mb-2 border-b-2 w-full font-bold">Create Grading System</h2>

        <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Select System</span>
            <select class="input-type-1" v-model="grade.grade_name">
                <option>Simple Letter Grading</option>
                <option>BECE Standard</option>
                <option>WAEC Standard</option>
                <option>American Simple Standard </option>
                <option>American Extended Standard </option>
            </select>
        </label>

        <div class="w-full">
            <div class="border-b border-gray-200 w-full my-2 shadow">
                <table class="divide-y divide-green-400 w-full overflox-x-scroll scrollbar">
                    <thead  class="bg-gray-100">
                        <tr class="divide-x text-xs">
                            <th>FROM</th>
                            <th>TO</th>
                            <th>GRADE</th>
                            <th>REMARK</th>
                            <th v-if="grade.grade_name == 'Simple Letter Grading'"></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y">
                        <tr class="divide-x" v-for="(value, index) in grade.grade_type" :key="index">
                            <td><input type="number" v-model="value.from" class="w-full outline-none text-center p-1" placeholder="e.g. 0 " disabled /></td>
                            <td><input type="number" @change="test(index)" v-model="value.to" class="w-full outline-none text-center p-1" placeholder="e.g. 40" :disabled="check_disability" /></td>
                            <td><input type="text" v-model="value.grade" class="w-full outline-none text-center p-1" placeholder="e.g. C" :disabled="check_disability" /></td>
                            <td><input type="text" v-model="value.remark" class="w-full outline-none text-center p-1" placeholder="e.g. Credit" :disabled="check_disability" /></td>
                            <td class="w-100 p-1" v-if="grade.grade_name == 'Simple Letter Grading'">
                                <i class="mdi mdi-close text-danger cursor-pointer" @click="remove_grade(index)"></i>
                            </td>
                        </tr>
                        <tr class="divide-x bg-gray-100" v-if="grade.grade_name == 'Simple Letter Grading'">
                            <td colspan="4" class="text-center">
                                <button class="btn-1 text-xs my-1" @click="add_grade">
                                    <i class="mdi mdi-plus"></i> New Entry
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Select Classes</span>
                <select class="input-type-1" v-model="grade.levels_included" multiple>
                    <option v-for="value in allLevels" :key="value.code" :value="value.code">
                        {{ value.name }}
                    </option>
                </select>
            </label>
        </div>

        <div class="w-full flex justify-end">
            <button class="btn-1 bg-danger" @click="$emit('return', false)"><i class="mdi mdi-cancel"></i> Close</button>
            <button class="btn-1 bg-primary" @click="$emit('return', grade)"><i class="mdi mdi-check"></i> Submit</button>
        </div>
    </div>
</template>

<script>
import { openModal, pushModal } from "jenesius-vue-modal"
// import ModalComponent from "@/components/ModalComponent.vue"
import ConfirmComponent from "@/components/ConfirmComponent.vue";

export default {
    props: ['allLevels'], 
    data(){
        return {
            check_disability: false,
            grade: {
                levels_included: [], 
                grade_name: "Simple Letter Grading", 
                grade_type: []
            }, 
            simple_grading_system: [
                {from: 0, to: 30, grade: "F", remark: "Poor"}, 
                {from: 31, to: 50, grade: "E", remark:  "Fair"}, 
                {from: 51, to: 60, grade: "D", remark:  "Pass"}, 
                {from: 61, to: 70, grade: "C", remark:  "Credit"}, 
                {from: 71, to: 80, grade: "B", remark:  "Very Good"}, 
                {from: 81, to: 100, grade: "A", remark:  "Distinction"}, 
            ], 
            bece_system: [
                {from: 0, to: 39, grade: "F", remark: "Fail"}, 
                {from: 40, to: 49, grade: "P", remark: "Pass"}, 
                {from: 50, to: 64, grade: "C", remark:  "Credit"}, 
                {from: 65, to: 79, grade: "B", remark:  "Upper Credit"}, 
                {from: 80, to: 100, grade: "A", remark:  "Distinction"}, 
            ], 
            waec_system: [
                {from: 0, to: 39, grade: "F9", remark: "Fail"}, 
                {from: 40, to: 44, grade: "E8", remark:  "Pass"}, 
                {from: 45, to: 49, grade: "D7", remark:  "Pass"}, 
                {from: 50, to: 54, grade: "C6", remark:  "Credit"}, 
                {from: 55, to: 59, grade: "C5", remark:  "Credit"}, 
                {from: 60, to: 64, grade: "C4", remark:  "Credit"}, 
                {from: 65, to: 69, grade: "B3", remark:  "Good"}, 
                {from: 70, to: 74, grade: "B2", remark:  "Very Good"}, 
                {from: 75, to: 100, grade: "A1", remark:  "Excellent"}, 
            ], 
            american_simple_system: [
                {from: 0, to: 59, grade: "F", remark: "Fail"}, 
                {from: 60, to: 69, grade: "D", remark:  "Below Average"},  
                {from: 70, to: 79, grade: "C", remark:  "Average"},  
                {from: 80, to: 89, grade: "B", remark:  "Good"},  
                {from: 90, to: 100, grade: "A", remark:  "Excellent"}
            ],
            american_extended_system: [
                {from: 0, to: 59, grade: "F", remark: "Fail"}, 
                {from: 60, to: 62, grade: "D-", remark: "Below Average"}, 
                {from: 63, to: 66, grade: "D", remark: "Below Average"}, 
                {from: 67, to: 69, grade: "D+", remark: "Below Average"}, 
                {from: 70, to: 72, grade: "C-", remark: "Average"}, 
                {from: 73, to: 76, grade: "C", remark: "Average"}, 
                {from: 77, to: 79, grade: "C+", remark:  "Average"},  
                {from: 80, to: 82, grade: "B-", remark:  "Good"},  
                {from: 83, to: 86, grade: "B", remark:  "Good"},  
                {from: 87, to: 89, grade: "B+", remark:  "Good"},
                {from: 90, to: 92, grade: "A-", remark:  "Excellent"},
                {from: 93, to: 96, grade: "A", remark:  "Excellent"},
                {from: 97, to: 100, grade: "A+", remark:  "Excellent"}
            ]
        }
    },
    watch: {
        "grade.grade_name": function(val){
            if(val === "Simple Letter Grading"){
                this.check_disability = false 
            } else {
                this.check_disability = true 
            }

            switch(val){
                case "Simple Letter Grading": 
                    this.grade.grade_type = []
                    this.simple_grading_system.forEach(el => {
                        this.grade.grade_type.push(JSON.parse(JSON.stringify(el)))
                    })
                    break 
                case "BECE Standard": 
                    this.grade.grade_type = []
                    this.bece_system.forEach(el => {
                        this.grade.grade_type.push(JSON.parse(JSON.stringify(el)))
                    })
                    break
                case "WAEC Standard": 
                    this.grade.grade_type = []
                    this.waec_system.forEach(el => {
                        this.grade.grade_type.push(JSON.parse(JSON.stringify(el)))
                    })
                    break
                case "American Simple Standard":
                    this.grade.grade_type = []
                    this.american_simple_system.forEach(el => {
                        this.grade.grade_type.push(JSON.parse(JSON.stringify(el)))
                    })
                    break
                case "American Extended Standard":
                    this.grade.grade_type = []
                    this.american_extended_system.forEach(el => {
                        this.grade.grade_type.push(JSON.parse(JSON.stringify(el)))
                    })
                    break 
                default: 
                    this.grade.grade_type = []
            }
        }
    },
    computed: {
        // allLevels(){
        //     return this.$store.getters['level/details']
        // }
    },
    mounted(){
        this.grade.grade_type = []
        this.simple_grading_system.forEach(el => {
            this.grade.grade_type.push(JSON.parse(JSON.stringify(el)))
        })
    },
    methods: {
        add_grade(){
            this.grade.grade_type.push(
                {from: "", to: "", grade: "", remark: ""}
            )
        },
        async remove_grade(value){
            let modal = await pushModal(ConfirmComponent, {file_body: "Remove Grade Listing?"})
            modal.on('return', (val) => {
                if(val === false){
                    modal.close()
                } else {
                    this.grade.grade_type.splice(value, 1)
                    modal.close()
                }
            })
        },
        test(val){
            let to_value = this.grade.grade_type[val].to 
            this.grade.grade_type[val + 1].from = to_value + 1
        }
    }

}
</script>

<style scoped>
.tweak {
    z-index: 100; 
}
</style>