new Vue({
  el: '#app',
  data: {
    product: {
      name: '',
      price: '',
      image: ''
    },
    products: [],
    isEdit: false
  },
  mounted: function () {
    this.isLogin();
    this.getProducts();
  },
  methods: {
    isLogin: function(){
      var token = localStorage.getItem("token");
      if(token == undefined){
        window.location = "/admin/index.html";

      }

    },
    getProducts: function(){
      request.get('/api/products').then(res =>{
        this.products = res.data.data;
      }).catch(err =>{
        console.log(err);
      });
    },
    addProduct: function(){
      const fileInput = document.querySelector( '#image' );
      const formData = new FormData();
      formData.append( 'image', fileInput.files[0] );
      formData.append( 'name', this.product.name );
      formData.append( 'price', this.product.price );
      request.post('/api/products',formData,{ headers: {token: localStorage.token } }).then(res =>{
        this.products.push(res.data.data);
        this.clearForm();
      }).catch(err =>{
        console.log(err);
      });
    },
    deleteProduct: function(id){
      request.delete(`/api/products/${id}`,{ headers: {token: localStorage.token } }).then(res =>{
        this.getProducts();
        this.clearForm();
      }).catch(err =>{
        console.log(err);
      });
    },
    updateProduct: function(){
      request.put(`/api/products/${this.product._id}/edit`,this.product,{ headers: {token: localStorage.token } }).then(res =>{
        this.getProducts();
        this.clearForm();
      }).catch(err =>{
        console.log(err);
      });
    },
    editProduct: function(product){
      this.product = product;
      this.isEdit = true;
    },
    cancelEdit: function(){
      this.isEdit = false;
      this.clearForm();
    },
    clearForm: function(){
       this.product = {
         name: '',
         price: '',
         image: ''
       }
    }
  },
  
});
