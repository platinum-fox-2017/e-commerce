// let carousel_banner = [
//   { imgUrl: './pictures/banners/g1-banner.jpg',
//     class: 'carousel-item active'
//   },
//   { imgUrl: './pictures/banners/g2-banner.jpg',
//     class: 'carousel-item'
//   },
//   {imgUrl: './pictures/banners/g3-banner.jpg',
//     class: 'carousel-item'
//   }
// ]
//
// let promo_banners = [
//   {
//     imgUrl: './pictures/promo/promo_1.jpg'
//   },
//   {
//     imgUrl: './pictures/promo/promo_1.jpg'
//   },
// ]
//
// let cakes = [
//   {
//     imgUrl: './pictures/cakes/thumb_1.jpg',
//     title: 'Ombre Cake',
//     price: 50
//   },
//   {
//     imgUrl: './pictures/cakes/thumb_2.jpg',
//     title: 'Korean Blossom',
//     price: 60
//   },
//   {
//     imgUrl: './pictures/cakes/thumb_3.jpg',
//     title: 'Decorated Cupcake',
//     price: 15
//   },
//   {
//     imgUrl: './pictures/cakes/thumb_4.jpg',
//     title: 'Special Cupcake',
//     price: 20
//   }
// ]

let bannerUrl = 'http://ecommerce-server.teddydevstack.com/admin/carousel';
let promoUrl = 'http://ecommerce-server.teddydevstack.com/admin/promo';
let cakeUrl = 'http://ecommerce-server.teddydevstack.com/admin/cakes';

let carousel_data, promo_data, cake_data;

Vue.component('carousel-comp', {
  template: `

  <div class="container-fluid bg-light full-width bottom-border">
    <div id="item-of-the-day" class="carousel slide margin-0" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#item-of-the-day" data-slide-to="0" class="active"></li>
        <li data-target="#item-of-the-day" data-slide-to="1"></li>
        <li data-target="#item-of-the-day" data-slide-to="2"></li>
      </ol>
        <div class="carousel-inner">
          <div v-bind:class="banner.class" v-for='banner in banners' >
            <img class="d-block w-100 bg-carousel" v-bind:src="banner.imgUrl" alt="First slide">
          </div>
        </div>
      <a class="carousel-control-prev" href="#item-of-the-day" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#item-of-the-day" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>

  `,
  props:['banners'],
  data: function() {
    return {
      data: ''
    }
  }
})

Vue.component('promo-comp', {
  template: `

  <div class="container-fluid full-width bottom-border flexbox flex-direct">
    <div class="container-fluid margin-vert-30px flexbox  justify-around align-items" v-for='p_banner in promos'>
      <img class=" margin-side-10px  img-fluid " width="490px" height="280px" v-bind:src="p_banner.imgUrl" alt="placeholder1">
    </div>
  </div>
  `,
  props:['promos'],
  data: function() {
    return {
      promo_banners: promo_banners
    }
  }
})

Vue.component('product-comp', {
  template: `

  <div class="container-fluid bg-white margin-vert-30px padding-bottom-30px bottom-border ">
    <div class=" row flex-simple margin-side-30px">
      <div class="card card-width margin-vert-15px flex-items" v-for='cake in products' >
        <img class="card-img-top img-fluid" v-bind:src="cake.imgUrl" alt="Card image cap">
        <div class="card-body padding-vert-4px">
          <div class="row">
            <div class="col-sm-8">
              <h5 class="card-title margin-vert-3px font-1rem">{{cake.title}}</h5>
              <h5 class="card-title margin-vert-3px font-1rem">$ {{cake.price}}</h5>
            </div>
            <div class="col-sm-4 flexbox justify align-items">
              <button class="btn btn-success" type="button" name="button" v-on:click='addItem(cake.title, cake.price, cake.imgUrl)'>Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  `,
  props:['products'],

  methods: {
    addItem: function(title, price, url) {
      let newProduct = {
        title: title,
        price: price,
        imgUrl: url,
        quantity: 1
      };
      this.$emit('order', newProduct)

    }
  },
  data: function() {
    return {
      cakes: cakes
    }
  }
})

Vue.component('modal', {
  template: `
  <div class="modal-body flexbox justify align-items flex-col">

    <!-- card #1 -->
    <div class="card width" style="width: 100%;" v-for='item in cart'>
      <img class="img-fluid" v-bind:src="item.imgUrl" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{item.title}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">$ {{item.price}} - {{item.quantity}} Total: {{totalPrice(item.price, item.quantity)}}</h6>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <button class="btn btn-secondary" type="button" name="button" v-on:click='cartRemoveItem(item.title)'>-</button>
        <button class="btn btn-secondary" type="button" name="button" v-on:click='cartAddItem(item.title)'>+</button>
        <button class="btn btn-danger" type="button" name="button" v-on:click='cartRemoveAll(item.title)'>Remove all</button>
      </div>
    </div>
    <!-- grand total -->
    <div class="card width" style="width: 100%;">
      <div class="card-body">
        <h5 class="card-title">Grand Total $ {{grandTotal}}</h5>
      </div>
    </div>

  </div>


  `,
  props:['cart'],
  computed: {
    cartSize : function() {
      return this.cart.length;
    },
    grandTotal: function() {
      let grandTotal = 0;
      this.cart.forEach(item => {
        let priceNum = Number(item.price);
        let total = item.quantity * priceNum;
        grandTotal += total;
      })
      return grandTotal;
    }
  },
  methods: {
    totalPrice: function(price, quantity) {
      let priceNum = Number(price );
      let total = priceNum * quantity;
      return '$ '+ total;
    },
    cartAddItem: function(title) {
      this.$emit('add', title)
    },
    cartRemoveItem: function(title) {
      this.$emit('reduce', title)
    },
    cartRemoveAll: function(title) {
      this.$emit('remove', title)
    }
  },
  data: function() {
    return {
      cakes: cakes
    }
  }
})


function getCarousel() {
  return axios.get(bannerUrl);
}
function getPromo() {
  return axios.get(promoUrl);
}
function getCakes() {
  return axios.get(cakeUrl);
}

axios.all([getCarousel(),getPromo(),getCakes()])
  .then(axios.spread(function (carousel, promo, cakes){
    carousel_data = carousel.data.data;
    promo_data = promo.data.data;
    cake_data = cakes.data.data;
    console.log(carousel_data);
    console.log(promo_data);
    console.log(cake_data);

    new Vue({
      el: '#vueApp',
      data: {
        title: 'CakePlaza',
        cart: [],
        carousel_banner: carousel_data,
        promo_banners: promo_data,
        cakes: cake_data
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
        handleorder: function(ordering) {
          let newProduct = ordering
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
        onAddItem: function(title) {
          let index = this.cart.findIndex(data => {
            return data.title == title
          });
          this.cart[index].quantity += 1;
        },
        onRemoveItem: function(title) {
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
        onRemoveAll: function(title) {
          if (!confirm('are you sure?')) {
            return
          }
          let index = this.cart.findIndex(data => {
            return data.title == title
          });
          this.cart.splice(index, 1);
        }
      }

    })

  }))
