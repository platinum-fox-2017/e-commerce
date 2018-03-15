const app = new Vue({
    el: '#app',
    data: {
        itemLists_1:
        [{
            name    :"Tupperware Closure",
            price   : 10,
            image   :"./asset/image/tupseal3.png",
            id      : "HLD-001",
            qty     : 1
        },{
            name    :"Bruce Lee's Double Stick",
            price   : 50,
            image   :"./asset/image/Double-Stick.jpg",
            id      : "SPT-001",
            qty     : 1
        },{
            name    :"Fly-board",
            price   : 150,
            image   :"./asset/image/Fly-board.jpg",
            id      : "SPT-002",
            qty     : 1
        },{
            name    :"Ocean's Multi Lock",
            price   : 20,
            image   :"./asset/image/pocket-knife.jpg",
            id      : "HLD-002",
            qty     : 1
        }],
        itemLists_2:
        [{
            name    :"Jack Sparrow's Treasure Chest",
            price   : 3000,
            image   :"./asset/image/Pirate-chest.jpg",
            id      : "HLD-003",
            qty     : 1
        },{
            name    :"Jumbo Universal Remote",
            price   : 20,
            image   :"./asset/image/remote.jpg",
            id      : "ELC-001",
            qty     : 1
        },{
            name    :"SpaceX Rocket",
            price   : 10000,
            image   :"./asset/image/spaceX.jpeg",
            id      :"AUT-001",
            qty     : 1
        },{
            name    :"Anti-Theft Car Nipple",
            price   : 7,
            image   :"./asset/image/car-nipple.jpeg",
            id      : "AUT-002",
            qty     : 1
        }],
        hotItemList_1:
        [{
            name    :"Tesla Space Car",
            price   : 5000,
            image   :"./asset/image/tesla.png",
            qty     : 1
        },{
            name    :"Massage Chair",
            price   : 2000,
            image   :"./asset/image/massage-chair.jpg",
            qty     : 1
        },{
            name    :"Boostenergy Coffe Maker",
            price   : 900,
            image   :"./asset/image/coffee-maker.jpg",
            qty     : 1
        }],
        hotItemList_2:
        [{
            name    :"Ronaldo's winning ball world cup 2002",
            price   : 100,
            image   :"./asset/image/soccer-ball.jpeg",
            qty     : 1
        },{
            name    :"Gazelle's first ever bike",
            price   : 700,
            image   :"./asset/image/old-bike.jpeg",
            qty     : 1
        },{
            name    :"Iron Man Suit",
            price   : 10,
            image   :"./asset/image/iron-man-suit.jpg",
            qty     : 1
        }],
        cart:[],
        total: 0,
        lol: this.cart
    },
    methods: {
        addToCart: function (item) {
          alert(`Added ${item.name} to card`)
          for (let i = 0; i < this.cart.length; i++) {
            if(this.cart[i].id === item.id) {
              this.cart[i].qty += item.qty
              this.cart[i].price += item.price
              this.total += item.price
              return ''
            }
          }
          const payload = {
            name: item.name,
            price: item.price,
            image: item.image,
            qty: item.qty,
            id: item.id,
          }
          this.cart.push(payload)
          this.total += item.price
        },
        deleteItem: function (item) {
          for (let i = 0; i < this.cart.length; i++) {
            if(this.cart[i].id === item.id) {
              let del = confirm(`Are you sure want to delete ${item.name} from your cart?`)
              if(del) {
                this.cart.splice(i,1)
                this.total -= item.price
              }
            }
          }
        },
        clearCart: function () {
            if(this.cart.length == 0) {
                return 
            }
            let del = confirm(`Are you sure want to clear your cart?`)
            if(del) {
                this.cart = []
                this.total = 0
            }
        }
    }
})