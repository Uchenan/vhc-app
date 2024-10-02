<template>
    <div class="bg-white p-5 rounded-xl shadow-2xl w-4/5 md:w-3/5 lg:w-2/5 tweak">
        <h3 class="text-lg font-bold mb-4 border-b">Add Term</h3>
        
        <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Name of Term</span>
            <input type="text" class="input-type-1" />
        </label>

        <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Code</span>
            <input type="text" class="input-type-1" />
        </label>


        <!-- PANEL FOR SETTING SUBJECT MARKS ALLOCATION AND GRADING -->
        <span :class="(tester)? 'block border-0 p-2 bg-gray-300 font-medium' : 'block border-2 p-2 bg-white'" @click="tester = !tester">
            <i :class="(tester)? 'mdi mdi-chevron-down mr-1' : 'mdi mdi-chevron-right mr-1' "></i>Juniour Secondary School 1
        </span>
        <Collapse class="v-collapse" :when="tester">
            <div class="p-2 flex flex-col items-center bg-gray-100">
                <span class="text-sm font-bold">Subject marks distribution & allocation</span>
                <div class="border border-gray-200 w-4/5 shadow">
                    <table class="divide-y divide-green-400 w-full">
                        <thead class="bg-gray-100 text-xs">
                            <tr class="divide-x">
                                <th class="">
                                    Name
                                </th>
                                <th class="">
                                    Mark Obtainable 
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="divide-x border-b">
                                <td>
                                    <input type="text" class="outline-none text-center w-full" placeholder="Exam" /> 
                                </td>
                                <td>
                                    <input type="text"  class="outline-none text-center w-full" placeholder="20" /> 
                                </td>
                            </tr>
                            <tr class="divide-x border-b">
                                <td>
                                    <input type="text" class="outline-none text-center w-full" /> 
                                </td>
                                <td>
                                    <input type="text"  class="outline-none text-center w-full" /> 
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <button class="bg-primary text-white py-1 px-3 rounded-md my-2 text-sm">Set Grading System</button>
            </div>

        </Collapse>

        <br /> 
        <div>
            <button class="btn-1 px-6 bg-danger" @click="$emit('return', false)"><i class="mdi mdi-cancel mr-2"></i>No</button>
            <button class="btn-1 px-6" @click="$emit('return', true)"><i class="mdi mdi-checkbox-marked-circle mr-2"></i>Yes</button>
        </div>
    </div>
</template>

<script>
export default {
    // modal_type detects the type of icon that will be used 
    props: ['file_body'],
    data(){
        return {
            tester: false 
        }
    },
    computed: {
        
    },

}
</script>

<style scoped>
.tweak {
    z-index: 100; 
}
</style>