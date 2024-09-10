<template>
    <div>
        <h2 class="text-2xl border-b-2">Bio Data </h2>
        <br /> 
        <form class="w-full lg:w-1/2" @submit.prevent="$emit('save')"> 
            <label class="my-2" v-for="(value, index) in bio" :key="index">
                <span v-if="index == '_id' "></span>
                <span v-else-if="index == 'img_url' "></span>
                <span v-else-if="index == 'date_of_birth' || index == 'class_last_passed_date' ">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white capitalize">{{ form_text_parser(index) }}</span>
                    <input type="date" class="input-type-1 bg-transparent" v-model="bio[index]" />
                </span>
                <span v-else-if="index == 'gender' ">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white capitalize">{{ form_text_parser(index) }}</span>
                    <select class="input-type-1 bg-transparent" v-model="bio[index]">
                        <option v-for="(value, index) in $store.getters['important/specific']('gender')" :key="index" :value="value.value">
                            {{ value.name }}
                        </option>
                    </select>
                </span>
                <span v-else-if="index == 'quran_recitation' || index == 'identification_of_arabic_alphabets' ">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white capitalize">{{ form_text_parser(index) }}</span>
                    <select class="input-type-1 bg-transparent" v-model="bio[index]">
                        <option v-for="(value, index) in $store.getters['important/specific']('rating')" :key="index">
                            {{ value }}
                        </option>
                    </select>
                </span>
                <span v-else-if="index == 'religion'">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white capitalize">{{ form_text_parser(index) }}</span>
                    <select class="input-type-1 bg-transparent" v-model="bio[index]">
                        <option v-for="(value, index) in $store.getters['important/specific']('religion')" :key="index">
                            {{ value }}
                        </option>
                    </select>
                </span>
                <span v-else>
                    <span class="block font-medium text-slate-700 text-sm dark:text-white capitalize">{{ form_text_parser(index) }}</span>
                    <input type="text" class="input-type-1 bg-transparent" v-model="bio[index]" />
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
        bio(){
            return this.$store.getters['applicant/details'].info.bio
        }
    },
    methods: {
        form_text_parser
    }
}
</script>
