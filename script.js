var app = new Vue({
  el: '.app',
  data: {
    total: 0,
    totalPrice: 0,
    itemsList: [],
    itemsCart: [],
    prevStock: [],
    search: '',
    newItem: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      filename: ''
    },
    formData: new FormData(),
    file: null,
    tes: true,
    editItem: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      imageUrl: '',
      editImage: false,
    },
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    upload: function() {
      let self = this
      if(this.file) {
        this.formData.set('item', this.file[0])
        this.formData.set('name', this.newItem.name);
        this.formData.set('description', this.newItem.description);
        this.formData.set('price', this.newItem.price);
        this.formData.set('stock', this.newItem.stock);
        axios({
            method: 'post',
            url: 'http://faduino.server.fadhilmch.com/items/upload',
            data: this.formData,
            config: {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          })
          .then(function(response) {
            // console.log(self.itemsList)
            console.log(response)
            $('#addProductModal').modal('hide');
            self.fetchData();
            // self.itemsList.push(response.data.data);
            console.log("finished upload")
          })
          .catch(function(response) {
            console.log(response);
          });
      }
    },
    fetchData: function () {
      axios.get('http://faduino.server.fadhilmch.com/items')
        .then(response => {
          this.itemsList = response.data.data;
          this.prevStock = this.itemsList.map(val => val.stock);
          console.log(this.itemsList)
          console.log(`Previous Stock: ${this.prevStock}`)
        })
        .catch(err => {
          console.log("Error : " + err);
        })
    },
    addEditProduct: function(id) {
      let index = this.itemsList.map(val => val._id).indexOf(id);
      this.editItem.name = this.itemsList[index].name;
      this.editItem.description = this.itemsList[index].description;
      this.editItem.price = this.itemsList[index].price;
      this.editItem.stock = this.itemsList[index].stock;
      this.editItem.imageUrl = this.itemsList[index].imageUrl;
    },
    pricePrint: function(price) {
      return `$${price.toFixed(2)}`;
    },
    calculateTotal: function(price, quant) {
      return price * quant;
    },
    setSubtotal: function(_id, quantity) {
      // this.updateStock({
      //   id: _id,
      //   quantity: quantity
      // });
      let index = this.itemsCart.map(val => val._id).indexOf(_id);
      this.itemsCart[index].subtotal = Number(quantity) * Number(this.itemsCart[index].price);
      return this.itemsCart[index].subtotal;
    },
    updateStock: function(obj) {
      let _id = obj.id;
      let quantity = obj.quantity;
      let indexStock = this.itemsList.map(val => val._id).indexOf(_id);
      console.log(quantity)
      this.itemsList[indexStock].stock = this.prevStock[indexStock] - quantity;
      console.log(`Stock: ${this.itemsList[indexStock].stock} Name: ${this.itemsList[indexStock].name}`)

    },
    addToCart: function(obj) {
      console.log(obj)
      let index = this.itemsCart.map(val => val._id).indexOf(obj._id);
      let indexStock = this.itemsList.map(val => val._id).indexOf(obj._id);

      if (index == -1) {
        this.itemsCart.push({
          _id: obj._id,
          name: obj.name,
          description: obj.description,
          price: obj.price,
          quantity: 1,
          imageUrl: obj.imageUrl,
          subtotal: obj.quantity * obj.price
        });
      } else {
        this.itemsCart[index].quantity++;
        this.itemsCart[index].subtotal = this.itemsCart[index].quantity * this.itemsCart[index].price;
      }
      this.updateStock({
        id: obj._id,
        quantity: 1
      });
      console.log(this.itemsList[indexStock].stock)
      this.itemsList[indexStock].stock--;
    },
    setTotalPrice: function() {
      this.totalPrice = this.itemsCart.reduce((tot, val) => {
        return tot + Number(val.subtotal);
      }, 0)
      return this.totalPrice;
    },
    getTotalItems: function() {
      this.total = this.itemsCart.reduce((tot, val) => {
        return tot + Number(val.quantity);
      }, 0)
      return this.total;
    },
    reupdateStock: function() {
      this.prevStock = this.itemsList.map(val => val.stock);
      this.itemsCart = [];
    },
    findStock: function(_id) {
      let indexStock = this.itemsList.map(val => val._id).indexOf(_id);
      return this.prevStock[indexStock];
    },
    deleteFromCart(_id) {
      let index = this.itemsCart.map(val => val._id).indexOf(_id);
      this.itemsCart.splice(index, 1);
      this.updateStock({
        id: _id,
        quantity: 0
      });
    },
    initNavbarScrolled: function() {
      $(document).bind('scroll', function() {
        var navbar = $('.global-nav');
        if ($(document).scrollTop() >= 100) {
          $('#global-nav').addClass('scrolled-nav');
          $("#title-image").attr("src", "Assets/arduino logo only white.png");
        } else {
          $('#global-nav').removeClass('scrolled-nav');
          $("#title-image").attr("src", "Assets/arudinoLogo White.png");
        }
      }.bind(this));
    },
    fileSelectHandler: function(event) {
      this.fileDragHover(event);
      this.file = event.target.files || event.dataTransfer.files;
      console.log(`ini event: ${(this.file[0])} - ${(this.formData)}`);
      console.log(this.file);
      console.log(this.formData);
      this.newItem.filename = this.file[0].name;
      if (this.file[0]) {
        console.log('readerrr')
        let reader = new FileReader();
        console.log(reader)
        reader.onload = function(e) {
          $('#previewImage').attr('src', e.target.result);
        }
        reader.readAsDataURL(this.file[0]);
      }
    },
    fileDragHover: function() {
      event.stopPropagation();
      event.preventDefault();
      event.target.className = (event.type == "dragover" ? "hover" : "");
    },
    deleteItem: function(id) {
      axios({
        method: 'delete',
        url: `http://faduino.server.fadhilmch.com/items/${id}`
      }).then(data => {
        console.log('succeed delete')
        let indexDelete = this.itemsList.map(val => val._id).indexOf(id);
        console.log(indexDelete)
        console.log(this.itemsList[indexDelete])
        this.itemsList.splice(indexDelete, 1);
      }).catch(err => {
        console.log('error delete data')
      })
    },

  },
  computed: {
    filteredItems: function() {
      var regex = new RegExp(this.search, "ig");
      return this.itemsList.filter(itemList => {
        // console.log(regex.test(itemList.name))
        return regex.test(itemList.name);
      });
    },
    fileExist: function() {
      console.log('ini file exist')
      console.log(this.file)
      if (this.file == null)
        return '';
      return 'file-there';
    }
  },
  watch: {

  },
  mounted: function() {
    this.$nextTick(function() {
      this.initNavbarScrolled();
    });
    document.addEventListener('drop', (e) => {
      e.preventDefault();
      this.fileSelectHandler(e);
      console.log('ada drop')
    })
  }

})
