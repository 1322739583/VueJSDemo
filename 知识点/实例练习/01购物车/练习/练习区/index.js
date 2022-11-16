Vue.createApp({
    data(){
        return{
           books:[
               {id: "1", time: "2019-10", name: "Java", num: 1, price: 50.00},
               {id: "2", time: "2018-5", name: "JavaScript", num: 1, price: 33.00},
               {id: "3", time: "2020-6", name: "CSS", num: 1, price: 20.00},
               {id: "4", time: "2020-10", name: "Html", num: 1, price: 10.00}
           ],
            currentIndex:0
        }
    },
    methods:{
        increament(index){
            const book=this.books[index]
            if (book.num<1000){
                book.num++
            }
        },
        decreament(index){
            const book=this.books[index]
            if (book.num>1){
                book.num--
            }
        },
        deleteItem(index){
            this.books.splice(index,1)
        },
        itemClick(index){
            this.currentIndex=index
        }
    },
    computed:{
        totalPrice(){
            let totalPrice=0
            for(let book of this.books){
                totalPrice+=book.price*book.num
            }
            return totalPrice.toFixed(2)
        }
    }
}).mount("#content")