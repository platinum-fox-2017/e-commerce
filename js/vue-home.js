var products = [];
console.log(faker.commerce.department());
var productCategory = [];

for(var i = 0; i < 5; i++){
  var name = faker.commerce.department();
  productCategory.push({
    name
  });
}

for(var i = 0; i < 10; i++){
  var name = faker.commerce.productName();
  var price = faker.commerce.price();
  var image = faker.image.food();
  
  products.push({
    name,
    price,
    image
  });
}

new Vue({
  el: '#vue-app',
  data: {
    products: products,
    productCategory: productCategory,
    cartProducts: [],
    total: 0
  },
  watch: {
    cartProducts: {
      handler(val){
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
  },
  methods: {
    addProductCart: function(product){
      var check = this.cartProducts.find(cart => cart.name == product.name);
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

    }
  }
})
