var homehead = Vue.component('homehead', {
  template:`
  <div>
    <header>
        <div class="container" id="header">   
            <div class="columns" id="columns">     
                <div class="column col-3 text-center">
                    <div class="col-content">
                        <img id="img-header" src="./assets/images/img_header_polaroid-originals.svg">
                    </div>
                </div>
                <div class="column col-6 text-center">
                    <div class="dropdown">
                            <a href="#" class="btn btn-link dropdown-toggle" id="header-text" tabindex="0">
                                Products
                            </a>
                            <ul class="menu">
                                <div id="header_font">Instant Film</div>
                                <div id="header_font">Vintage Cameras</div>
                                <div id="header_font">New Cameras</div>
                            </ul>
                    </div>
                </div>       
                <div class="column col-1 text-center">
                    <div class="col-content">
                        <img id="img-header" src="./assets/images/icon-search.svg">
                    </div>
                </div>
                <div class="column col-1 text-center">
                    <div class="col-content">
                        <img id="img-header" src="./assets/images/icon-account.svg">
                    </div>
                </div>
                <div class="column col-1 text-center">
                    <div class="col-content" id="cart" cursor="pointer">
                        <img id="img-header" @click="showmodal" data-toggle="modal" data-target="#exampleModal" src="./assets/images/icon-cart.svg">
                    </div>
                </div>
            </div>
        </div>
    </header>
  </div>
  `,
  props: ['showmodal']
})