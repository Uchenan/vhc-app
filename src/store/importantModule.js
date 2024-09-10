import axios from 'axios'
import store from './index'

export default {
    namespaced: true, 
    state: {
        important: {
            gender: [
                {name: "Male", value: "M"},
                {name: "Female", value: "F"}
            ], 
            rating: ["Very Good", "Good", "Average", "Fair", "Poor"], 
            security_question: [
                "What is our favourite food?", 
                "What is your Mother's maiden name?", 
                "What is your dream country?"
            ],
            religion: ["Islam", "Christianity", "Other Religions"]
        }
    }, 
    getters: {
        specific: (state) => (val) => {
            return state.important[val]
        }
    }
}