Vue.config.devtools = true

new Vue({
  el: '#app',
  data: {
    products: [],
    formData: new FormData(),
    file: null
  },
  methods: {
    showadd: function () {
      $('#add-modal').addClass('active')
    },
    closeadd () {
      $('#add-modal').removeClass('active')
    },
    showUpdate: function () {
      $('#update-modal').addClass('active')
    },
    closeUpdate: function () {
      $('#update-modal').removeClass('active')
      $('#name').val('')
      $('#type').val('')
      +$('#price').val('')
      +$('#stock').val('')
      $('#description').val('')
      localStorage.removeItem('update-id')
    },
    deleteItem: function (id) {
      let index = this.products.map(product => product._id).indexOf(id)
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this record",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          $http.delete(`/item/${id}`)
            .then(response => {
              this.products.splice(index, 1)
              swal("Your file has been deleted", {
                icon: "success",
              });
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          swal("Your record file is safe!");
        }
      });
    },
    triggerUpdate: function (id) {
      let index = this.products.map(product => product._id).indexOf(id)
      console.log(this.products[index])
      $('#name').val(this.products[index].name)
      $('#type').val(this.products[index].type)
      +$('#price').val(this.products[index].price)
      +$('#stock').val(this.products[index].stock)
      $('#description').val(this.products[index].description)
      localStorage.setItem('update-id', this.products[index]._id)
      this.showUpdate()
    },
    takefile: function (event) {
      this.file = event.target.files[0]
    },
    updateItem: function () {
      let id = localStorage.getItem('update-id')
      let name = $('#name').val()
      let type = $('#type').val()
      let category = $('.form-select').val()
      let price = +$('#price').val()
      let stock = +$('#stock').val()
      let description = $('#description').val()

      this.formData.append('name', name)
      this.formData.append('type', type)
      this.formData.append('price', price)
      this.formData.append('category', category)
      this.formData.append('stock', stock)
      this.formData.append('description', description)
      this.formData.append('image', this.file)

      $http.post(`/item/${id}`, this.formData)
        .then(response => {
          localStorage.removeItem('update-id')
          this.closeUpdate()
          swal("Item updated!", `Your item has been updated to our database`);
          setTimeout(function (){
            window.location.reload()
          },2500)
        })
        .catch(error => {
          console.log(error)
          this.closeUpdate()
        })
    },
    createItem: function () {
      let name = $('#addname').val()
      let type = $('#addtype').val()
      let category = $('.addform-select').val()
      let price = +$('#addprice').val()
      let stock = +$('#addstock').val()
      let description = $('#adddescription').val()

      this.formData.append('name', name)
      this.formData.append('type', type)
      this.formData.append('price', price)
      this.formData.append('category', category)
      this.formData.append('stock', stock)
      this.formData.append('description', description)
      this.formData.append('image', this.file)
      $http.post('/item', this.formData)
        .then(response => {
          console.log(response)
          this.closeadd()
          swal("Item added!", `Your '${name}' type: '${type}' has been added to our database`);
          setTimeout(function (){
            window.location.reload()
          },3000)
        })
        .catch(error => {
          console.log(error)
          this.closeadd()
        })
    },
  },
  computed: {
    itemlist: function () { 
      return this.products
    }
  },
  created(){
    $http.get('/item')
      .then(response => {
        this.products.push(...response.data.items)
      })
      .catch(error => {
        console.log(error)
      })
  }
})
