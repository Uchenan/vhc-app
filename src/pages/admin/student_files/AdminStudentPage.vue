<template>
    <div>
        <PageTitleComponent backTo="adHome" title="Manage Students" />
        
        <router-link :to="{name: 'adCreateStudent'}" class="inline-block py-1 px-2 m-2 bg-secondary text-sm text-white rounded-md"><i class="mdi mdi-plus"></i> New Student</router-link>
        
        <div class="mt-2 w-2/5">
            Filter Class: 
            <select class="focus:outline-none w-full py-2">
                <option>All</option>
                <option>JSS 1</option>
                <option>JSS 2</option>
                <option>JSS 3</option>
                <option>SSS 1</option>
            </select> 
        </div>

        <br />
        <!-- table for displaying all students -->
        <!-- TABLE HEADINGS -->
        <div class="w-full lg:w-4/5">
            <div class="flex bg-primary text-white p-2 font-bold">
                <div class="w-10">S/N</div>
                <div class="w-2/5">NAME</div>
                <div class="w-1/5 px-4">REF ID</div>
                <div class="W-12">DISABLED</div>
            </div>

            <div v-if="students.length > 0">
                <router-link :class="(index % 2 == 0) ? 'flex font-normal items-center bg-gray-200 p-2 hover:text-current hover:bg-gray-400' : 'flex font-normal items-center bg-gray-300 p-2 hover:text-current hover:bg-gray-400'"
                    v-for="(value, index) in students" :key="index" 
                    :to="{name: 'adEditStudent', params: {ref_id: value.account.ref_id}}">
                    <div class="w-10">{{ index + 1 }}</div>
                    <div class="w-2/5">{{ `${value.bio.surname.toUpperCase()} ${value.bio.other_names}`}}</div>
                    <div class="w-1/5 px-4">{{ value.account.ref_id }}</div>
                    <div class="w-12">
                        <i :class="(value.account.disable_acct == 'yes')? 'mdi mdi-check-bold' : 'mdi mdi-minus'"></i>
                    </div>
                </router-link>
            </div>

            <div v-else class="text-center mt-3">
                --- No Student is saved in the database ---
            </div>

        </div>
    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"


export default {
    components: {
        PageTitleComponent 
    },
    data(){
        return {
            students: []
        }
    },
    mounted(){
        this.$store.dispatch('student/fetchStudents').then(() => {
            this.students = this.$store.getters['student/details']
        })
        // this.$store.commit('deactivateLoadingState')
    }
}
</script>