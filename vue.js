new Vue({
    el: '#app',
    data: {
      carousels: [{
          images: "./images/alpstein_massif_swiss_alps-wallpaper-1920x1080.jpg"
      },{
          images: "./images/boat_reflection-wallpaper-1600x900.jpg"
      }],
      contents:[{
        image: "//06.img.avito.st/640x480/4140232806.jpg",
        destination: "Bali Island",
        price: 1000,
        days:"5 days",
        quantity: 100 
      },{
        image: "http://justglobetrotting.com/wp-content/uploads/2015/09/budapest-hungary-1080x675.jpg",
        destination: "Budapest",
        price: 2000,
        days:"4 days",
        quantity: 50   
      },{
        image: "//do9f0cpkv689t.cloudfront.net/SFImage/Images/swissf273ffe313a06dce84b1ff000062a8f2.png",
        destination: "Switzerland",
        price: 1750,
        days:"3 days",
        quantity: 75 
      },{
        image: "https://cuhsxov73uxte8o3fsfcl91m-wpengine.netdna-ssl.com/wp-content/uploads/2015/02/VIENNA.jpg",
        destination: "Vienna,austria",
        price: 1250,
        days:"2 days",
        quantity: 60  
      },{
        image: "http://www.nuarthatours.com/wp-content/uploads/2017/10/paket-wisata-malang-bromo-murah-1024x576.jpg",
        destination: "Bromo Mountain",
        price: 1750,
        days:"10 days",
        quantity: 50  
      },{
        image:"http://www.aljannahwisata.com/wp-content/uploads/2016/12/wisata-muslim-jepang-1.jpg",
        destination: "Tokyo,japan",
        price:  3000,
        days:"6 days",
        quantity: 4    
      }],
      cart:[],
      cartTotal:0,
      totalPrice:0
    },
    methods:{
        addCart: function(item){
            for(let i = 0 ; i < this.contents.length ; i++){
                if(this.contents[i].destination === item.destination){
                    if(this.contents[i].quantity === 0){
                        alert(`Soory journey to ${item.destination} SOLD OUT`)
                        this.contents[i].quantity = 0
                        return 
                    }else if(this.contents[i].quantity >= 1){
                        alert(`add journey to ${item.destination} to cart`)
                        this.contents[i].quantity -= 1
                    }
                    for(let j = 0 ; j < this.cart.length ; j++){
                        if(this.cart[j].destination === item.destination){
                            this.cart[j].quantity ++
                            this.cart[j].price += item.price
                            this.cartTotal += item.price
                            this.totalPrice += item.price
                            return 
                        }
                    }
                }
            }
           const package = {
            image: item.image,
            destination: item.destination,
            price: item.price,
            days:item.days,
            quantity: 1 
           }
           this.cart.push(package)
           this.cartTotal += item.price
           this.totalPrice += item.price
        },
        deleteItem: function(item){
            for(let i=0; i<this.cart.length; i++){
                if(this.cart[i].destination == item.destination){
                    let x = confirm('Are you sure want to delete this item?')
                    if(x == true){
                        this.cart.splice(i, 1)
                        this.cartTotal -= item.price
                        this.totalPrice -= item.price
                    }
                }
            }
        },
        addItem: function(item){
            for(let i = 0 ; i < this.contents.length ; i++){
                if(this.contents[i].destination === item.destination){
                    if(this.contents[i].quantity === 0){
                        this.contents[i].quantity = 0
                        return 
                    }else if(this.contents[i].quantity >= 1){
                        this.contents[i].quantity -= 1
                    }
                    for(let j = 0 ; j < this.cart.length ; j++){
                        if(this.cart[j].destination === item.destination){
                            this.cart[j].quantity ++
                            this.cart[j].price += this.contents[i].price
                            this.cartTotal += this.contents[i].price
                            this.totalPrice += this.contents[i].price
                            return 
                        }
                    }
                }
            }
        },
        minItem: function(item){
            for(let i = 0 ; i < this.contents.length ; i++){
                if(this.contents[i].destination === item.destination){
                    if(item.quantity < 1){
                        return 
                    }else{
                        this.contents[i].quantity += 1
                    }
                    for(let j = 0 ; j < this.cart.length ; j++){
                        if(this.cart[j].destination === item.destination){
                            this.cart[j].quantity --
                            this.cart[j].price -= this.contents[i].price
                            this.cartTotal -= this.contents[i].price
                            this.totalPrice -= this.contents[i].price
                            return 
                        }
                    }
                }
            }
        }
    },
    computed:{
        totalCart:function(){
            return this.cart.length
        }
    }
  })
  

