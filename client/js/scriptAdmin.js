// if (!localStorage.) {
//
// }



new Vue({
  el: '#vue-app',
  data: {
    title: '',
    message: '',
    price: '',
    img: ''
  },
  methods: {
    addItem: function () {
      alert('success add item to shop')
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/item',
        data: {
          name: this.title,
          description: this.message,
          price: this.price,
          image: this.img
        }
      }).then(data_item => {
        console.log(data_item);
      })
    }
  }
})
