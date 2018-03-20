Vue.component('list-item', {
    props: ['items'],
    template: `
    <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="item in items">
            <item
                :id="item._id"
                :img_url="item.url"
                :title="item.title"
                :description="item.description"
                :price="item.price"
                :stock="item.stock"
                @addItemToCart="addToCart"
            ></item>
        </div>
    </div>
    `,
    methods: {
        addToCart: function(id) {
            this.$emit('addItemToCart', id);
        }
    }
})