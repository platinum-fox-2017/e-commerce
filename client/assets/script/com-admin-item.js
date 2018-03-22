Vue.component('admin-item',{
    template:`
    <div>
    <div class="clearfix">
        <button class="btn btn-primary float-right" data-toggle="modal" data-target="#modalAddItem"><span class="fa fa-plus">Add Product</span></button>
    </div>
    <div class="row">
    <div class="col-sm-3 bg-success">
            <p>Lorem ipsum...</p>
    </div>
    <div class="col-sm-9">
    <table class="table table-striped">
        <thead>
            <th>Name</th>
            <th>price</th>
            <th>stock</th>
            <th>Action</th>
        </thead>
        <tbody>
            <tr v-for="item in items">
                <td>{{item.name}}</td>
                <td>{{item.price}}</td>
                <td>{{item.stock}}</td>
                <td>
                    <button class="btn btn-info">
                        <span class="fa fa-pencil-square-o"></span>
                    </button>
                    <button class="btn btn-danger" @click="remove(item._id)">
                        <span class="fa fa-trash"></span>
                    </button>
                </td>
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
                        <input type="text" id="name" name="name" class="form-control validate" v-model="name">
                    </div>
                    <div class="md-form mb-3">
                        <label for="defaultForm-price">Price</label>                       
                        <input type="text" id="price" name="price" class="form-control validate" v-model="price">
                    </div>
                    <div class="md-form mb-3">
                        <label for="defaultForm-stock">Stock</label>                       
                        <input type="text" id="stock" name="stock" class="form-control validate" v-model="stock">
                    </div>
                    <div class="md-form mb-3">
                        <label for="defaultForm-stock">Image</label>                       
                        <input type="file" id="image" name="image" class="form-control validate" accept="image/*">
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button class="btn btn-primary" @click="addItem()">Add Product</button>
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
            stock:''
        }
    },
    methods:{
        currencyFormat: function (price) {
            return price.toLocaleString()
        },
        remove: function (id) {
            this.$emit('remove', id);
        },
        addItem:function(){
            this.$emit('add')
        }
       
    }
})