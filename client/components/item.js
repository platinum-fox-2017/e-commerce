Vue.component('item', {
    props: ['id', 'img_url', 'title', 'description', 'price', 'stock'],
    template: `
    <div class="card" style="width: 15rem;">
        <img class="card-img-top" :src="img_url" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>
            <p class="card-text">{{ description }}</p>
            <p class="card-text">Rp. {{ formatPrice(price) }}</p>
            <p class="card-text">Stock: {{ stock }}</p>
            <a class="btn btn-primary" :class="{ 'disabled': disableButton(stock) }" @click="addToCart(id)">Add to cart</a>
        </div>
    </div>
    `,
    methods: {
        formatPrice: function(price) {
            return price.toLocaleString();
        },
        
        disableButton: function(stock) {
            if (stock == 0) return true;
            else return false;
        },

        addToCart: function(id) {
            this.$emit('addItemToCart', id);
        }
    }
});