<template>
    <div>
        {{ instruction }}
        <span class="block text-3xl text-center">Transfer Instruction Generated Successfully</span>
        <div class="w-4/5 h-40 bg-gray-500 mx-auto my-4">1</div>
        <p class="text-center">File Name: blah_blah.pdf </p>
        <div class="text-center mt-3">
            <button class="form-btn-1 w-2/5 mx-1 my-0 bg-danger" @click="handleClose"><i class="mdi mdi-close"></i> Close </button>
            <button class="form-btn-1 w-2/5 mx-1 my-0"><i class="mdi mdi-download"></i> Download </button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            instruction: null
        }
    },
    mounted(){
        setTimeout(() => {
            this.instruction = this.$store.state.instruction
        }, 3000)
    },
    methods: {
        handleClose() {
            this.$router.push({name: 'adHome'})
        }
    }
}
</script>