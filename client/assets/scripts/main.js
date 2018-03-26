var app = new Vue({
  el: "#app",
  data: {
    items: [],
    carts: JSON.parse(localStorage.getItem("carts")) || [],
    cartTotal: JSON.parse(localStorage.getItem("cartTotal")) || null,
    token_jwt: null,
    email: null,
    password: null,
    access_token: null,
    admin_jwt: null,
    name: null,
    price: null,
    description: null,
    file: '',
    orders: []
  },
  mounted() {
    let self = this
    axios.get(server + "/api/items").then(values => {
      self.items = values.data.items
      self.token_jwt = localStorage.getItem("token_jwt")
      self.access_token = localStorage.getItem("access_token")
      self.admin_jwt = localStorage.getItem("admin_jwt")
    })

    axios.get(server + "/api/alltransaction",{
      headers: {
        userId: localStorage.getItem("token_jwt")
      }
    }).then((response)=>{
      self.orders = response.data.datas
    })
  },
  methods: {
    handleFileUpload(){
      this.file = this.$refs.file.files[0]
    },
    addItem: function () {
      let formData = new FormData()
      formData.append('file', this.file)
      formData.append('name', this.name)
      formData.append('description', this.description)
      formData.append('price', this.price)
      axios.post(server + '/api/admin/additem',
        formData,
        { headers: {
            'Content-type': 'multipart/form-data',
          }
        }
      ).then((response)=>{
        alert(response.data.message)
      })
    },
    logoutadmin: function() {
      localStorage.clear()
      window.location = "/index.html"
    },
    adminlogin: function(email, password) {
      axios
        .post(server + "/api/admin/login", {
          email: email,
          password: password
        })
        .then(response => {
          localStorage.setItem("admin_jwt", response.data.token)
          let self = this
          this.admin_jwt = localStorage.getItem("admin_jwt")
        })
    },
    addToCart: function(item) {
      let carts = this.carts
      let cartTotal = this.cartTotal

      // check if item already at cart
      for (let i = 0; i < carts.length; i++) {
        if (carts[i]._id === item._id) {
          carts[i].quantity++
          carts[i].total += item.price
          this.cartTotal += item.price
          localStorage.setItem("carts", JSON.stringify(carts))
          return localStorage.setItem("cartTotal", this.cartTotal)
        }
      }

      let payload = {
        name: item.name,
        price: item.price,
        image: item.image,
        _id: item._id,
        quantity: 1,
        total: item.price
      }

      carts.push(payload)
      this.cartTotal += item.price
      localStorage.setItem("carts", JSON.stringify(carts))
      localStorage.setItem("cartTotal", this.cartTotal)
    },
    clearCart: function() {
      this.carts = []
      this.cartTotal = 0
      localStorage.removeItem("carts")
      localStorage.removeItem('cartTotal')
    },
    clearOneCart: function(cart) {
      let carts = this.carts
      for (let i = 0; i < carts.length; i++) {
        if (cart._id === carts[i]._id) {
          carts.splice(i, 1)
          this.cartTotal -= cart.total
          localStorage.setItem("carts", JSON.stringify(carts))
          localStorage.setItem("cartTotal", this.cartTotal)
        }
      }
    },
    checkout : function () {
      let self = this
      let carts = JSON.parse(localStorage.getItem("carts"))
      axios.post(server + '/api/checkout', {
        total: localStorage.getItem("cartTotal"),
        carts: carts
      },{
        headers: {
          userId: localStorage.getItem("token_jwt")
        }
      })
      .then((response)=>{
        localStorage.removeItem("cartTotal")
        localStorage.removeItem("carts")
        self.carts = []
        self.cartTotal = ''
      })
    }
  }
})
