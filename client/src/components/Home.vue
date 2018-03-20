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

        <!-- Profile -->
        <div class="col-md-4 col-xs-12" v-if="token">
          <ul class="list-group" v-if="user">
            <li class="list-group-item">Name: {{user.name}} </li>
            <li class="list-group-item">Role: {{user.role}} </li>
            <li class="list-group-item">Email: {{user.email}} </li>
          </ul>
        </div>
        <!-- End of Profile -->

        <div id="logo">
          <img src="static/logo-hacktiv8.png" alt="" style="width:10%">
          <img src="static/logo-vue.jpg" alt="" style="width:10%">
          <img src="static/logo-bootstrap.png" alt="" style="width:10%">
        </div>
        <div v-if="!token">
          <img src="static/logo-node.png" align="middle" alt="" style="width:20%">
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="container" id="content">
      <div class="row">
        <div class="col-md-12">
          <div class="col-md-4">
            <!-- Checkout Table -->
            <div class="row" v-if="token">
              <div class="panel panel-info">
                <div class="panel-heading">
                  <span v-if="role == 'user'">
                    <button class="btn btn-success" style="float: right; margin-top:-8px" @click="payProduct()">Pay</button>
                  </span>
                  <h3 class="panel-title">Checkout</h3>
                </div>

                <table class="table table-hover" id="dev-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(pro,idx) in product" :key="idx">
                      <td>{{idx + 1}}</td>
                      <td>{{pro.name}}</td>
                      <td>{{pro.qty_buy}}</td>
                      <td>{{pro.qty_buy*pro.price}}</td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
            <!-- End of Checkout Table -->

            <!-- Transaction Table -->
            <div class="row" v-if="token">
              <div class="panel panel-success">
                <div class="panel-heading">
                  <h3 class="panel-title">Transaction</h3>
                </div>

                <table class="table table-hover" id="dev-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(pro,idx) in transactions" :key="idx">
                      <td>{{idx + 1}}</td>
                      <td>{{pro.ProductId.name}}</td>
                      <td>{{pro.qty_buy}}</td>
                      <td>{{pro.qty_buy*pro.ProductId.price}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- End of Transaction Table -->

            <!-- Category Table -->
            <div class="row">
              <div class="panel panel-primary" id="category">
                <div class="panel-heading">
                  <h3 class="panel-title">Category
                    <span>
                      <button class="btn btn-info" v-if="role == 'admin' && token" style="float: right" data-toggle="modal" :data-target="'#addCategoryModal'">Add</button>
                    </span>
                  </h3>
                </div>
                <table class="table table-hover table-condensed" id="dev-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>List</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(category,idx) in categories" :key="idx" id="category-table">
                      <td>{{idx + 1}}</td>
                      <td>{{category.name}}</td>
                      <td>
                        <!-- <span v-if="token">
                          <button class="btn btn-success btn-sm" data-toggle="modal" :data-target="'#searchCategoryModal'+category._id">
                            <i class="fa fa-search"></i>
                          </button>
                        </span> -->
                        <span>
                          <button class="btn btn-info btn-sm" v-if="role == 'admin'" data-toggle="modal" :data-target="'#updateCategoryModal'+category._id">
                            <i class="fa fa-pencil"></i>
                          </button>
                        </span>
                        <span>
                          <button class="btn btn-danger btn-sm" v-if="role === 'admin'" data-toggle="modal" :data-target="'#deleteCategoryModal'+category._id">
                            <i class="fa fa-trash"></i>
                          </button>
                        </span>
                      </td>
                      <!-- Modal for Add Category -->
                      <div class="modal fade" :id="'addCategoryModal'" role="dialog">
                        <div class="modal-dialog">

                          <!-- Modal content-->
                          <div class="modal-content">
                            <div class="modal-header">
                              <button type="button" class="close" data-dismiss="modal">&times;</button>
                              <h4 class="modal-title">Add Category</h4>
                            </div>
                            <div class="modal-body">
                              <form class="form-horizontal">
                                <div class="form-group">
                                  <label for="disabledInput" class="col-sm-3 control-label">Category Name : </label>
                                  <div class="col-sm-9">
                                    <input v-model="category.name" class="form-control" id="disabledInput" type="text">
                                  </div>
                                </div>
                              </form>

                            </div>
                            <div class="modal-footer">
                              <a class="btn btn-success" style="float: right">
                                <span @click="addCategory(category)"> Add Category</span>
                              </a>
                              <button type="button" class="btn btn-default" style="float: left" data-dismiss="modal">Close</button>
                            </div>
                          </div>

                        </div>
                      </div>
                      <!-- End of Modal for Add Category -->

                      <!-- Modal for Update category -->
                      <div class="modal fade" :id="'updateCategoryModal'+category._id" role="dialog">
                        <div class="modal-dialog">

                          <!-- Modal content-->
                          <div class="modal-content">
                            <div class="modal-header">
                              <button type="button" class="close" data-dismiss="modal">&times;</button>
                              <h4 class="modal-title">Update This Category</h4>
                            </div>
                            <div class="modal-body">
                              <form class="form-horizontal">
                                <div class="form-group">
                                  <label for="disabledInput" class="col-sm-3 control-label">Name : </label>
                                  <div class="col-sm-9">
                                    <input class="form-control" id="disabledInput" type="text" v-model="category.name">
                                  </div>
                                </div>
                              </form>

                            </div>
                            <div class="modal-footer">
                              <a class="btn btn-info" style="float: right">
                                <span class="fa fa-pencil" @click.prevent="updateCategory(category)"> Update This Category</span>
                              </a>
                              <button type="button" class="btn btn-default" style="float: left" data-dismiss="modal">Close</button>
                            </div>
                          </div>

                        </div>
                      </div>
                      <!-- End of Modal for Update category -->

                      <!-- Modal for delete Category -->
                      <div class="modal fade" :id="'deleteCategoryModal'+category._id" role="dialog">
                        <div class="modal-dialog">

                          <!-- Modal content-->
                          <div class="modal-content">
                            <div class="modal-header">
                              <button type="button" class="close" data-dismiss="modal">&times;</button>
                              <h4 class="modal-title text-center">Are you sure want to delete this category ?</h4>
                            </div>
                            <div class="modal-body">
                            </div>
                            <div class="modal-footer">
                              <a class="btn btn-danger" style="float: right">
                                <span class="fa fa-trash" @click="deleteCategory(category)"> Confirm</span>
                              </a>
                              <button type="button" class="btn btn-default" style="float: left" data-dismiss="modal">Close</button>
                            </div>
                          </div>

                        </div>
                      </div>
                      <!-- End of Modal for Delete Category -->
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
            <!-- End of Category Table -->
          </div>

          <!-- Product Gallery -->
          <div class="col-md-8">
              <div class="row">
                <div class="col-md-4 col-xs-6" v-for="product in products" :key="product._id">
                  <div class="gallery-panel">
                    <div class="gallery-heading">
                      <div class="thumbnail">
                        <a href="#">
                          <img :src="product.imageURL">
                        </a>
                      </div>
                    </div>
                    <div class="gallery-body-title">
                      <div class="caption-name">
                        <p>{{ product.name }}</p>
                      </div>
                    </div>
                    <div class="gallery-body-title">
                      <div class="caption-category">
                        <p>Category: {{ product.category }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="gallery-body-detail">
                    <span>${{ product.price }}</span>
                    <div v-if="token">
                      <button class="btn btn-success btn-sm" v-if="role == 'user'" data-toggle="modal" :data-target="'#buyProductModal'+product._id">
                        <i class="fa fa-shopping-cart"></i>
                      </button>
                      <button class="btn btn-info btn-sm" v-if="role == 'admin'" data-toggle="modal" :data-target="'#updateProductModal'+product._id">
                        <i class="fa fa-pencil"></i>
                      </button>
                      <button class="btn btn-danger btn-sm" v-if="role === 'admin'" data-toggle="modal" :data-target="'#deleteProductModal'+product._id">
                        <i class="fa fa-trash"></i>
                      </button>
                    </div>
                  </div>



                  <!-- Modal for Buy Product -->
                  <div class="modal fade" :id="'buyProductModal'+product._id" role="dialog">
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
                  <!-- End of Modal for Buy Product -->

                  <!-- Modal for Update Product -->
                  <div class="modal fade" :id="'updateProductModal'+product._id" role="dialog">
                    <div class="modal-dialog">

                      <!-- Modal content-->
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal">&times;</button>
                          <h4 class="modal-title">Update This Product</h4>
                        </div>
                        <div class="modal-body">
                          <form class="form-horizontal">
                            <div class="form-group">
                              <label for="disabledInput" class="col-sm-3 control-label">Name : </label>
                              <div class="col-sm-9">
                                <input class="form-control" id="disabledInput" type="text" v-model="product.name">
                              </div>
                              <label for="disabledInput" class="col-sm-3 control-label">Price ($): </label>
                              <div class="col-sm-9">
                                <input class="form-control" id="disabledInput" type="text" v-model="product.price">
                              </div>
                              <label for="disabledInput" class="col-sm-3 control-label">Category: </label>
                              <div class="col-sm-9">
                                <input class="form-control" id="disabledInput" type="text" v-model="product.category">
                              </div>
                              <label for="disabledInput" class="col-sm-3 control-label">Stock: </label>
                              <div class="col-sm-9">
                                <input class="form-control" id="disabledInput" type="text" v-model="product.stock">
                              </div>
                              <label for="disabledInput" class="col-sm-3 control-label">imageURL: </label>
                              <div class="col-sm-9">
                                <input class="form-control" id="disabledInput" type="text" v-model="product.imageURL">
                              </div>
                              <img :src="product.imageURL" style="margin-left: 200px" height="150px">
                            </div>
                          </form>

                        </div>
                        <div class="modal-footer">
                          <a class="btn btn-info" style="float: right">
                            <span class="fa fa-pencil" @click.prevent="updateProduct(product)"> Update This Product</span>
                          </a>
                          <button type="button" class="btn btn-default" style="float: left" data-dismiss="modal">Close</button>
                        </div>
                      </div>

                    </div>
                  </div>
                  <!-- End of Modal for Update Product -->

                  <!-- Modal for Delete Product -->
                  <div class="modal fade" :id="'deleteProductModal'+product._id" role="dialog">
                    <div class="modal-dialog">

                      <!-- Modal content-->
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal">&times;</button>
                          <h4 class="modal-title text-center">Are you sure want to delete this product ?</h4>
                        </div>
                        <div class="modal-body">
                        </div>
                        <div class="modal-footer">
                          <a class="btn btn-danger" style="float: right">
                            <span class="fa fa-trash" @click="deleteProduct(product)"> Confirm</span>
                          </a>
                          <button type="button" class="btn btn-default" style="float: left" data-dismiss="modal">Close</button>
                        </div>
                      </div>

                    </div>
                  </div>
                  <!-- End of Modal for Delete Product -->

                </div>
              </div>
          </div>
          <!-- End of Product Gallery -->
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
        category: [],
        product: [],
        qty: 1,
        transactions: [],
        user: JSON.parse(localStorage.getItem('user'))
      }
    },
    computed: {
      users() {
        return this.$store.getters.users
      },
      role() {
        console.log('ROLE', this.$store.state.role);
        return this.$store.state.role
      },
      products() {
        return this.$store.getters.products
      },
      categories() {
        return this.$store.getters.categories
      },
      token() {
        return localStorage.getItem('tokenjwt')
      }
    },
    beforeCreate() {
      this.$store.dispatch('getUsers')
      this.$store.dispatch('getProduct')
      this.$store.dispatch('getCategory')
    },
    created() {
      this.startTransaction()
    },
    methods: {

      addCategory(category) {
        this.$store.dispatch('addCategory', category)
      },
      updateCategory(category) {
        this.$store.dispatch('updateCategory', category)
      },
      deleteCategory(category) {
        // console.log("category._id (methods) : ",category._id);
        this.$store.dispatch('deleteCategory', category)
      },

      startTransaction() {
        let self = this
        if (localStorage.getItem('tokenjwt') || this.token) {
          this.$axios('http://localhost:3000/api/transaction', {
              headers: {
                tokenjwt: localStorage.getItem('tokenjwt')
              }
            })
            .then(({
              data
            }) => {
              console.log(data);
              self.transactions = data
            })
            .catch(err => {
              console.error(err);
            })
        }
      },
      buyProduct(product) {
        let self = this
        let checkId = null
        this.product.map((e, i) => {
          if (e._id == product._id) {
            checkId = e._id
          }
          return e
        })
        if (checkId) {
          this.product = this.product.map((e, i) => {
            if (e._id == checkId) {
              e.qty_buy = e.qty_buy + self.qty
            }
            return e
          })

        } else {
          this.product.push({
            ...product,
            qty_buy: this.qty
          })
        }
        this.qty = 1
      },
      updateProduct(product) {
        this.$store.dispatch('updateProduct', product)
      },
      deleteProduct(product) {
        console.log("product (methods) : ", product);
        this.$store.dispatch('deleteProduct', product)
      },
      payProduct() {
        this.$axios.post('http://localhost:3000/api/transaction', {
            products: this.product
          }, {
            headers: {
              tokenjwt: localStorage.getItem('tokenjwt')
            }
          })
          .then(() => {
            this.product = []
            this.startTransaction()
          })
          .catch(err => {
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

  #category button {
    margin-top: -8px;
  }

  #category-table button {
    margin-top: 0px;
  }


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

  .gallery-body-title {
    text-align: center;
  }
  .caption-name {
    font-weight: bold;
  }

  .gallery-body-detail {
    background-color: #f4f4f4;
    height: 40px;
    padding: 0 0;
    margin-bottom: 20px;
    padding: 10px 10px;
    font-size: 1em;
  }

  .gallery-body-detail button {
    margin-top: -25px;
    margin-right: -10px;
    margin-left: 13px;
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
