import store from "@/store"

let allLevels = store.getters['level/details']

export default function level_decoder(val){
    let res = allLevels.filter(x => x.code === val)
    return res[0].name
}