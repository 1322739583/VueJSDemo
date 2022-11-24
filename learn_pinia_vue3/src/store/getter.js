import { defineStore } from "pinia";
import { useUser } from "./user";

export const useGetter = defineStore("getter", {
  state: () => ({
    count: 10,
    friends: [
      { id: 1, name: "Tom", age: 18 },
      { id: 2, name: "Mike", age: 19 },
      { id: 3, name: "Jack", age: 20 },
    ],
  }),
  //getter相当于computed
  getters: {
    //1.基本使用
    doubleCount(state) {
      return state.count * 2;
    },
    //2.调用别的getter
    doubleCountPlus(state) {
      return this.doubleCount + 1;
    },
    //3.返回一个函数
    findFriend(state) {
      return function (id) {
        for (const friend of state.friends) {
          if (id === friend.id) {
            return friend;
          }
        }
      };
    },
    //4.调用另一个store
    showMessage(state) {
      console.log(this);
      const userStore = useUser();
      return `count:${state.count} name:${userStore.name}`;
    },
  },
});
