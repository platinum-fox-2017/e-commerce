var productCategory = [];

for(var i = 0; i < 5; i++){
  var name = faker.commerce.department();
  productCategory.push({
    name
  });
}

new Vue({
  el: '#vue-app',
  data: {
    products: [],
    productCategory: productCategory,
    cartProducts: [],
    total: 0,
    search: '',
    searchData: []
  },
  watch: {
    cartProducts: {
      handler(){
        var total = 0; 
        this.cartProducts.map(cart => {
          cart.subtotal = cart.quantity * cart.price;
          return cart;
        });
        for(var i = 0; i < this.cartProducts.length; i++){
          total += Number(this.cartProducts[i].subtotal);
        }
        this.total = total;
      },
      deep: true
    },
    search: function(newValue){
      this.searchingProduct();
    }
  },
  mounted(){
    this.getProducts();
  },
  methods: {
    searchingProduct: function(){
      this.searchData = [];
        for(var i = 0; i < this.products.length; i++){
           var check = this.products[i].name.toLowerCase().search(this.search);
           if(check >= 0){
             this.searchData.push(this.products[i]);
           }
        }
    },
    addProductCart: function(product){
      var check = this.cartProducts.find(cart => cart._id == product._id);
      if(check){
        this.total = 0;
        this.cartProducts.map((cart) => {
          if(cart.name == product.name){
            cart.quantity = Number(cart.quantity) + 1;
            cart.subtotal = cart.quantity * cart.price;
            this.total += cart.subtotal;
            
            return cart;
            } else {
              this.total += cart.subtotal;
              return cart;
            }
        });

      } else {
        this.cartProducts.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          subtotal: product.price * 1
        });

      }
      $.notify({
          // options
          message: `<b>Success</b> Add ${product.name} To Cart`
        },{
          // settings
          type: 'success',
          timer: 1000,
          animate: {
          enter: 'animated fadeInDown',
          exit: 'animated fadeOutUp'
        },
      });
    },
    deleteCartProducts: function(product){
      var index = this.cartProducts.findIndex(cart => cart.name == product.name);
      this.cartProducts.splice(index,1);

    },
    getProducts: function(){
      request.get('/api/products').then(res =>{
        this.products = res.data.data;
      }).catch(err =>{
        console.log(err);
      });
    },
  }
})
