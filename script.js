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
        itemsList: [
            {
                id:"AR-01",
                name:'Arduino Uno Rev3',
                description:'The UNO is the best board to get started with electronics and coding. If this is your first experience tinkering with the platform, the UNO is the most robust board you can start playing with.',
                price:25,
                imageUrl:'Assets/Catalog/a000066_featured.jpg',
                stock: 5
            },
            {
                id:"AR-02",
                name:'Arduino Mega 2560 Rev3',
                description:'The MEGA 2560 is designed for more complex projects. With 54 digital I/O pins, 16 analog inputs and a larger space for your sketch it is the recommended board for 3D printers and robotics projects.',
                price:38.5,
                imageUrl:'Assets/Catalog/a000067_front_2_1.jpg',
                stock: 5
            },
            {
                id:"AR-03",
                name:'Arduino MKR1000 WIFI with Headers Mounted',
                description:'Arduino MKR1000 is a powerful board that combines the functionality of the Zero and the Wi-Fi Shield. It is the ideal solution for makers wanting to design IoT projects with minimal previous experience in networking.',
                price:36.99,
                imageUrl:'Assets/Catalog/abx00011_featured.jpg',
                stock: 5
            },
            {
                id:"AR-04",
                name:'Arduino MKR IoT Bundle',
                description:'The MKR IoT Bundle is a great way to get started with the Internet of Things!',
                price:69,
                imageUrl:'Assets/Catalog/akx00006_featured_1.jpg',
                stock: 5
            },
            {
                id:"AR-05",
                name:'Arduino Starter Kit Multi-language',
                description:'The UNO is the best board to get started with electronics and coding. If this is your first experience tinkering with the platform, the UNO is the most robust board you can start playing with.',
                price:87.99,
                imageUrl:'Assets/Catalog/k000007_featured_3.jpg',
                stock: 5
            },
            {
                id:"AR-06",
                name:'Arduino MKR ZERO (I2S bus & SD for sound, music & digital audio data)',
                description:'The Starter Kit is a great way to get started with Arduino, coding and electronics! The Starter Kit includes the components you need to make 15 fun projects following the step-by-step tutorials on the Project Book.',
                price:21.9,
                imageUrl:'Assets/Catalog/ABX00012_featured_2.jpg',
                stock: 5
            },
        ],
        itemsCart: [],
        prevStock: []
    },
    created: function(){
        this.prevStock = this.itemsList.map(val => val.stock);
        console.log(`Previous Stock: ${this.prevStock}`)
    },
    methods: {
        pricePrint: function(price){
            return `$${price.toFixed(2)}`;
        },
        addToCart: function(obj){
            let index = this.itemsCart.map(val => val.id).indexOf(obj.id);
            let indexStock = this.itemsList.map(val => val.id).indexOf(obj.id);

            if(index==-1){
                this.itemsCart.push({
                    id: obj.id,
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
            this.updateStock(obj.id, 1);
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
        setSubtotal: function(id,quantity){
            this.updateStock(id,quantity);
            let index = this.itemsCart.map(val => val.id).indexOf(id);
            this.itemsCart[index].subtotal = Number(quantity) * Number(this.itemsCart[index].price);
            return this.itemsCart[index].subtotal;
        },
        updateStock: function(id,quantity){
            let indexStock = this.itemsList.map(val => val.id).indexOf(id);
            this.itemsList[indexStock].stock = this.prevStock[indexStock] - quantity;
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
        findStock: function(id) {
            let indexStock = this.itemsList.map(val => val.id).indexOf(id);
            return this.prevStock[indexStock];
        },
        deleteFromCart(id) {
            let index = this.itemsCart.map(val => val.id).indexOf(id);
            this.itemsCart.splice(index,1);
            this.updateStock(id,0);
        }
    },
    computed:{

    },
    watch: {

    }

})
