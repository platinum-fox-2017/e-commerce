let localhostAddress = 'http://localhost:3000/admin/'
let deploy = 'http://ecommerce-server.teddydevstack.com/admin/'
let baseAxios = axios.create({
  baseURL: deploy
})

Vue.component('forms', {
  template: `

  <div class="container-fluid  margin-top-md">
    <div class="row my-4 mx-4">
      <div class="col-md-4">
        <h1 class="h3 mb-3 font-weight-normal">Carousel Banner</h1>
        <form v-on:submit.prevent="uploadCarousel">
          <div class="form-group">
            <label for="class">Class</label>
            <input v-model="carouselClass" type="text" class="form-control" id="class" aria-describedby="classHelp" placeholder="Enter bootstrap class">
            <small id="classHelp" class="form-text text-muted">enter class for bootstrap carousel</small>
          </div>
          <div class="form-group">
            <label for="carousel-img">image file for carousel</label>
            <input v-on:change="onFilechangeCarousel" type="file" class="form-control-file" id="carousel-img">
          </div>
        <button type="submit" class="btn btn-primary" v-on:click="uploadCakes">Submit</button>
        </form>
      </div>
      <div class="col-md-4">
        <h1 class="h3 mb-3 font-weight-normal">Promo Banner</h1>
        <form v-on:submit.prevent="uploadPromo">
          <div class="form-group">
            <label for="promo-img">image file for Promo banner</label>
            <input v-on:change="onFilechangePromo" type="file" class="form-control-file" id="promo-img">
          </div>
        <button type="submit" class="btn btn-primary" v-on:click="uploadPromo">Submit</button>
        </form>
      </div>
      <div class="col-md-4">
        <h1 class="h3 mb-3 font-weight-normal">Cake Data</h1>
        <form  v-on:submit.prevent="uploadCakes">
          <div class="form-group">
            <label for="cakes">Cakes</label>
            <input v-model="cakesTitle" type="text" class="form-control" id="cakes" aria-describedby="cakeHelp" placeholder="Enter title for cakes">
            <small id="cakeHelp" class="form-text text-muted">enter product name</small>
          </div>
          <div class="form-group">
            <label for="price">Price</label>
            <input v-model="cakesPrice" type="number" class="form-control" id="price" aria-describedby="priceHelp" placeholder="Price...">
            <small id="priceHelp" class="form-text text-muted">enter product price</small>
          </div>
          <div class="form-group">
            <label for="cakes-img">image file for cakes</label>
            <input v-on:change="onFilechangeCakes" type="file" class="form-control-file" id="cakes-img">
          </div>
        <button type="submit" class="btn btn-primary" v-on:click="uploadCakes">Submit Cakes</button>
        </form>
      </div>
    </div>


  </div>

  `,
  data: function () {
    return {
      carouselImg: '',
      carouselClass: '',
      promoImg: '',
      cakesImg: '',
      cakesTitle: '',
      cakesPrice: ''
    }
  },
  methods: {
    uploadCarousel: function () {
      if (this.carouselImg === '' || this.carouselClass == '') {
        return
      }
      let data = new FormData()
      data.append('carousel', this.carouselImg)
      data.append('class', this.carouselClass)
      baseAxios.post(`carousel/add`, data, {headers: {token: localStorage.getItem('jwtToken')}}).then(serverRes => {
        console.log(serverRes)
        console.log('upload carousel successful');
      })
    },
    uploadPromo: function () {
      if (this.promoImg === '') {
        return
      }
      let data = new FormData()
      data.append('promo', this.promoImg)
      baseAxios.post(`promo/add`, data, { 'Content-Type': 'multipart/form-data', headers: {token: localStorage.getItem('jwtToken')}}).then(serverRes => {
        console.log(serverRes)
        console.log('upload promo successful');
      })
    },
    uploadCakes: function () {
      console.log('start upload process');
      if (this.cakesImg === '' || this.cakesPrice == '' || this.cakesTitle == '') {
        return console.log('fails');
      }
      let data = new FormData()
      data.append('cakes', this.cakesImg)
      data.append('title', this.cakesTitle)
      data.append('price', this.cakesPrice)
      baseAxios.post(`cakes/add`, data, {headers: {token: localStorage.getItem('jwtToken')}}).then(serverRes => {
        console.log(serverRes)
        console.log('upload cakes successful');
      })
    },
    onFilechangeCarousel: function (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.carouselImg = files[0]
    },
    onFilechangePromo: function (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.promoImg = files[0]
    },
    onFilechangeCakes: function (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.cakesImg = files[0]
    }
  }

})

Vue.component('admin-data', {
  template: `

  <div class="container-fluid">
    <div class="container my-4">
      <h1 class="h3 mb-3 font-weight-normal">Current Data</h1>
      <button type="button" class="button" name="button" v-on:click="refresh()">
        Refresh
      </button>
    </div>


    <div class="container">
      <h1>Carousel Data</h1>
      <div class="row">
        <div class="col-md-4" v-for="item in carousel">
          <div class="card mb-4 box-shadow" style="width: 18rem;">
            <img class="card-img-top img-fluid" :src="item.imgUrl" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">Class : {{item.class}}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="container">
      <h1>Promo Data</h1>
      <div class="row">
        <div class="col-md-4" v-for="item in promo">
          <div class="card mb-4 box-shadow" style="width: 18rem;">
            <img class="card-img-top img-fluid" :src="item.imgUrl" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">Promo Items</h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <h1>Cakes Data</h1>
      <div class="row">
        <div class="col-md-4" v-for="item in cakes">
          <div class="card mb-4 box-shadow" style="width: 18rem;">
            <img class="card-img-top img-fluid" :src="item.imgUrl" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">{{item.title}}</h5>
              <p class="card-text">Price : {{item.price}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

  `,
  data: function () {
    return {
      carousel: '',
      promo: '',
      cakes: ''
    }
  },
  created: function () {
    this.getData()
    this.getPromoData()
    this.getCakesData()
  },
  methods: {
    getData: function () {
      console.log('getting data');
      baseAxios.get(`carousel/`, {headers: {token: localStorage.getItem('jwtToken')}}).then(serverRes => {
        // console.log(serverRes.data.articles)
        this.carousel = serverRes.data.data
      })
    },
    getPromoData: function () {
      console.log('getting data');
      baseAxios.get(`promo/`, {headers: {token: localStorage.getItem('jwtToken')}}).then(serverRes => {
        // console.log(serverRes.data.articles)
        this.promo = serverRes.data.data
      })
    },
    getCakesData: function () {
      console.log('getting data');
      baseAxios.get(`cakes/`, {headers: {token: localStorage.getItem('jwtToken')}}).then(serverRes => {
        // console.log(serverRes.data.articles)
        this.cakes = serverRes.data.data
      })
    },
    refresh: function () {
      this.getData()
      this.getPromoData()
      this.getCakesData()
    }
  }
})


new Vue({
  el: '#vueApp',
  data: {
    dummy: ''
  },
  methods: {

  }
})
