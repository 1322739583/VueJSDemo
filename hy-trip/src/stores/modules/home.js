import { defineStore } from "pinia";
import {getCategories, getHotSuggests,getHouseList} from "@/services/modules/home";
import {formatDate} from "@/utils/timeUtil";
import dayjs from "dayjs";

export const useHomeStore=defineStore("home",{
    state:()=>({
        hotSuggests:[],
        categories:[],
        houseList:[],
        enterTime:dayjs(),
        leaveTime:dayjs().add(1,'day')
    }),
    actions:{
        async fetchHotSuggests(){
            const res=await getHotSuggests()
            this.hotSuggests=res.data
        },
        async fetchCategories(){
            const res=await getCategories()
            this.categories=res.data
        },
        async fetchHouseList(curPage){
            const res=await getHouseList(curPage)
            this.houseList.push(...res.data)
        }
    }
})