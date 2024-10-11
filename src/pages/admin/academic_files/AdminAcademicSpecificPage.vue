<template>
    <div>
        <PageTitleComponent backTo="adAcademic" :title="$route.query.name" />
        <br /> 

        <div class="my-2 py-2 px-4 rounded-md border mb-6" :class="(academic.active)? ' border-green-300 bg-green-200' : ' border-gray-300 bg-gray-200' ">
            <span class="block font-medium text-slate-700 text-sm">Status <i class="mdi mdi-star-circle mr-1"></i></span>
            <div class="flex">
                <span class="block font-thin text-slate-700 text-lg">{{(academic.active)? 'Active' : 'Inactive' }}</span>
                <button @click="statusChanger" class="btn-1 ml-2" :class="(academic.active)? 'bg-gray-700 hover:bg-gray-900' : 'bg-green-700 hover:bg-green-900' "><i class="mdi mdi-check mr-1"></i>{{(academic.active)? 'Deactivate' : 'Activate' }}</button>
            </div>
        </div>

        <div>
            <h2 class="heading-small border-b">Mark Allocation</h2>
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
                                <i class="mdi mdi-pencil text-lg text-danger" @click="edit_mark_allocation(index)"></i>
                            </td>
                        </tr>
                    </tbody>
                    <tbody class="divide-y" v-else>
                        <tr class="divide-x">
                            <td colspan="3" class="text-center p-2"> --- No Grade System created --- </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <br /><br />

        <div>
            <h2 class="heading-small border-b">Grade Setting</h2>
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
                                <i class="mdi mdi-pencil text-lg" @click="edit_grade_setting(index)"></i>

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
        </div>
    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"
import { toRaw } from "vue"
import { openModal } from "jenesius-vue-modal"
import ConfirmComponent from "@/components/ConfirmComponent.vue";
import ModalComponent from "@/components/ModalComponent.vue"
import level_decoder from "@/helpers/level_decoder";


export default {
    components: {PageTitleComponent},
    data(){
        return {
            
        }
    },
    computed: {
        academic() {
            return structuredClone(toRaw(this.$store.getters['session/specific'](this.$route.query.name)))
        }
    },
    mounted(){
        this.$store.commit('deactivateLoadingState')
    },
    methods: {
        edit_grade_setting(){
            alert("Editing grade system")
        },
        edit_mark_allocation(){
            alert("editing")
        }, 
        decode_level_code(val){
            return level_decoder(val)
        },
        async statusChanger(){
            let message, query 
            switch(this.academic.active){
                case false:
                    message = "Are you sure you want to make this session active? Doing so will make every other sessions inactive. Continue?"
                    query = "session/activate"
                    break
                case true: 
                    message = "Deativating this session will make its operations invincible to everyone. Continue?"
                    query = "session/deactivate"
                    break
                default: 
                    openModal(ModalComponent, {modal_type: "failed", modal_body: "Invalid User Response!"})
                    return null
            }

            let modal = await openModal(ConfirmComponent, {file_body: message})
            modal.on('return', (val) => {
                if(val){
                    this.$store.dispatch(query, {name: this.academic.name}).then(doc => {
                        if(doc){
                            openModal(ModalComponent, {modal_type: "success", modal_body: "Session status set to Active Successfullly"})
                        } else {
                            openModal(ModalComponent, {modal_type: "failed", modal_body: "An internal error occurred! Status not set"})
                        }
                    })
                }
                modal.close()
            })
        }
    }
}
</script>