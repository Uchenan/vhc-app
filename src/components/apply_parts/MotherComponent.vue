<template>
    <div>
        <h2 class="text-2xl border-b-2">Mother</h2>
        <br /> 
        <form class="w-full lg:w-1/2" @submit.prevent="$emit('save')"> 
            <label class="my-2" v-for="(value, index) in mother" :key="index">
                <span v-if="index == '_id' "></span>
                <span v-else-if="index == 'phone_no_one' ||  index == 'phone_no_two' ">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white capitalize">{{ form_text_parser(index) }}</span>
                    <input type="number" class="input-type-1 bg-transparent" v-model="mother[index]" />
                </span>
                <span v-else>
                    <span class="block font-medium text-slate-700 text-sm dark:text-white capitalize">{{ form_text_parser(index) }}</span>
                    <input type="text" class="input-type-1 bg-transparent" v-model="mother[index]" />
                </span>
            </label>
            <button class="px-2 md:px-4 py-1 text-sm md:py-1 bg-gray-500 text-white rounded"><i class="mdi mdi-check"> </i> Save </button> 
        </form>
    </div>
</template>

<script>
import form_text_parser from "@/helpers/form_text_parser"

export default {
    computed: {
        mother() {
            return this.$store.getters['applicant/details'].info.mother
        }
    },
    methods: {
        form_text_parser
    }
}
</script>