var app = new Vue({
  el: "#app",
  data: {
    items: [],
    carts: [],
    cartTotal: 0,
    token_jwt: "",
    email: null,
    password: null,
    access_token: null,
    admin_jwt: null
  },
  created() {
    let self = this;
    axios.get(server + "/api/items").then(values => {
      self.items = values.data.items;
      self.token_jwt = localStorage.getItem("token_jwt");
      self.access_token = localStorage.getItem("access_token");
      self.admin_jwt = localStorage.getItem("admin_jwt");
    });
  },
  computed: {
    PrintPrice: function() {
      return "ssss";
    }
  },
  methods: {
    logoutadmin: function() {
      localStorage.clear();
      window.location = "/index.html"
    },
    adminlogin: function(email, password) {
      axios
        .post(server + "/api/admin/login", {
          email: email,
          password: password
        })
        .then(response => {
          localStorage.setItem("admin_jwt", response.data.token);
          let self = this;
          this.admin_jwt = localStorage.getItem("admin_jwt");
        });
    },
    addToCart: function(item) {
      let carts = this.carts;
      let cartTotal = this.cartTotal;

      for (let i = 0; i < carts.length; i++) {
        if (carts[i]._id === item._id) {
          carts[i].quantity++;
          carts[i].total += item.price;
          this.cartTotal += item.price;
          return "";
        }
      }

      let payload = {
        name: item.name,
        price: item.price,
        image: item.image,
        _id: item._id,
        quantity: 1,
        total: item.price
      };
      carts.push(payload);
      this.cartTotal += item.price;
    },
    clearCart: function() {
      this.carts = [];
      this.cartTotal = 0;
    },
    clearOneCart: function(cart) {
      let carts = this.carts;
      for (let i = 0; i < carts.length; i++) {
        if (cart.sku === carts[i].sku) {
          carts.splice(i, 1);
          this.cartTotal -= cart.total;
        }
      }
    }
  }
});
