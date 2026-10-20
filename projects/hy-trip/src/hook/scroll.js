import {onActivated,onDeactivated,ref,onMounted,onUnmounted} from "vue";
import {throttle} from "underscore";

// export default function userScroll(reachBottom){
//     const scrollListener=()=>{
//         const scrollTop=document.documentElement.scrollTop
//         const scrollHeight=document.documentElement.scrollHeight
//         const clientHeight=document.documentElement.clientHeight
//         if (scrollTop+clientHeight>=scrollHeight){
//             console.log("到底部了")
//             if (reachBottom)reachBottom()
//         }
//     }
//
//     onMounted(()=>{
//         window.addEventListener("scroll",scrollListener)
//     })
//
//     onUnmounted(()=>{
//         window.removeEventListener("scroll",scrollListener)
//     })
// }


export default function userScroll(){
    const isReachBottom=ref(false)
    const scrollTop=ref(0)
    const scrollHeight=ref(0)
    const clientHeight=ref(0)
    //开启节流
    const scrollListener=throttle(()=>{
          scrollTop.value=document.documentElement.scrollTop
          scrollHeight.value=document.documentElement.scrollHeight
          clientHeight.value=document.documentElement.clientHeight
        // console.log("scrollTop:"+scrollTop.value)
        // console.log("scrollHeight:"+scrollHeight.value)
        // console.log("clientHeight:"+clientHeight.value)
        if (scrollTop.value+clientHeight.value>=scrollHeight.value){
            isReachBottom.value=true
        }
    },500)

    onMounted(()=>{
        window.addEventListener("scroll",scrollListener)
    })

    onUnmounted(()=>{
        window.removeEventListener("scroll",scrollListener)
    })
    return {isReachBottom,scrollTop,scrollHeight,clientHeight}
}
