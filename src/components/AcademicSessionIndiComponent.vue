<template>
    <div>
        <span class="block text-xs text-center font-medium py-1 bg-secondary w-max mx-auto mb-2 rounded-xl px-6">
            {{  new_session }}
        </span>
    </div>
</template>

<script>
export default {
    computed: {
        new_session(){
            let session = "No Academic Session set"
            this.$store.getters['session/details'].forEach(el => {
                if(el.active === true){
                    let term = el.terms.filter(term => term.active === true)
                    if(term.length <= 0){
                        session = `${el.name.toUpperCase()}, No term selected`
                    } else {
                        session = `${el.name}, ${term[0].name}`.toUpperCase()
                    }
                }
            });

            return session 
        }
    }
}
</script>