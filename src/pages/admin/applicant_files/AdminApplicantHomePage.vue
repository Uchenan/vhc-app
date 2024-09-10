<template>
    <div>
        <PageTitleComponent backTo="adHome" title="Manage Applicants" />
        <br /> 

        <div class="mt-2 mb-4">
            <button @click="newApplicant" class="btn-1 bg-secondary"><i class="mdi mdi-plus-circle"></i> New Applicant Form</button>
        </div>
        
        <!-- TABLE HEADINGS -->
        <div class="w-full lg:w-4/5">
            <div class="flex bg-primary text-white p-2 font-bold">
                <div class="w-10">S/N</div>
                <div class="w-2/5">GENRATED ID </div>
                <div class="w-2/5">FULL NAME</div>
                <div class="">READY</div>
            </div>

             <router-link :class="(index % 2 == 0) ? 'flex font-normal items-center bg-gray-200 p-2 hover:text-current hover:bg-gray-400' : 'flex font-normal items-center bg-gray-300 p-2 hover:text-current hover:bg-gray-400'"
                v-for="(value, index) in applicants" :key="index" 
                :to="{name: 'adViewApplicant', params: {gen_id: value.gen_id}}">
                <div class="w-10">{{ index + 1 }}</div>
                <div class="w-2/5">{{ value.gen_id }}</div>
                <div class="w-2/5">
                    {{ value.info.bio.surname + " " + value.info.bio.other_names }}
                </div>
                <div>
                    <i v-if="value.available_for_check == true" class="mdi mdi-check-circle" style="font-size: 20px;"></i>
                    <i v-else class="mdi mdi-minus" style="font-size: 20px;"></i>
                </div>
            </router-link>

        </div>
    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"

import { openModal } from "jenesius-vue-modal"
import ModalComponent from "@/components/ModalComponent.vue"
import ConfirmComponent from "@/components/ConfirmComponent.vue"

export default {
    components: {PageTitleComponent},
    data(){
        return {
            applicants: []
        }
    },
    mounted() {
        this.$store.commit('deactivateLoadingState')
        this.$store.dispatch('applicant/fetchApplicants').then(() => {
            this.applicants = this.$store.getters['applicant/details']
        })
    },
    methods: {
        async newApplicant(){
            let modal = await openModal(ConfirmComponent, {file_body: "Are you sure you want to create a new Applicant entry form?"})
            modal.on('return', (value) => {
                if(value == false){
                    modal.close()
                } else {
                    this.$store.dispatch('applicant/createNewEntry').then(doc => {
                        if(doc == true){
                            this.$store.dispatch('applicant/fetchApplicants').then(() => {
                                this.applicants = this.$store.getters['applicant/details']
                            })
                            openModal(ModalComponent, {modal_type: "success", modal_body: "Applicant Entry Form created Successfully"})
                        } else {
                            openModal(ModalComponent, {modal_type: "failed", modal_body: "An internal error occurred"})
                        }
                    })
                    modal.close()
                }
            })
        }
    }
}
</script>