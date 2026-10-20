import axios from 'axios'
import {BASE_URL, TIMEOUT} from './config.js'
import {useMainStore} from "@/stores/modules/main";
import {storeToRefs} from "pinia";

//js好像是不能用storeToRef的，vue文件才可以用？
const mainStore = useMainStore()
const {isLoading} = storeToRefs(mainStore)

class Request {
    constructor(baseURL, timeout = 10000) {
        this.instance = axios.create({
            baseURL,
            timeout
        })
        this.instance.interceptors.request.use(res => {
            isLoading.value = true
            return res
        }, err => {
            return err
        })
        this.instance.interceptors.response.use(res => {
            isLoading.value = false
            return res
        }, err => {
            isLoading.value = false
            return err
        })
    }

    request(config) {
        // console.log("isLoading", isLoading)
        // console.log("isLoading value", isLoading.value)
        return new Promise((resolve, reject) => {
            this.instance.request(config).then(res => {
                resolve(res.data)

            }).catch(err => {
                reject(err)
            })
        })
    }

    get(config) {
        return this.request({...config, method: "get"})
    }

    post(config) {
        return this.request({...config, method: "post"})
    }
}

let dataRequest = new Request(BASE_URL, TIMEOUT)

export default dataRequest

