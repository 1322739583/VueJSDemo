import Vuex from "vuex"
import Vue from "vue"

const actions={
  jia(context,value){
    console.log("jia")
  }
}
const mutations={}
const states={}

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  mutations,
  states
})
