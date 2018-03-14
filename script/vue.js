let app = new Vue({
    el: "#app",
    data: {
        goods: [{
            id: "1",
            goods_name: "Balenciaga Triple S",
            goods_price: "$1800",
            goods_stock: 5,
            count: 1,
            image: "./images/img1.jpg"
        }, {
            id: "2",
            goods_name: "Adidas Human Race Fear of God",
            goods_price: "$2000",
            goods_stock: 3,
            count: 1,
            image: "./images/fog-human-race.jpg"
        }, {
            id: "3",
            goods_name: "Balenciaga Triple S White",
            goods_price: "$2500",
            goods_stock: 8,
            count: 1,
            image: "./images/img3.jpg"
        }, {
            id: "4",
            goods_name: "Adidas Human Race X Pharrel",
            goods_price: "$1300",
            goods_stock: 5,
            count: 1,
            image: "./images/hu-race-pharrel.jpg"
        }],
        carts: []
    },
    methods: {
        addToCart(item) {
            let counter = 0;
            let itemId;
            this.carts.map((v,i,a)=>{
                if(item.id === v.id){
                    counter +=1;
                    itemId = i;
                }
            })
            if(counter > 0){
                this.carts[itemId].count +=1;
            } else {
                this.carts.push(item);
            }
            // console.log(item)
            // this.carts.push(item)
            // item.count++
        },
        lessCart(item) {
            item.count--;
        }
    }
})