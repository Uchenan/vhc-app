<template>
    <div>
        <PageTitleComponent backTo="adInstruction" title="Saved Contents" />
        <ul>
            <li class="my-6 text-justify"><i class="mdi mdi-radiobox-blank mr-2"></i>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, harum expedita dolores esse distinctio vel! Accusamus laudantium eos earum eligendi aperiam eveniet aspernatur perspiciatis ipsa!</li>
            <li class="my-6 text-justify"><i class="mdi mdi-radiobox-blank mr-2"></i>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, harum expedita dolores esse distinctio vel! Accusamus laudantium eos earum eligendi aperiam eveniet aspernatur perspiciatis ipsa!</li>
            <li class="my-6 text-justify"><i class="mdi mdi-radiobox-blank mr-2"></i>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, harum expedita dolores esse distinctio vel! Accusamus laudantium eos earum eligendi aperiam eveniet aspernatur perspiciatis ipsa!</li>
        </ul>
        <button class="form-btn-1 w-full">Select</button>

        <br /><br /><br /><br />

        <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Insert New Short Content</span>
            <textarea class="input-type-1"></textarea>
            <input type="submit" class="form-btn-1 my-1 w-2/5 bg-secondary" value="Insert" />
        </label>
    </div>
</template>


<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"

export default {
    components: {PageTitleComponent}    
}
</script>