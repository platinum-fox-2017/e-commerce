const names = [{
    name: "Polaroid",
    category: "Camera",
    type: "SX-70 Land Camera",
    price: 399.99,
    stock: 8,
    description: "The Polaroid SX-70 is one of the most famous instant cameras in the world. It was the first instant SLR camera ever made, and the first to use Polaroid’s now-iconic instant film which brought photos to life the moment they left the camera.",
    imageUrl: [ './assets/images/108ec8a814b24d0f9f0ec06966a6148f_ecb74c59-71af-43e8-b357-84043790f9f1_600x600.jpg',
                './assets/images/362b405cf1ec4fc2bc470c6a2aada817_ec33ffa9-5aa7-4d7a-a572-6deaffe46c1b_600x600.jpg']
},{
    name: "Polaroid",
    category: "Camera",
    type: "600 Camera - Square",
    price: 129.99,
    stock: 7,
    description: "With its sharp, boxy design, Polaroid's 600 system fit right in, turning instant analog photography into an icon of popular culture. ",
    imageUrl: [ './assets/images/997a5ea65d614690b580afb65db3fa4f_600x600.jpg',
                './assets/images/997a5ea65d614690b580afb65db3fa4f_600x600.jpg']
},{
    name: "Polaroid",
    category: "Camera",
    type: "OneStep 2 i-Type Camera",
    price: 119.99,
    stock: 15,
    description: "The OneStep 2 is a new polaroid camera that blends classic design with contemporary style.",
    imageUrl: [ './assets/images/500c4f6cdddc4398b2cd6cb6af2a1c79_600x600.jpg',
                './assets/images/c103f8303f7b4e7093333212fe65b056_600x600.jpg']
},{
    name: "Polaroid",
    category: "Instant Films",
    type: "i-Type Core Film Triple Pack",
    price: 45.00,
    stock: 24,
    description: "With this special bundle, you get two packs of color and one pack of black & white film for your i-Type camera, all with a classic white frame.",
    imageUrl: [ './assets/images/bdf1c41758ff443d8fd4fc068fd3887c_46f65cac-1af6-4b51-a632-31629aa717d5_600x600.jpg',
                './assets/images/iType-Color-WhiteFrame-Frangipani_Beatt-WebStack-00468-01.jpg']
},{
    name: "Polaroid",
    category: "Instant Films",
    type: "600 Core Film Triple Pack",
    price: 55.00,
    stock: 20,
    description: "With this special bundle, you get two packs of color and one pack of black & white film for your 600 camera, all with a classic white frame.",
    imageUrl: [ './assets/images/aa8ddfb2be8648b9bb75e5d408c73185_6b751e78-a626-4c36-bdaa-8b820aef55f1_600x600.jpg',
                './assets/images/color-film-for-polaroid-i-type-004668-stacks-3-oskar-smolokowski.jpg']
}]

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

new Vue({
    el: '#app',
    data: {
        names, 
        product,
        active: false,
        carts: []
    },
    methods: {
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
                    this.reduceStock(type)
                    return 
                }
            }
            this.carts.push(obj)
            this.reduceStock(type)
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
            let indexProduct = this.names.map(item => item.type).indexOf(type)
            this.names[indexProduct].stock += quantity

            let indexCart = this.carts.map(item => item.type).indexOf(type)
            this.carts.splice(indexCart, 1)
        },
        reduceStock: function (type) {
            let index = this.names.map(item => item.type).indexOf(type)
            this.names[index].stock -= 1
        },
        showStock: function (type){
            let index = this.names.map(item => item.type).indexOf(type)
            return this.names[index].stock
        }, 
        mouseOver: function (name){
            let type = name.type
            let index = this.names.map(item => item.type).indexOf(type)
            let firstImage = this.names[index].imageUrl[0]
            let secondImage = this.names[index].imageUrl[1]
            this.names[index].imageUrl[0] = this.names[index].imageUrl[1]
        },
        mouseOut: function (name){
            let type = name.type
            let index = this.names.map(item => item.type).indexOf(type)
            return this.names[index].imageUrl[1]
        }
    },
    computed: {
    },
})


function showModal(){
    $('.modal').addClass('active')
}

function closeModal(){
    $('.modal').removeClass('active')
}