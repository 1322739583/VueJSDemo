import { getCityAll } from "@/services";
import { defineStore } from "pinia";

export const useCityStore=defineStore("city",{
    state:()=>({
       allCities:{},
        curCity:{cityName:"上海"}
    }),
    actions:{
        async fetchAllCities(){
            const res=await getCityAll() 
            this.allCities=res.data
        }
    }
})
