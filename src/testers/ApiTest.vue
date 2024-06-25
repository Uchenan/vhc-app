<template>
    <div>
        {{one}}
        <button @click="creator">Create a Teacher </button>
        <button @click="del">Delete a Teacher </button>
    </div>
</template>

<script>
import { authenticateTeacher, createTeacher } from "../services/teacher.service.js"


export default {
    data(){
        return {
            one: [],

            demoData: {
                bio: {
                    title: "Mr.",
                    gender: "M",
                    surname: "Okani",
                    other_names: "Uchenna",
                    religion: "Christianity"
                },
                account: {
                    ref_id: "",
                    password: "bring"
                },
                bank: {
                    acct_name: "Okani Uchenna Success", 
                    bank_acct: "Palmpay",
                    acct_no: "8126361737"
                }
            }
        }
    },
    mounted(){

    },
    methods: {
        del() {
            authenticateTeacher("24M0186TC", "brindfg").then(x => {
                if(x !== "nil"){
                    this.one = x
                } else {
                    this.one = "Error"
                }
            })
        },
        creator() {
            createTeacher(this.demoData).then(x => {
                if(x !== "nil"){
                    this.one = "Successful"
                } else {
                    this.one = "An error occurred in me"
                }
            })
        }
    }
}
</script>