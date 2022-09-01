import Example from './example.vue'

const install = function(Vue){
    Vue.component(Example.name, Example)
}

export default {
    Example,
    install
}