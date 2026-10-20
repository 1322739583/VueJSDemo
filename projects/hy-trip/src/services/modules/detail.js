import request from "@/services/request";

export function getHouseDetail(houseId){
    return request.get({
        url:"/detail/infos",
        params:{
            houseId
        }
    })
}