// if (localStorage.role !== 'user') {
//   localStorage.clear()
//   window.location = 'login.html'
// }

const server = 'http://localhost:3000'


const app = new Vue(({
  el:'#app',
  data: {
    token: localStorage.getItem('token'),

    items: [],

    listCart: []
  },
  created: function () {
    this.getItem(),
    this.showCart()
  },
  methods: {
    addToCart: function (obj) {
      swal("Hello!", `You just added ${obj.name} to your cart`, "success");
      axios({
        method: 'post',
        url: `${server}/api/cart`,
        headers: {
          token: localStorage.token
        },
        data: {
          itemId: obj._id,
          quantity: 1,
          totalPrice:  obj.price
        }
      }).then(({data}) => {
        this.showCart()
        // console.log(data);
      })
    },
    showCart: function () {
      axios({
        method: 'get',
        url: `${server}/api/cart`,
        headers: {
          token: localStorage.token
        }
      }).then(({ data }) => {
        console.log(data.data_cart);
        this.listCart = data.data_cart
      })
    },

    reduce: function (obj) {
      axios({
        method: 'get',
        url: `${server}/api/cart/updateMin`,
        headers: {
          userId: obj.userId,
          itemId: obj.itemId._id
        }
      }).then(data_cart => {
        // console.log(data_cart);
        this.showCart()
      })
    },

    add: function (obj) {
      axios({
        method: 'get',
        url: `${server}/api/cart/updateMax`,
        headers: {
          userId: obj.userId,
          itemId: obj.itemId._id
        }
      }).then(data_cart => {
        // console.log(data_cart);
        this.showCart()
      })
    },

    deleteData: function (obj) {
      console.log(obj);
      console.log(obj.userId);
      console.log(obj.itemId._id);
      let id_user = obj.userId
      let id_item = obj.itemId._id
      axios({
        method: 'delete',
        url: `http://localhost:3000/api/cart/${id_user}/${id_item}`
      }).then(data_cart => {
        this.showCart()
      })
    },

    getItem: function () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/item'
      }).then(({data}) => {
        this.items = data.data_item
      })
    },

    deleteCart: function () {
      swal("Thanks for buying from our Store :)");
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/cart/delete',
        headers: {
          token: localStorage.token
        }
      }).then(({ data }) => {
        console.log(data);
        this.showCart()
      })
    }
  }
}))
