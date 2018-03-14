$(document).ready(function(){
  var scrollTop = 0;
  $(window).scroll(function(){
    scrollTop = $(window).scrollTop();

    if (scrollTop >= 100) {
      $('#global-nav').addClass('scrolled-nav');
      $("#title-image").attr("src","Assets/arduino logo only white.png");
    } else if (scrollTop < 100) {
      $('#global-nav').removeClass('scrolled-nav');
      $("#title-image").attr("src","Assets/arudinoLogo White.png");
    }

  });

});

var app = new Vue({
    el: '#app',
    data: {
        total:0,
        totalPrice:0,
        itemsList: [],
        itemsCart: [],
        prevStock: []
    },
    created: function(){
        axios.get('http://localhost:3000/items')
            .then(response => {
                this.itemsList = response.data.data;
                this.prevStock = this.itemsList.map(val => val.stock);
                // console.log(`Previous Stock: ${this.prevStock}`)
            })
            .catch(err => {
                console.log("Error : " + err);
            })

    },
    methods: {
        pricePrint: function(price){
            return `$${price.toFixed(2)}`;
        },
        addToCart: function(obj){
            let index = this.itemsCart.map(val => val._id).indexOf(obj._id);
            let indexStock = this.itemsList.map(val => val._id).indexOf(obj._id);

            if(index==-1){
                this.itemsCart.push({
                    _id: obj._id,
                    name: obj.name,
                    description: obj.description,
                    price: obj.price,
                    quantity: 1,
                    imageUrl: obj.imageUrl,
                    subtotal: obj.quantity*obj.price
                });
            }
            else{
                this.itemsCart[index].quantity++;
                this.itemsCart[index].subtotal = this.itemsCart[index].quantity*this.itemsCart[index].price;
            }
            this.updateStock(obj._id, 1);
            // this.itemsList[indexStock].stock--;

        },
        calculateTotal: function(price, quant){
            return price*quant;
        },
        checkStock: function(stock){
            if (stock==0){
                return "disabled"
            };
        },
        setSubtotal: function(_id,quantity){
            this.updateStock(_id,quantity);
            let index = this.itemsCart.map(val => val._id).indexOf(_id);
            this.itemsCart[index].subtotal = Number(quantity) * Number(this.itemsCart[index].price);
            return this.itemsCart[index].subtotal;
        },
        updateStock: function(_id,quantity){
            let indexStock = this.itemsList.map(val => val._id).indexOf(_id);
            this.itemsList[indexStock].stock = this.prevStock[indexStock] - quantity;
            // console.log(`Stock: ${this.itemsList[indexStock].stock} Name: ${this.itemsList[indexStock].name}`)

        },
        setTotalPrice: function(){
            this.totalPrice = this.itemsCart.reduce((tot,val) => {
                return tot+Number(val.subtotal);
            },0)
            return this.totalPrice;
        },
        getTotalItems: function () {
            this.total = this.itemsCart.reduce((tot,val) => {
                return tot+Number(val.quantity);
            },0)
            return this.total;
        },
        reupdateStock: function () {
            this.prevStock = this.itemsList.map(val => val.stock);
            this.itemsCart = [];
        },
        findStock: function(_id) {
            let indexStock = this.itemsList.map(val => val._id).indexOf(_id);
            return this.prevStock[indexStock];
        },
        deleteFromCart(_id) {
            let index = this.itemsCart.map(val => val._id).indexOf(_id);
            this.itemsCart.splice(index,1);
            this.updateStock(_id,0);
        }
    },
    computed:{

    },
    watch: {

    }

})
