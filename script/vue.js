let app = new Vue({
    el: "#app",
    data: {
        goods: [{
            id: "1",
            goods_name: "Balenciaga Triple S",
            goods_price: 1800,
            goods_stock: 5,
            count: 1,
            image: "./images/img1.jpg"
        }, {
            id: "2",
            goods_name: "Adidas Human Race Fear of God",
            goods_price: 2000,
            goods_stock: 3,
            count: 1,
            image: "./images/fog-human-race.jpg"
        }, {
            id: "3",
            goods_name: "Balenciaga Triple S White",
            goods_price: 2500,
            goods_stock: 8,
            count: 1,
            image: "./images/img3.jpg"
        }, {
            id: "4",
            goods_name: "Adidas Human Race X Pharrel",
            goods_price: 1300,
            goods_stock: 5,
            count: 1,
            image: "./images/hu-race-pharrel.jpg"
        }],
        carts: []
    },
    methods: {
        addToCart(item) {
            var carts = this.carts
            for (let i = 0; i < carts.length; i++) {
                if (carts[i].id === item.id) {
                    carts[i].count = carts[i].count + 1
                    carts[i].goods_price_total = carts[i].goods_price * carts[i].count 
                    return
                }                
            }
            carts.push(item)
            console.log(carts);
        },
        removeFromCart(item) {
            this.carts.count-=1;
            this.carts.splice(this.carts.indexOf(item),1)
        }
    }
})