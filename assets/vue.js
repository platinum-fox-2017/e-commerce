var app = new Vue({
    el: '#app',
    data: {
        items: [{
            name: 'MAMBERAMO Dompet Kunci Kulit Asli Gantungan - Ledo',
            price: 55000,
            image: 'assets/img/mamberamo.jpg',
            sku: '0001'
        }, {
            name: 'Dompet kulit bestseller "moth "',
            price: 309600,
            image: 'assets/img/moth.jpeg',
            sku: '0002'
        }, {
            name: 'Dompet kulit "roach "',
            price: 309600,
            image: 'assets/img/roach.jpeg',
            sku: '0003',
        }, {
            name: 'Ponsel Pouch - Coffee & Friends',
            price: 185000,
            image: 'assets/img/ponsel-pouch.jpg',
            sku: '0004',
        }, {
            name: 'Tas Selempang Kulit Duke City Messenger Chocolate Brown',
            price: 32900,
            image: 'assets/img/duke-city.jpg',
            sku: '0005'
        }],
        carts: [],
        cartTotal: 0
    },
    computed: {

    },
    methods: {
        addToCart: function (item) {
            let carts = this.carts
            let cartTotal = this.cartTotal
            for (let i = 0; i < carts.length; i++) {
                if (carts[i].sku === item.sku) {
                    carts[i].quantity++
                        carts[i].total += item.price
                    cartTotal += item.price
                    return ''
                }
            }

            let payload = {
                name: item.name,
                price: item.price,
                image: item.image,
                sku: item.sku,
                quantity: 1,
                total: item.price
            }
            carts.push(payload)
            this.cartTotal += item.price
        },
        clearCart: function () {
            this.carts = []
            this.cartTotal = 0
        },
        clearOneCart: function (cart) {
            let carts = this.carts
            for (let i = 0; i < carts.length; i++) {
                if (cart.sku === carts[i].sku) {
                    carts.splice(i, 1)
                    this.cartTotal -= cart.total
                }

            }
        }
    }
})