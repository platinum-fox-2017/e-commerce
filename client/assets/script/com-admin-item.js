Vue.component('admin-item',{
    template:`
    <div>
    <div class="clearfix">
        <button class="btn btn-primary float-right" data-toggle="modal" data-target="#modalAddItem"><span class="fa fa-plus">Add Product</span></button>
    </div>
    <div class="row">
    <div class="col-sm-12">
    <table class="table table-striped">
        <thead>
            <th>Name</th>
            <th>price</th>
            <th>stock</th>
            <th>Action</th>
        </thead>
        <tbody>
            <tr v-for="item in items">
                <td>
                <img :src="item.image" class="img-responsive" style="width:50px;" > 
                {{item.name}}
                </td>
                <td>{{item.price}}</td>
                <td>{{item.stock}}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" :data-target="'#exampleModal'+item._id">
                        <span class="fa fa-pencil-square-o"></span>
                    </button>
                    <button class="btn btn-danger" @click="remove(item._id)">
                        <span class="fa fa-trash"></span>
                    </button>
                </td>
                <div class="modal fade" :id="'exampleModal'+item._id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header text-center">
                                <h4 class="modal-title w-100 font-weight-bold">Edit Product</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body mx-3">
                                <div class="md-form mb-3">
                                    <label for="defaultForm-name">Name</label>                       
                                    <input type="text" id="name" name="name" class="form-control validate" v-model="item.name" @input="onInputName">
                                </div>
                                <div class="md-form mb-3">
                                    <label for="defaultForm-price">Price</label>                       
                                    <input type="text" id="price" name="price" class="form-control validate" v-model="item.price" @input="onInputPrice">
                                </div>
                                <div class="md-form mb-3">
                                    <label for="defaultForm-stock">Stock</label>                       
                                    <input type="text" id="stock" name="stock" class="form-control validate" v-model="item.stock" @input="onInputStock">
                                </div>
                                <div class="md-form mb-3">
                                    <label for="defaultForm-stock">Image</label>                       
                                    <input type="file" id="image" name="image" @change="getFile" class="form-control validate" accept="image/*">
                                </div>
                            </div>
                            <div class="modal-footer d-flex justify-content-center">
                                <button class="btn btn-primary" @click="editItem(item._id)">Edit Product</button>
                            </div>
                        </div>
                    </div>
                    </div>
            </tr>
        </tbody>
    </table>
    </div>
    </div>

    <div class="modal fade" id="modalAddItem" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header text-center">
                    <h4 class="modal-title w-100 font-weight-bold">Add Product</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body mx-3">
                    <div class="md-form mb-3">
                        <label for="defaultForm-name">Name</label>                       
                        <input type="text" id="name" name="name" class="form-control validate" v-model="name" @input="onInputName">
                    </div>
                    <div class="md-form mb-3">
                        <label for="defaultForm-price">Price</label>                       
                        <input type="text" id="price" name="price" class="form-control validate" v-model="price" @input="onInputPrice">
                    </div>
                    <div class="md-form mb-3">
                        <label for="defaultForm-stock">Stock</label>                       
                        <input type="text" id="stock" name="stock" class="form-control validate" v-model="stock" @input="onInputStock">
                    </div>
                    <div class="md-form mb-3">
                        <label for="defaultForm-stock">Image</label>                       
                        <input type="file" id="image" name="image" @change="getFile" class="form-control validate" accept="image/*">
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button class="btn btn-primary" @click="addItem" data-dismiss="modal">Add Product</button>
                </div>
            </div>
    </div>
    </div>
    </div>
    `,
    props:['items'],
    data() {
        return {
            name: '',
            price: '',
            stock: '',
            formData : new FormData(),
            file: null
        }
    },
    methods:{
        getFile : function(event){
            console.log(this)
            this.file = event.target.files[0];
        },
        onInputName:function(event){
            this.name = event.target.value
            this.$emit('paylodname', event.target.value)
        },
        onInputPrice:function(event){
            this.price = event.target.value
            this.$emit('payloadprice', event.target.value)
        },
        onInputStock:function(event){
            this.stock= event.target.value
            this.$emit('payloadstock', event.target.value)
        },
        currencyFormat: function (price) {
            return price.toLocaleString()
        },
        remove: function (id) {
            this.$emit('remove', id);
        },
        addItem:function(){
                this.formData.append('name', this.name)
                this.formData.append('price', this.price)
                this.formData.append('stock', this.stock)
                this.formData.append('avatar', this.file)
          
                axios.post('http://ecommerce-server.srohimah.com/product', this.formData)
                  .then(response => {
                    console.log(response)
                  }).catch(err => {
                    console.log(err.response)
                  })
                //   this.$emit('additem')
        },
        editItem:function(id){
            this.$emit('edit', id)
        }
       
    }
})