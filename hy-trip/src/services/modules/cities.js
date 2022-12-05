import request from '@/services/request'
export function getCityAll(){
    return request.get({
        url:"/city/all"
    })
}