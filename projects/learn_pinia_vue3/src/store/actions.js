import { defineStore } from "pinia";

export const useActions=defineStore("actions", {
     state:()=>({
         count:0
     }),
     actions:{
        increment(){
            this.count++
        }
     }
})