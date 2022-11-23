import {defineStore} from "pinia";

const useCounter=defineStore("counter",()=>{
    const count=ref(10)
    function increment(){
        count.value++
    }
    return{count,increment}
})