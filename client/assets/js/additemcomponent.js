Vue.component('additems',{
  template:`
  <form>
    <input class="form-control" type="text" placeholder="title" v-model='title' style="margin-bottom:10px;">
    <input class="form-control" type="text" placeholder="Descripsi" v-model='descripsi' style="margin-bottom:10px;">
    <div class="form-group">
      <input type="file" name="image" class="form-control-file" id="image">
    </div>
    <div class="form-group">
      <label for="harga">Masukan harga</label>
      <input class="form-control" name="harga" type="number" v-model='harga' style="margin-bottom:10px; width:30%">
    </div>
    <div class="form-group">
    <label for="stock">Masukan stock</label>
      <input class="form-control" type="number" name="stock" v-model='stock' style="margin-bottom:10px; width:20%">
    </div>
    <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="additem()">Add items</button>
  </form>`,
  data:function(){
    return{
      title:'',
      descripsi:'',
      harga:0,
      stock:0
    }
  },
  methods :{
    additem:function(){
      const fileInput = document.querySelector( '#image' );
      const formData = new FormData();
        formData.append( 'picture', fileInput.files[0]);
        formData.append( 'title', this.title);
        formData.append( 'descripsi', this.descripsi);
        formData.append( 'harga', this.harga);
        formData.append( 'stock', this.stock);
        axios.post(`http://localhost:3000/additems/`,
          formData)
          .then(response =>{
            console.log(response);
          })
          .catch(err => {
            console.log(err)
          })

      // this.$emit('tambahitem',{
      //   title:this.title,
      //   descripsi:this.descripsi,
      //   harga:this.harga,
      //   stock:this.stock,
      //   picture:fileInput.files[0]
      // })
    }
  }
})
