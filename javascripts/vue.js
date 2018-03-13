let carousel_banner = [
  { imgUrl: './pictures/banners/g1-banner.jpg',
    class: 'carousel-item active'
  },
  { imgUrl: './pictures/banners/g2-banner.jpg',
    class: 'carousel-item'
  },
  {imgUrl: './pictures/banners/g3-banner.jpg',
    class: 'carousel-item'
  }
]

let promo_banners = [
  {
    imgUrl: './pictures/promo/promo_1.jpg'
  },
  {
    imgUrl: './pictures/promo/promo_1.jpg'
  },
]

let cakes = [
  {
    imgUrl: './pictures/cakes/thumb_1.jpg',
    title: 'Ombre Cake',
    price: '$50'
  },
  {
    imgUrl: './pictures/cakes/thumb_2.jpg',
    title: 'Korean Blossom',
    price: '$60'
  },
  {
    imgUrl: './pictures/cakes/thumb_3.jpg',
    title: 'Decorated Cupcake',
    price: '$15'
  },
  {
    imgUrl: './pictures/cakes/thumb_4.jpg',
    title: 'Special Cupcake',
    price: '$20'
  }
]

new Vue({
  el: '#vueApp',
  data: {
    title: 'CakePlaza',
    cart: [],
    carousel_banner: carousel_banner,
    promo_banners: promo_banners,
    cakes: cakes
  },
  computed: {
    cartSize : function() {
      return this.cart.length;
    },
    grandTotal: function() {
      let grandTotal = 0;
      this.cart.forEach(item => {
        let priceNum = Number(item.price.slice(1));
        let total = item.quantity * priceNum;
        grandTotal += total;
      })
      console.log(grandTotal);
      return grandTotal;
    }
  },
  methods: {
    addItem: function(title, price, url) {
      let newProduct = {
        title: title,
        price: price,
        imgUrl: url,
        quantity: 1
      };
      // console.log(newProduct);
      let search = this.cart.find(product => {
        return product.title === newProduct.title;
      })
      if (search === undefined) {
        this.cart.push(newProduct);
        console.log(this.cart);
        // console.log(this.cart[0]);
      } else {
        let index = this.cart.findIndex(data => {
          return data.title == newProduct.title
        });
        // console.log(index);
        this.cart[index].quantity += 1;
        console.log(this.cart);
      }
    },
    totalPrice: function(price, quantity) {
      let priceNum = Number(price.slice(1));
      let total = priceNum * quantity;
      return '$ '+ total;
    },
    cartAddItem: function(title) {
      let index = this.cart.findIndex(data => {
        return data.title == title
      });
      this.cart[index].quantity += 1;
    },
    cartRemoveItem: function(title) {
      let index = this.cart.findIndex(data => {
        return data.title == title
      });
      if (this.cart[index].quantity === 1) {
        if (!confirm('are you sure?')) {
          return
        }
      }
      this.cart[index].quantity -= 1;
      if (this.cart[index].quantity === 0) {
        this.cart.splice(index, 1);
      }
    },
    cartRemoveAll: function(title) {
      let index = this.cart.findIndex(data => {
        return data.title == title
      });
      this.cart.splice(index, 1);
    }
  }

})
