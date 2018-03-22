new Vue({
    el: '#body',
    data: {
        items: [],
        categories: [],
        cart: []
    },
    methods: {
        getAllItems: function(callback) {
            request.get('items/')
            .then(response => callback(response.data.items))
            .catch(err => console.log(err))
        },

        getAllCategories: function(callback) {
            request.get('categories/')
            .then(response => callback(response.data.categories))
            .catch(err => console.log(err))
        },

        getItemById: function(id, callback) {
            request.get('items/' + id)
            .then(response => callback(response.data.item))
            .catch(err => console.log(err))
        },

        updateStock: function(id, newStock, callback) {
            request.put('items/' + id, {
                stock: newStock
            })
            .then(response => callback(response.data.item))
            .catch(err => console.log(err))
        },

        insertCart: function(id, callback) {
            request.post('cart/', {
                item: id
            })
            .then(response => callback())
            .catch(err => console.log(err))
        },

        removeItemFromCart: function(id, callback) {
            request.delete('cart/' + id)
            .then(response => callback())
            .catch(err => console.log(err))
        },

        removeCart: function(callback) {
            request.delete('cart/all/')
            .then(response => callback())
            .catch(err => console.log(err))
        },

        getAllItemInCart: function(callback) {
            request.get('cart/')
            .then(response => callback(response.data.cart))
            .catch(err => console.log(err))
        },

        addToCart: function(id) {
            this.getItemById(id, item => {
                this.updateStock(id, item.stock - 1, () => {
                    this.insertCart(id, () => {
                        this.getAllItems(items => this.items = items);
                        this.getAllCategories(categories => this.categories = categories);
                        this.getAllItemInCart(cart => this.cart = cart.item);
                    })
                })
            })
        },

        removeItem: function(obj) {
            this.getItemById(obj.id, item => {
                this.updateStock(obj.id, item.stock + obj.quantity, () => {
                    this.removeItemFromCart(obj.id, () => {
                        this.getAllItems(items => this.items = items);
                        this.getAllCategories(categories => this.categories = categories);
                        this.getAllItemInCart(cart => this.cart = cart.item);
                    })
                })
            })
        },

        checkout: function() {
            this.removeCart(() => {
                this.getAllItems(items => this.items = items);
                this.getAllCategories(categories => this.categories = categories);
                this.cart = [];
            })
        }

    },
    created: function() {
        this.getAllItems(items => this.items = items);
        this.getAllCategories(categories => this.categories = categories);
        this.getAllItemInCart(cart => this.cart = cart.item);
    }
});