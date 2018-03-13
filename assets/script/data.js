const promo = new Vue({
    el: '#produk',
    data: {
        items: [
            {
                name: 'Anya Cardigan',
                price: 135000,
                stock: 12,
                imgSource: 'assets/images/cardigan.jpg',
                status: 'promo'
            },
            {
                name: 'Seven Mukena Ayra',
                price: 200000,
                stock: 12,
                imgSource: 'assets/images/mukena-seven.jpg',
                status: 'promo',
            },
            {
                name: 'Sneaker',
                price: 550000,
                stock: 3,
                imgSource: 'assets/images/sneakers.jpg',
                status: 'promo'
            },
            {
                name: 'Instant lcb Coklat',
                price: 60000,
                stock: 25,
                imgSource: 'assets/images/instant.jpg',
                status: 'promo'
            },
            {
                name: 'Janeska Outer',
                price: 250000,
                stock: 10,
                imgSource: 'assets/images/janeska-outer-jacket.jpeg',
                status: 'terbaru'
            },
            {
                name: 'Kindayo Dress',
                price: 325000,
                stock: 3,
                imgSource: 'assets/images/kindoyao.jpg',
                status: 'terbaru',
            },
            {
                name: 'Vicria Bag',
                price: 450000,
                stock: 3,
                imgSource: 'assets/images/vicria.jpg',
                status: 'terbaru'
            },
            {
                name: 'Xena Flat',
                price: 195000,
                stock: 20,
                imgSource: 'assets/images/xena.jpg',
                status: 'terbaru'
            },
            {
                name: 'mukena sutra paris',
                price: 225000,
                stock: 6,
                imgSource: 'assets/images/gema-collection.jpg',
                status: 'terbaru'
            },
            {
                name: 'Deeja Prealy Hijab',
                price: 78000,
                stock: 10,
                imgSource: 'assets/images/milyarda-hijab-Deeja-Prealy .jpg',
                status: 'terbaru'
            }
        ],
        cart: []
    },
    methods: {
        promo: function (itemName) {
            let promo = 0;
            this.items.map(data => {
                if (data.status === 'promo' && data.name === itemName) {
                    promo = data.price * 0.9;
                    console.log(promo)
                }
            })
            return promo
        },
        currencyFormat: function (price) {
            return price.toLocaleString()
        },
        addToCart: function (objItem) {
            alert(`${objItem.name} telah ditambahkan`)
            let obj = {
                name: objItem.name,
                price: objItem.price,
                subtotal: objItem.price,
                image: objItem.imgSource,
                quantity: 1
            }
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].name === obj.name) {
                    this.cart[i].subtotal += obj.price
                    this.cart[i].quantity += 1
                    for (let j = 0; j < this.items.length; j++) {
                        if (obj.name === this.items[j].name) {
                            this.items[j].stock -= 1;
                            return
                        }
                    }
                }
            }
            this.cart.push(obj)
            this.cart.subtotal += obj.price
            this.items.map(data => {
                if (data.name === obj.name) {
                    data.stock -= 1;
                }
            })
        },
        getTotal: function () {
            let total = 0;
            this.cart.map(data => {
                total += data.subtotal
            })
            return total
        },
        addItem: function (objItem){
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].name === objItem.name) {
                    this.cart[i].quantity += 1
                    this.cart[i].subtotal += objItem.price
                }
            }
            for (let j = 0; j < this.items.length; j++) {
                if (objItem.name === this.items[j].name) {
                    this.items[j].stock -= 1;
                }
            }
        },
        substractItem: function (objItem){
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].name === objItem.name) {
                    this.cart[i].quantity -= 1
                    this.cart[i].subtotal -= objItem.price
                    if(this.cart[i].quantity===0){
                        this.cart.splice(i, 1)
                    }
                }
            }
            for (let j = 0; j < this.items.length; j++) {
                if (objItem.name === this.items[j].name) {
                    this.items[j].stock += 1;
                }
            }
        }
    },
})
