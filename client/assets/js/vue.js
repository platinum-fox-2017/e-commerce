const product = [{
    imageUrl : './assets/images/Bridging-assets-Homepage-Polaroids-FILM_600x600.jpg',
    description: 'Shop Instant films'
},{
    imageUrl : './assets/images/Bridging-assets-Homepage-Polaroids-VINTAGE-CAMS_600x600.jpg',
    description: 'Shop Vintage Cameras'
},{
    imageUrl : './assets/images/PO_Banner_update_600x600.jpg',
    description: 'Shop New Cameras'
}]
Vue.config.devtools = true

new Vue({
    el: '#app',
    data: {
        allitems: [], 
        product,
        active: false,
        carts: [],
        checkoutItems: []
    },
    components: {
    },
    methods: {
        checkout: function () {
            console.log(this.carts)
            localStorage.setItem('shoppingcart', JSON.stringify(this.carts))
            $('#whole-page').addClass('animated slideOutLeft')
            setTimeout(function(){
                window.location.href = 'checkout.html'
            },400)
        },
        dollarSign: function(price){
            return `$${price.toFixed(2)}`
        },
        limitDesc: function(desc){
            if (desc.length > 120){
                desc = desc.substr(0,120)
                var index = desc.lastIndexOf(' ')
                desc = desc.substr(0, index) + ' ...'
            } else {
               desc = desc.padEnd(125, '\n')
            }
            return desc
        },
        addToCart: function(name, type, price, picture){
            let obj = {
                name: name,
                type: type,
                price: price,
                picture: picture,
                quantity: 1,
                subtotal: price * this.quantity
            }
            for (let i = 0; i < this.carts.length; i++){
                if (this.carts[i].type === obj.type){
                    this.carts[i].quantity++
                    this.carts[i].subtotal = this.carts[i].price * this.carts[i].quantity
                    this.cartTrigger()
                    this.reduceStock(type)
                    return 
                }
            }
            this.carts.push(obj)
            this.reduceStock(type)
            this.cartTrigger()
        },
        subtotal: function (){
            console.log(this.carts.quantity)
            return this.carts.quantity * this.carts.price
        },
        setSubtotal: function (type, quantity){
          let index = this.carts.map(item => item.type).indexOf(type)
          this.carts[index].subtotal = this.carts[index].price * this.carts[index].quantity
          let subtotal = this.carts[index].subtotal
          return subtotal
        },
        total: function(){
            let total = 0
            for (let i = 0; i < this.carts.length; i++){
                total += this.carts[i].subtotal
            }
            return total
        },
        removeItem: function(type, quantity){
            let indexProduct = this.allitems.map(item => item.type).indexOf(type)
            this.allitems[indexProduct].stock += quantity

            let indexCart = this.carts.map(item => item.type).indexOf(type)
            this.carts.splice(indexCart, 1)
        },
        reduceStock: function (type) {
            let index = this.allitems.map(item => item.type).indexOf(type)
            this.allitems[index].stock -= 1
        },
        showStock: function (type){
            let index = this.allitems.map(item => item.type).indexOf(type)
            return this.allitems[index].stock
        },
        removeOrder: function () {

        },
        placeOrder: function () {
            swal("Order Placed", "You're package will be delivered soon", "success");
            this.checkoutItems = []
            localStorage.clear()
        },
        showmodal: function (){
            $('.modal').addClass('active')
        },
        closemodal: function () {
            $('.modal').removeClass('active')
        },
        cartTrigger: function () {
            $("#cart").addClass('animated rubberBand').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend' , function () {
                $("#cart").removeClass('animated rubberBand')
            })
        } 
    },
    computed: {
        totalCheckout: function () {
            let total = 0
            this.checkoutItems.map(item => total += (item.price * item.quantity))
            return total
        },
        displayItems: function () {
            return this.checkoutItems
        }
    },
    created(){
      $http.get('/item')
        .then(items => {
            items.data.items.map(each => this.allitems.push(each))
            // console.log(this.allitems)
            let insideCart = JSON.parse(localStorage.getItem('shoppingcart'))
            console.log('ini inside cart')
            console.log(insideCart)
            if (insideCart.length > 0){
                this.checkoutItems = insideCart
                console.log('ini checkout items')
                console.log(this.checkoutItems)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
})