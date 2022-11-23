import { defineStore } from "pinia";

export const useUser=defineStore("user",{
    state:()=>({
        name:"Tom",
        age:18
    })
})