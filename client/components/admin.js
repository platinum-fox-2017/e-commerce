Vue.component('admin', {
  props: ['categories'],
  template: `
  <form class="container">
    <div class="form-group row">
      <label for="title" class="col-sm-2 col-form-label">Title</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="title" placeholder="Title">
      </div>
      {{title}}
    </div>
    <div class="form-group row">
      <label for="descripiton" class="col-sm-2 col-form-label">Description</label>
      <div class="col-sm-10">
        <textarea type="text" class="form-control" id="descripiton" placeholder="Description"></textarea>
      </div>
    </div>
    <div class="form-group row">
        <label for="category" class="col-sm-2 col-form-label">Category</label>
        <div class="col-sm-10">
            <select id="category" class="form-control" v-for="category in categories">
                <option value="-1">Select Category</option>
                <option :value="category._id">{{ category.name }}</option>
            </select>
        </div>
    </div>
    <div class="form-group row">
        <label for="image" class="col-sm-2 col-form-label">Image</label>
        <div class="col-sm-10">
            <input type="file" class="form-control-file" id="image">
        </div>
    </div>
    <div class="form-group row">
        <label for="price" class="col-sm-2 col-form-label">Price</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="price" placeholder="Price">
        </div>
      </div>
      <div class="form-group row">
        <label for="stock" class="col-sm-2 col-form-label">Stock</label>
        <div class="col-sm-10">
          <input type="number" class="form-control" id="stock" placeholder="Stock">
        </div>
      </div>
    
    <div class="form-group row">
      <div class="col-sm-10">
        <button class="btn btn-primary" @click="submit()">Submit</button>
      </div>
    </div>
  </form>
  `,
  data() {
    return {
      title: '',
    };
  },
  methods: {
    submit() {
      const formData = new FormData();

      formData.append('title', document.querySelector('#title').value);
      formData.append('descripiton', document.querySelector('#descripiton').value);
      formData.append('category', document.querySelector('#category').value);
      formData.append('image', document.querySelector('#image').files[0]);
      formData.append('price', document.querySelector('#price').value);
      formData.append('stock', document.querySelector('#stock').value);
      
      for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]);
      }

      request.post('items/', formData)
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
    }
  }
});