<template>
    <div>
        <h2 class="text-2xl border-b-2">Account</h2>
        <br /> 
        <form class="w-full lg:w-1/2" @submit.prevent="$emit('save')"> 
            <label class="my-2" v-for="(value, index) in account" :key="index">
                <span v-if="index == '_id' || index == 'ref_id' || index == 'disable_acct' || index == 'position' "></span>
                <span v-else-if="index == 'security_question'">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white capitalize">{{ form_text_parser(index) }}</span>
                    <select class="input-type-1 bg-transparent" v-model="account[index]">
                        <option v-for="(value, index) in $store.getters['important/specific']('security_question')" :key="index">
                            {{ value }}
                        </option>
                    </select>
                </span>
                <span v-else>
                    <span class="block font-medium text-slate-700 text-sm dark:text-white capitalize">{{ form_text_parser(index) }}</span>
                    <input type="text" class="input-type-1 bg-transparent" v-model="account[index]" />
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
        account() {
            return this.$store.getters['applicant/details'].info.account
        }
    },
    methods: {
        form_text_parser
    }
}
</script>