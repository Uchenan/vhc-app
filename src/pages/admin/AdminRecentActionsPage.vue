<template>
    <div>
        <div class="tweak bg-white shadow-xl">
        <PageTitleComponent backTo="adHome" title="All Actions" />
        </div>

        <ul class="mt-2">
            <span v-if="logs.length > 0">
                <li class="p-3 my-3 rounded-md bg-gray-200 dark:bg-gray-700" v-for="(value, index) in logs" :key="index">
                    <div class="border-b-gray border-b-3 text-primarylight">
                        <i class="mdi mdi-radiobox-marked mr-2"></i>
                        <span class="font-medium">{{ value.timestamp}}</span>
                    </div>
                    <div class="px-1">
                        <span>{{ value.message}}</span>
                    </div>
                </li>
            </span>
            <span v-else class="block text-center mt-3">
                ----- No Log Data Available -----
            </span>
        </ul>
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
            logs: []
        }
    },
    mounted(){
        this.logs = this.$store.getters['log/details']
        this.$store.commit('deactivateLoadingState')
    }
}
</script>

<style scoped>
.tweak {
    position: sticky; 
    top: 0; 
}
</style>