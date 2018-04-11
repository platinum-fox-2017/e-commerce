Vue.component(
    'form-insert',
    {
        props : ['datausertoinsert'],
        template:
        `
        <section class="content">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="box box-warning">
                        <div class="box-body">
                            <h1 class="col-md-8 col-md-offset-4">Add New Item</h1>

                            <div class="form-group col-md-8 col-md-offset-2">
                                <label>Item Name</label>
                                <input type="text" v-model="objItem.name" class="form-control" placeholder="Item name...">
                            </div>

                            <div class="form-group col-md-8 col-md-offset-2">
                                <label>Item Description</label>
                                <input type="text" v-model="objItem.description" class="form-control" placeholder="A bit of description ...">
                            </div>

                            <div class="form-group col-md-8 col-md-offset-2">
                                <label>Item Picture</label>
                                <input @change="fileSelectHandler" type="file" class="form-control">
                            </div>

                            <div class="form-group col-md-8 col-md-offset-2">
                                <label>Item Price</label>
                                <input type="number" v-model="objItem.price" class="form-control" min=0>
                            </div>

                            <div class="form-group col-md-8 col-md-offset-2">
                                <label>Category</label>
                                <select class="form-control" v-model="objItem.category">
                                    <option disabled value="">Please select one</option>
                                    <option>Shoes</option>
                                    <option>Jersey</option>
                                    <option>Accessories</option>
                                </select>
                            </div>
                            
                            <div class="form-group col-md-8 col-md-offset-2">
                                <button type="submit" class="btn btn-primary" v-on:click="upload()">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `,
        methods: {
            fileSelectHandler: function(event) {
                this.file = event.target.files || event.dataTransfer.files;
            },
            upload: function () {
                this.formData.set('itemphoto', this.file[0])
                this.formData.set('name', this.objItem.name);
                this.formData.set('description', this.objItem.description);
                this.formData.set('price', this.objItem.price);                
                this.formData.set('category', this.objItem.category);                

                axios({
                    method: 'post',
                    url: 'http://localhost:3000/api/items',
                    data: this.formData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then(function (response) {
                    alert('saved !')
                })
                .catch(function (response) {
                    alert('terjadi kesalahan')
                    console.log(response);
                });
            },
        },
        data: function () {
            return {
                objItem: {
                    name: ``,
                    description: ``,
                    price: ``,
                    category:``
                },
                formData : new FormData(),
                file : null
            }
        }
    }
)