import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    message: "mesg",
    count: 10,
    sum: 10,
    school: { name: "第一中学", addr: "古桑路" }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
    showCount(state,getters){
      return state.count+getters.doubleCount
    }
  },
  mutations: {
    increment(state,payload) {
      state.count+=payload.amount;
    },
    decrement(state) {
      state.count--;
    }
  }
});
