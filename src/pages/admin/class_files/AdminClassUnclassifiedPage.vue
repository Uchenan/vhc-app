<template> 
    <div>
       <PageTitleComponent backTo="adClass" title="Unclassified Students" />
        
        <!-- FOR STUDENTS THAT ARE NOT PLACED INTO CLASSES  -->
        <br /> 

        <div v-if="unclassifiedStudents.length > 0" >
            <div class="text-center font-bold text-secondary"> {{ unclassifiedStudents.length }} Students </div>
            <router-link class="p-3 my-3 shadow-md rounded-md block" v-for="(value, index) in unclassifiedStudents"
                :key="index" :to="{name: 'adEditStudent', params: {ref_id: value.account.ref_id}}">
                <i class="mdi mdi-radiobox-marked mr-2"></i> {{ `${value.bio.surname} ${value.bio.other_names}` }}
            </router-link>
        </div>

        <div v-else class="text-center mt-2">
            --- No Unclassified student at the moment ---
        </div>
    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"

export default {
    components: {PageTitleComponent},
    data() {
        return {
            levels: [], 
            students: [],
            unclassifiedStudents: []
        }
    },
    mounted(){
        this.$store.dispatch('level/fetchLevels').then(res => {
            if(res === true){
                this.$store.getters['level/details'].forEach(x => {
                    this.levels.push(x.code)
                })
            }
        }),

        this.$store.dispatch('student/fetchStudents').then(() => {
            this.students = this.$store.getters['student/details']
            
            this.students.forEach(x => {
                let res = this.levels.indexOf(x.academic.level)
                if(res < 0) {
                    this.unclassifiedStudents.push(x)
                }
            })
        })
    },
    computed: {

    },
    methods: {
    }
}
</script>