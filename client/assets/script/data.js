itemss=[
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
    }],
new Vue({
    el: '#produk',
    data: {
        items: [],
        cart: []
    },
    created:function(){
        axios.get('http://localhost:3000/product').then(response=>{
             this.items = response.data.data.map(val=>val)
        }).catch(err=>console.log(err))
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
            let obj = {
                name: objItem.name,
                price: objItem.price,
                subtotal: objItem.price,
                image: objItem.imgSource,
                quantity: 1
            }
            for(let i=0; i<this.items.length; i++){
                if(this.items[i].name === objItem.name){
                    if(this.items[i].stock >= 1){
                        alert(`${objItem.name} telah ditambahkan`)
                        this.items[i].stock -= 1;                        
                    }else if(this.items[i].stock === 0){
                        alert(`${objItem.name} tidak bisa ditambahkan, stock telah habis`)
                        this.items[i].stock = 0;     
                        return     
                    }
                    for (let i = 0; i < this.cart.length; i++) {
                        if (this.cart[i].name === obj.name) {
                            this.cart[i].subtotal += obj.price
                            this.cart[i].quantity += 1
                            return
                        }
                    }
                }
            }
            this.cart.push(obj)
            this.cart.subtotal += obj.price
        },
        addItem: function (objItem){
            for (let i = 0; i < this.items.length; i++) {
                if (objItem.name === this.items[i].name) {
                    if(this.items[i].stock >= 1){
                        this.items[i].stock -= 1;                        
                    }else if(this.items[i].stock === 0){
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


