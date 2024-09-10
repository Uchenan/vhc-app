<template>
    <div>
        <PageTitleComponent backTo="adApplicant" :title="page_title"  />

        <CardComponent title="Session Login">
            <div v-for="(value, index) in applicant" :key="index" class="my-4">
                <div v-if="index == '_id' || index == 'available_for_check' || index == 'info' || index == '__v' || index == 'reverted_messages'  || index == 'ref_id' || index == 'password'"></div>
                <div v-else>
                    <div class="capitalize font-bold">{{ form_text_parser(index) }}</div>
                    <div> {{ applicant[index]}} </div>
                </div>
            </div>
            <button class="btn-1 bg-danger" @click="deleting"> <i class="mdi mdi-trash-can mr-2" style="font-size: 16px"></i>Delete Record </button>
        </CardComponent>

        <CardComponent title="Bio Data">
            <table class="table-auto border border-gray-300">
                <tr v-for="(value, index) in applicant.info.bio" :key="index">
                    <td  v-if="index == '_id' || index == 'img_url'"></td>
                    <td class="capitalize font-bold border border-gray-300 px-4 py-2" v-else>{{ form_text_parser(index) }}</td>
                    <td  v-if="index == '_id' || index == 'img_url'"></td>
                    <td class="border border-gray-300 px-4 py-2" v-else>{{ applicant.info.bio[index] || "NOT SPECIFIED"}}</td> 
                </tr>  
            </table>
        </CardComponent>

        <CardComponent title="Account">
            <table class="table-auto border border-gray-300">
                <tr v-for="(value, index) in applicant.info.account" :key="index">
                    <td  v-if="index == 'ref_id' || index == '_id' || index == 'position' || index == 'disable_acct'"></td>
                    <td class="capitalize font-bold border border-gray-300 px-4 py-2" v-else>{{ form_text_parser(index) }}</td>
                    <td  v-if="index == 'ref_id' || index == '_id' || index == 'position' || index == 'disable_acct'"></td>
                    <td class="border border-gray-300 px-4 py-2" v-else>{{ applicant.info.account[index] || "NOT SPECIFIED"}}</td> 
                </tr>  
            </table>
        </CardComponent>

        <CardComponent title="Father">
            <table class="table-auto border border-gray-300">
                <tr v-for="(value, index) in applicant.info.father" :key="index">
                    <td  v-if="index == '_id'"></td>
                    <td class="capitalize font-bold border border-gray-300 px-4 py-2" v-else>{{ form_text_parser(index) }}</td>
                    <td  v-if="index == '_id'"></td>
                    <td class="border border-gray-300 px-4 py-2" v-else>{{ applicant.info.father[index] || "NOT SPECIFIED"}}</td> 
                </tr>  
            </table>
        </CardComponent>

        <CardComponent title="Mother">
            <table class="table-auto border border-gray-300">
                <tr v-for="(value, index) in applicant.info.mother" :key="index">
                    <td  v-if="index == '_id'"></td>
                    <td class="capitalize font-bold border border-gray-300 px-4 py-2" v-else>{{ form_text_parser(index) }}</td>
                    <td  v-if="index == '_id'"></td>
                    <td class="border border-gray-300 px-4 py-2" v-else>{{ applicant.info.mother[index] || "NOT SPECIFIED"}}</td> 
                </tr>  
            </table>
        </CardComponent>

        <CardComponent title="Sponsor / Guardian">
            <table class="table-auto border border-gray-300">
                <tr v-for="(value, index) in applicant.info.sponsor" :key="index">
                    <td  v-if="index == '_id'"></td>
                    <td class="capitalize font-bold border border-gray-300 px-4 py-2" v-else>{{ form_text_parser(index) }}</td>
                    <td  v-if="index == '_id'"></td>
                    <td class="border border-gray-300 px-4 py-2" v-else>{{ applicant.info.sponsor[index] || "NOT SPECIFIED"}}</td> 
                </tr>  
            </table>
        </CardComponent>

        <CardComponent title="Scanned / Snapped Documents">
            <table class="table-auto border border-gray-300">
                <tr v-for="(value, index) in applicant.info.scanned_docs" :key="index">
                    <td  v-if="index == '_id'"></td>
                    <td class="capitalize font-bold border border-gray-300 px-4 py-2" v-else>{{ form_text_parser(index) }}</td>
                    <td  v-if="index == '_id'"></td>
                    <td class="border border-gray-300 px-4 py-2" v-else>{{ applicant.info.scanned_docs[index] || "NOT SPECIFIED"}}</td> 
                </tr>  
            </table>
        </CardComponent>

        <CardComponent title="Review" v-if="applicant.ref_id == '' || applicant.password == '' ">
            <h2 class="font-bold">Recent Observations sent </h2> 
            <ul v-if="applicant.reverted_messages == []">
                <li>--- None ---</li>
            </ul>
            <ul v-else>
                <li v-for="(value, index) in applicant.reverted_messages" :key="index">
                    <i class="mdi mdi-circle-small"></i>{{ value }}
                </li>
            </ul> 
            <div v-if="applicant.available_for_check == true">
                <button class="btn-1" @click="accept"><i class="mdi mdi-check-circle mr-2"></i>Accept and Register</button> 
                <button class="btn-1 bg-danger" @click="revert"><i class="mdi mdi-close-circle mr-2"></i>Revert</button> 
            </div>
            <div v-else>
                <br />
                --- Uploading of Data is still ongoing. Check back later! ---
            </div>
        </CardComponent>

        <CardComponent title="Voila!" v-else>
            This Applicant have already been enrolled as a student of the school 
            <h3 class="my-2 border-b-2 text-lg font-bold">Login Details </h3> 
            <div>Ref ID => <b>{{ applicant.ref_id }}</b> </div>
            <div>Password => <b>{{ applicant.password }}</b> </div>
        </CardComponent>
    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"
import CardComponent from "@/components/CardComponent.vue"
import form_text_parser from "@/helpers/form_text_parser"
import { openModal } from "jenesius-vue-modal"
import ModalComponent from "@/components/ModalComponent.vue"
import ConfirmComponent from "@/components/ConfirmComponent.vue"
import ListMessagesComponent from "@/components/ListMessagesComponent.vue"

import store from "@/store"



export default {
    components: {PageTitleComponent, CardComponent}, 
    data() {
        return {
            revertSms: null 
        }
    }, 
    computed: {
        applicant() {
            return this.$store.getters['applicant/specific'](this.$route.params.gen_id)
        },
        page_title(){
            return `Manage - ${this.applicant.gen_id}` 
        }
    }, 
    mounted() {
        this.$store.commit('deactivateLoadingState')
    },
    methods: {
        form_text_parser,
        async accept() {
            let modal = await openModal(ConfirmComponent, {file_body: "Are you sure you want to make this Applicant a student of the school?"})
            modal.on('return', (value) => {
                if(value == false){
                    modal.close()
                } else {
                    this.$store.dispatch('student/create', this.applicant.info).then(result => {
                        if(result.success === true){

                            this.applicant.ref_id = result.data.account.ref_id
                            this.applicant.password = this.applicant.info.account.password 
                            store.dispatch('applicant/changeAndUpdate', this.applicant)

                            openModal(ModalComponent, {modal_type: "success", modal_body: `${this.applicant.gen_id} is now fully enrolled 
                            as a student with ref id of ${result.data.account.ref_id}`})
                            this.$router.push({name: 'adApplicant'})
                        } else {
                            openModal(ModalComponent, {modal_type: "failed", modal_body: "An internal error occurred"})
                            modal.close()
                        }
                    })
                }
            })
        },
        async revert() {
            let modal = await openModal(ListMessagesComponent)
            modal.on('return', async (value) => {
                if(value == false){
                    console.log("here babyu")
                    modal.close()
                } else {
                    let confirming = confirm("Send Review")
                    if(confirming == true){
                        this.revertSms = value 
    
                        this.applicant.reverted_messages = this.revertSms
                        this.applicant.available_for_check = false 
    
                        store.dispatch('applicant/changeAndUpdate', this.applicant)
                    } else {
                        modal.close()
                    }

                    modal.close()
                }
                
            })
        },
        async deleting() {
            let modal = await openModal(ConfirmComponent, {file_body: "Are you sure you want to delete this entry?"})
            modal.on('return', (value) => {
                if(value == false){
                    modal.close()
                } else {
                    this.$store.dispatch('applicant/deleteEntry', {
                        gen_id: this.applicant.gen_id,
                        pin: this.applicant.pin
                    }).then(result => {
                        if(result == true){
                            openModal(ModalComponent, {modal_type: "success", modal_body: `${this.applicant.gen_id} entry was deleted successfully`})
                            this.$router.push({name: 'adApplicant'})
                        } else {
                            openModal(ModalComponent, {modal_type: "failed", modal_body: "An internal error occurred"})
                            modal.close()
                        }
                    })
                }
            })
        }
    }
}
</script>