
const app = new Vue(({
  el:'#app',
  data: {
    category: 'Market Category',

    categories: [{
      message: 'Fruit'
    },{
      message: 'Vegetable'
    },{
      message: 'Beverages'
    },{
      message: 'Bread/Bakery'
    },{
      message: 'Canned/Jarred Goods'
    },{
      message: 'Frozen Foods'
    },{
      message: 'Meat'
    }],

    items: [{
      urlImage: 'img/3_3c56db34-c5c6-4ff1-b2c7-5cb0e3c710ea_grande.jpg',
      title: 'Duku',
      message: 'These are our fresh tomatoes from our beloved garden. Guaranteed fresh!',
      price: 6
    },{
      urlImage: 'img/11_5674fc1f-11a0-4068-bc70-6d6835bc3a21_grande.jpg',
      title: 'Strawberry',
      message: `Some quick example text to build on the card title and make up the bulk of the card's content.`,
      price: 9
    },{
      urlImage: 'img/12_grande.jpg',
      title: 'Iceberg',
      message: `Some quick example text to build on the card title and make up the bulk of the card's content.`,
      price: 5
    },{
      urlImage: 'img/15_8fdea367-f778-4836-b1cb-54ef3e0c6f3b_grande.jpg',
      title: 'Grape',
      message: `Some quick example text to build on the card title and make up the bulk of the card's content.`,
      price: 7
    },{
      urlImage: 'img/4_grande.jpg',
      title: 'Sapodilla',
      message: `Some quick example text to build on the card title and make up the bulk of the card's content.`,
      price: 10
    },{
      urlImage: 'img/abc.jpg',
      title: 'Passion',
      message: `Some quick example text to build on the card title and make up the bulk of the card's content.`,
      price: 8
    }],

    sales: [{
      urlImage: 'img/vinetoms.jpg',
      title: 'Tomatoes',
      message: 'These are our fresh tomatoes from our beloved garden. Guaranteed fresh!',
      price: 3
    },{
      urlImage: 'img/lemon.jpg',
      title: 'Lemonade',
      message: `These are our fresh tomatoes from our beloved garden. Guaranteed fresh!`,
      price: 3
    },{
      urlImage: 'img/cabe.jpg',
      title: 'Chili',
      message: `These are our fresh tomatoes from our beloved garden. Guaranteed fresh!`,
      price: 3
    },{
      urlImage: 'img/daging.jpg',
      title: 'Meat',
      message: `These are our fresh tomatoes from our beloved garden. Guaranteed fresh!`,
      price: 3
    }],

    listCart: []
},
methods: {
  addToCart: function (obj) {
    swal("Hello!", `You just added ${obj.title} to your cart`, "success");
    let first = false
    let position
    for (var i = 0; i < this.listCart.length; i++) {
      if (this.listCart[i].title === obj.title) {
        first = true
        position = i
      }
    }
    if (first) {
      this.listCart[position].total = this.listCart[position].total + 1
      this.listCart[position].price = this.listCart[position].price + obj.price
    }
    else {
      var obj = {
        title: obj.title,
        urlImage: obj.urlImage,
        message: obj.message,
        price: obj.price,
        total: 1
      }
      this.listCart.push(obj)
    }
  },
  reduce: function (name) {
    for (var i = 0; i < this.listCart.length; i++) {
      if (this.listCart[i].title === name) {
        if (this.listCart[i].total > 1) {
          let difference = this.listCart[i].price/this.listCart[i].total
          this.listCart[i].total -= 1
          this.listCart[i].price -= difference
        }
      }
    }
  },

  add: function (name) {
    for (var i = 0; i < this.listCart.length; i++) {
      if (this.listCart[i].title === name) {
        let difference = this.listCart[i].price/this.listCart[i].total
          this.listCart[i].total += 1
          this.listCart[i].price += difference
      }
    }
  },

  deleteData: function (name) {
    for (var i = 0; i < this.listCart.length; i++) {
      if (this.listCart[i].title === name) {
        this.listCart.splice(i, 1)
      }
    }
  }
}
}
))
