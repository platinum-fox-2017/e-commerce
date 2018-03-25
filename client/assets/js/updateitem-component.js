var updateitem = Vue.component('updateitem', {
  template:`
  <div class="modal" id="update-modal">
        <a href="#close" class="modal-overlay" aria-label="Close" @click="closeUpdate"></a>
        <div class="modal-container">
          <div class="modal-header">
            <a href="#close" class="btn btn-clear float-right" aria-label="Close" @click="closeUpdate"></a>
            <div class="modal-title h5">Item Form</div>
          </div>
          <div class="modal-body">
            <div class="content">
              <!-- content here -->
              <form class="form-horizontal">
                  <div class="form-group">
                    <div class="col-3 col-sm-12">
                      <label class="form-label" for="name">Name</label>
                    </div>
                    <div class="col-9 col-sm-12">
                      <input class="form-input" type="text" id="name" placeholder="Name">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-3 col-sm-12">
                      <label class="form-label" for="category">Category</label>
                    </div>
                    <div class="col-9 col-sm-12">
                      <select class="form-select">
                          <option>Camera</option>
                          <option>Instant Film</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-3 col-sm-12">
                      <label class="form-label" for="input-example-1">Type</label>
                    </div>
                    <div class="col-9 col-sm-12">
                      <input class="form-input" type="text" id="type" placeholder="Type">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-3 col-sm-12">
                      <label class="form-label" for="price">Price</label>
                    </div>
                    <div class="col-9 col-sm-12">
                      <input class="form-input" type="text" id="price" placeholder="Price">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-3 col-sm-12">
                      <label class="form-label" for="stock">Stock</label>
                    </div>
                    <div class="col-9 col-sm-12">
                      <input class="form-input" type="text" id="stock" placeholder="Stock">
                    </div>
                  </div>
                  <div class="form-group">  
                    <div class="col-3 col-sm-12">
                      <label class="form-label" for="image-url">Image</label>
                    </div>
                    <div class="col-9 col-sm-12">
                      <input class="form-input" type="file" id="image-url" @change='takefile' placeholder="Image">
                    </div>
                  </div>
                  <div class="form-group">  
                    <label class="form-label" for="description">Description</label>
                    <textarea class="form-input" id="description" placeholder="Textarea" rows="3"></textarea>
                  </div>
                </form>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-error" @click="closeUpdate">Cancel</button>
            <button class="btn btn-success" @click="updateItem">Update</button>
          </div>
        </div>
    </div>
  `,
  props: ['closeUpdate', 'updateItem', 'takefile']
})