import { defineStore } from "pinia";
import {getHouseDetail} from "@/services";

export const useDetailStore=defineStore("detail",{
    state:()=>({
        detailInfo:{}
    }),
    actions:{
        async fetchHouseDetail(houseId){
            const res=await getHouseDetail(houseId)
            this.detailInfo=res.data
        }
    }
})