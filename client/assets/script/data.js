new Vue({
    el: '#produk',
    data: {
        items: [],
        cart: []
    },
    created: function () {
        axios.get('http://ecommerce-server.srohimah.com/product').then(response => {
            this.items = response.data.data.map(val => val)
        }).catch(err => console.log(err))
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
            if(!localStorage.idUser){
                swal("Tidak bisa malanjutkan proses!", "Anda Belum login", "warning")
                .then((value) => {
                    window.location.href="index.html"
                })
            }else{
                let obj = {
                    name: objItem.name,
                    price: objItem.price,
                    subtotal: objItem.price,
                    image: objItem.image,
                    quantity: 1
                }
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].name === objItem.name) {
                        if (this.items[i].stock >= 1) {
                            this.items[i].stock -= 1;
                        } else if (this.items[i].stock === 0) {
                            this.items[i].stock = 0;
                            return
                        }
                        for (let i = 0; i < this.cart.length; i++) {
                            if (this.cart[i].name === obj.name) {
                                this.cart[i].subtotal += obj.price
                                this.cart[i].quantity += 1
                                localStorage.setItem('carts', JSON.stringify(this.cart))                            
                                return
                            }
                        }
                    }
                }
                this.cart.push(obj)
                localStorage.setItem('carts', JSON.stringify(this.cart))
                this.cart.subtotal += obj.price
                localStorage.setItem('carts', JSON.stringify(this.cart))   
            }
        },
        addItem: function (objItem) {
            for (let i = 0; i < this.items.length; i++) {
                if (objItem.name === this.items[i].name) {
                    if (this.items[i].stock >= 1) {
                        this.items[i].stock -= 1;
                    } else if (this.items[i].stock === 0) {
                        this.items[i].stock = 0;
                        return
                    }
                    for (let j = 0; j < this.cart.length; j++) {
                        if (this.cart[j].name === objItem.name) {
                            this.cart[j].quantity += 1
                            this.cart[j].subtotal += objItem.price
                            return
                        }
                    }
                }
            }
            localStorage.setItem('carts', JSON.stringify(this.cart))            
        },
        substractItem: function (objItem) {
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].name === objItem.name) {
                    this.cart[i].quantity -= 1
                    this.cart[i].subtotal -= objItem.price
                    if (this.cart[i].quantity === 0) {
                        this.cart.splice(i, 1)
                    }
                }
            }
            for (let j = 0; j < this.items.length; j++) {
                if (objItem.name === this.items[j].name) {
                    this.items[j].stock += 1;
                }
            }
            localStorage.setItem('carts', JSON.stringify(this.cart))            
        },
        process(){
            window.location.href="cart.html"                
        },
        logout() {
            localStorage.clear()
            FB.logout()
            location.reload()
        }
    },
})