Vue.component(
    'component-table',
    {
        props:['itemlist'],
        template:
        `
        <section class="content">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <h1>Item List</h1>  
                    <div class="box box-warning">
                        <div class="box-body">
                            <table class="table table-bordered">
                               <tbody>
                                <tr>
                                    <th style="text-align:center;width:10px;">Item Name</th>
                                    <th style="text-align:center;width:10px;">Item Description</th>
                                    <th style="text-align:center;width:10px;">Item Picture</th>
                                    <th style="text-align:center;width:10px;">Item Category</th>
                                    <th style="text-align:center;width:10px">Item Price</th>                                    
                                    <th style="text-align:center;width:10px">Action</th>
                                </tr>
                                <tr v-for="item in itemlist">
                                        <td>{{item.name}}</td>
                                        <td>{{item.description}}</td>
                                        <td>
                                        <img :src=item.picture height="100" width="100">
                                        </td>
                                        <td>{{item.category}}</td>
                                        <td>{{item.price}}</td>                                                                                                                        
                                        <td>
                                            <button v-on:click="deleteItem(item._id)">Delete</button>
                                        </td>
                                </tr>
                               </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `,
        data : function() {
            return {
                
            }
        },
        methods : {
            deleteItem: function(id) {
                axios.delete(`http://localhost:3000/api/items/${id}`, {})
                .then((response) => {
                    alert('item deleted !')
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }

    }
)