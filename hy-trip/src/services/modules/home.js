import request from '@/services/request'
export function getHotSuggests(){
    return request.get({
        url:"/home/hotSuggests"
    })
}

export function getCategories(){
    return request.get({
        url:"/home/categories"
    })
}

export function getHouseList(curPage){
    return request.get({
        url:"/home/houselist",
        params:{
            page:curPage
        }
    })
}

