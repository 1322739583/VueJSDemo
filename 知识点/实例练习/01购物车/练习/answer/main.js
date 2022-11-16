var app = new Vue({
    el: "#box",
    data: {
        message: "hello",
        citys: ["北京", "上海", "广州", "深圳"],
        letters: ["A", "B", "C", "D", "E"],
        numbers: [1, 2, 3, 4, 5],
        books: [
            {id: "1", time: "2019-10", name: "Java", num: 1, price: 50.00},
            {id: "2", time: "2018-5", name: "JavaScript", num: 1, price: 33.00},
            {id: "3", time: "2020-6", name: "CSS", num: 1, price: 20.00},
            {id: "4", time: "2020-10", name: "Html", num: 1, price: 10.00}
        ]
    },
    methods: {
        increment(index) {
            return this.books[index].num++
        },
        decrement(index) {
            let temp = this.books[index].num
            if (temp > 0) {
                return this.books[index].num--
            }
        },
        removeBookItem(index) {
            this.books.splice(index, 1)
        }
    },
    computed: {
        totalPrice() {
            //高级写法，比较难理解，高级不见得是最好的，你也可以用for循环
            return this.books.map(book => book.num * book.price).reduce((prev, cur) => prev + cur)
        }
    },
    //有个s别写错了
    filters: {
        formatPrice(price) {
            //在vue2可以使用过滤器实现，过滤器在vue3被删除了
            return "￥" + price.toFixed(2)
        }
    }
})