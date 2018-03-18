<template>
  <div>
    <!-- Slider -->
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-xs-12">
          <div align="center">
            <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
              <!-- Indicators -->
              <ol class="carousel-indicators">
                <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                <li data-target="#carousel-example-generic" data-slide-to="2"></li>
              </ol>

              <!-- Wrapper for slides -->
              <div class="carousel-inner">
                <div class="item active">
                  <img src="static/cover1.jpg" alt="Lorem ipsum dolor sit amet">
                </div>
                <div class="item">
                  <img src="static/cover2.jpg" alt="Lorem ipsum dolor sit amet">
                </div>
                <div class="item">
                  <img src="static/cover3.jpg" alt="Lorem ipsum dolor sit amet">
                </div>
              </div>

              <!-- Controls -->
              <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left"></span>
              </a>
              <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right"></span>
              </a>
            </div>
          </div>
        </div>

        <div class="col-md-3 col-xs-12">
          <div class="thumbnail" id="hacktiv8">
            <a href="#">
              <img src="static/logo-hacktiv8.png" alt="" style="width:100%">
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- End of Slider -->

    <!-- Content -->
    <div class="container" id="content">
      <div class="row">
        <div class="col-md-12">
          <div class="col-md-4">
            <div class="rows">
            <div class="list-group">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <b>Coupe CATEGORY</b>
                </li>
                <li class="list-group-item">
                  <b>Sedan CATEGORY</b>
                </li>
                <li class="list-group-item">
                  <b>SUV CATEGORY</b>
                </li>
              </ul>
            </div>

            <div class="row">

              <table class="table table-condensed">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(pro,idx) in product" :key="idx">
                    <td>{{pro.name}}</td>
                    <td>{{pro.qty_buy}}</td>
                    <td>{{pro.qty_buy*pro.price}}</td>
                  </tr>
                </tbody>
              </table>
              <button class="btn" @click="payProduct()">
                Pay
              </button>
            </div>

            <div class="row">
              <table class="table table-condensed">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(pro,idx) in transactions" :key="idx">
                    <td>{{pro.ProductId.name}}</td>
                    <td>{{pro.qty_buy}}</td>
                    <td>{{pro.qty_buy*pro.ProductId.price}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-4" v-for="product in products" :key="product._id">
                  <div class="gallery-panel">
                    <div class="gallery-heading">
                      <div class="thumbnail">
                        <a href="#">
                          <img :src="product.imageURL">
                        </a>
                      </div>
                    </div>
                    <div class="gallery-body-title">
                      <div class="caption">
                        <p>{{ product.name }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="gallery-body-detail">
                    <span>${{ product.price }}</span>
                    <button type="button" class="btn btn-info btn-sm" data-toggle="modal" :data-target="'#myModal'+product._id">Get It Now </button>
                  </div>

                  <!-- Modal -->
                  <div class="modal fade" :id="'myModal'+product._id" role="dialog">
                    <div class="modal-dialog">

                      <!-- Modal content-->
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal">&times;</button>
                          <h4 class="modal-title">Buy This Product</h4>
                        </div>
                        <div class="modal-body">
                          <form class="form-horizontal">
                            <div class="form-group">
                              <label for="disabledInput" class="col-sm-3 control-label">Name : </label>
                              <div class="col-sm-9">
                                <input class="form-control" id="disabledInput" type="text" :value="product.name" disabled>
                              </div>
                              <label for="disabledInput" class="col-sm-3 control-label">Price ($): </label>
                              <div class="col-sm-9">
                                <input class="form-control" id="disabledInput" type="text" :value="product.price" disabled>
                              </div>
                              <label for="disabledInput" class="col-sm-3 control-label">Category: </label>
                              <div class="col-sm-9">
                                <input class="form-control" id="disabledInput" type="text" :value="product.category" disabled>
                              </div>
                              <label for="disabledInput" class="col-sm-3 control-label">Stock: </label>
                              <div class="col-sm-9">
                                <input class="form-control" id="disabledInput" type="text" :value="product.stock" disabled>
                              </div>
                              <label for="focusedInput" class="col-sm-3 control-label">Qty : </label>
                              <div class="col-sm-9">
                                <input class="form-control" id="focusedInput" type="text" value=1 v-model="qty">
                              </div>
                            </div>
                          </form>

                        </div>
                        <div class="modal-footer">
                          <a class="btn btn-success" style="float: right">
                            <span class="fa fa-shopping-cart" @click="buyProduct(product)"> Buy This Product</span>
                          </a>
                          <button type="button" class="btn btn-default" style="float: left" data-dismiss="modal">Close</button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Modal from './Modal.vue'

  export default {
    data() {
      return {
        product: [],
        qty: 1,
        transactions:[]
      }
    },
    components: {
      'app-modal': Modal
    },
    computed: {
      products() {
        console.log(this.$store.state.products);
        return this.$store.state.products
      },
      token(){
        return localStorage.getItem('tokenjwt')
      }
    },
    beforeCreate() {
      this.$store.dispatch('getProduct')
    },
    created(){
      this.startTransaction()
    },
    methods: {
      startTransaction(){
        let self = this
        if(localStorage.getItem('tokenjwt')|| this.token){
          this.$axios('http://localhost:3000/api/transaction',{
            headers:{
              tokenjwt:localStorage.getItem('tokenjwt')
            }
          })
            .then(({data})=>{
              console.log(data);
              self.transactions = data
            })
            .catch(err=>{
              console.error(err);
            })
        }
      },
      buyProduct(product) {
        let self =this
        let checkId = null
        this.product.map((e,i)=>{
          if(e._id == product._id){
            checkId = e._id
          }
          return e
        })
        if(checkId){
          this.product=this.product.map((e,i)=>{
            if(e._id==checkId){
              e.qty_buy =  e.qty_buy + self.qty
            }
            return e
          })

        }else{
          this.product.push({
            ...product,
            qty_buy: this.qty
          })
        }
        this.qty = 1
      }, 
      payProduct(){
        this.$axios.post('http://localhost:3000/api/transaction',{
          products: this.product 
        },{
          headers:{
            tokenjwt: localStorage.getItem('tokenjwt')
          }
        })
        .then(()=>{
          this.product = []
          this.startTransaction()
        })
        .catch(err=>{
          console.error(err);
          
        })
      }
    }
  }

</script>

<style scoped>
  #content {
    padding: 20px 0;
  }

  /* Login Facebook */

  #btn-fblogin {
    width: 200px;
    margin-left: -10px;
    font-weight: bold;
    font-size: 15px;
  }

  #hacktiv8 #btn-fblogin {
    /* margin-left: 150px; */
  }

  @media only screen and (max-width: 768px) {
    #hacktiv8 {
      margin-left: 65px;
      width: 50%;
      margin-top: 10px;
      /* justify-content: center; */
    }
    #btn-fblogin {
      margin-left: 8px;
    }
  }

  /* End of Login Facebook */

  /* Gallery */

  .gallery-heading {
    margin: 0 0 -20px 0;
  }

  category .gallery-body-title {
    background-color: rgb(211, 204, 204);
    color: rgb(10, 10, 10);
    height: 40px;
    padding: 0 0;
    font-size: 1.2em;
    font-weight: bold;
    padding: 10px 10px;
  }

  .gallery-body-detail {
    background-color: #f4f4f4;
    height: 40px;
    padding: 0 0;
    margin-bottom: 20px;
    padding: 10px 10px;
    font-size: 1.2em;
  }

  .gallery-body-detail button {
    margin-top: -5px;
    margin-right: -10px;
    float: right;

  }

  /* End of Gallery */

  .thumbnail-cart {
    max-width: 25%;
    max-height: 25%;
    width: auto;
    height: auto;
    margin-bottom: 100px;
  }

</style>
