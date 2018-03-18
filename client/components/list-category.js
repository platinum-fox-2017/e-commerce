Vue.component('list-category', {
    props: ['categories', 'items'],
    template: `
    <div>
        <nav v-for="category in categories">
            <p class="display-4">{{ category.name }}</p>
            <hr size="30">
            <list-item
                :items="filterItems(category.name)"
                @addItemToCart="addToCart"
            ></list-item>
        </nav>
    </div>
    `,
    methods: {
        filterItems: function(category) {
            let filter = this.items.map(item => {
                if (item.category.name == category) return item
            });
            return filter;
        },

        addToCart: function(id) {
            this.$emit('add-item-to-cart', id);
        }
    }
})