<template>
    <div>
        <PageTitleComponent backTo="adIncomeAnalysis" title="Create New Income Analysis" />
        <br />

        <form class="md:w-3/5 block mt-3">
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Session</span>
                <input type="text" class="input-type-1"/>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Class</span>
                <input type="text" class="input-type-1"/>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Term</span>
                <input type="text" class="input-type-1"/>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Bill Structure</span>
                <input type="text" class="input-type-1"/>
            </label>

            <button class="form-btn-1 w-full md:w-max my-3 px-4">
                <i class="mdi mdi-checkbox-marked-circle mr-1"></i> Submit
            </button> 
        </form>
    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"

export default {
    components: {PageTitleComponent},
    mounted(){
        this.$store.commit('deactivateLoadingState')
    },
}
</script> 