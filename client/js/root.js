new Vue({
    el: '#app',
    data: {
        message: "Hallo, welcome to vuew world !",
        err : '',
        chartModal: false,
        categories : [
            {name : 'Shoes'}, 
            {name : 'Jersey'},
            {name : 'Accessories'}
        ],
        items : [],
        carts: [],
        objUser: {
            token: localStorage.getItem('token'),
            userid: localStorage.getItem('userid'),
            email: localStorage.getItem('email'),
            name: localStorage.getItem('name')
        },
        signUpFormActive:false,
        signInFormActive: true,
        checkoutActive: false,
        successActive: false

    },
    created : function() {
        axios.get('http://localhost:3000/api/items', {})
        .then(response => {
            this.items = response.data.data
        })
        .catch(err => {
            console.log(err);
        })
    },
    methods: {
        hideSignInForm: function() {
            this.signInFormActive = false
        },

        showSignInForm: function() {
            this.signInFormActive = true
        },

        hideSignUpForm: function() {
            this.signUpFormActive = false
            this.showSignInForm()
        },

        showSignUpForm: function() {
            this.signUpFormActive = true
            this.hideSignInForm()
        },

        checkCheckout: function() {
            if (this.objUser.token) {
                this.checkoutActive = true
                $('#myModal').modal('hide')
            } else {
                alert('Login First !')
                this.signInFormActive = true
            }
        },

        addToChart: function (item) {
            let checkUnique = this.searchUnique(item);
            if (checkUnique) {
                if(item.stock > 0) {
                    this.carts.push({
                        item_id: item._id,
                        item_name: item.name,
                        item_image: item.picture,
                        item_price: item.price,
                        item_totalPrice : item.price,
                        item_description: item.description,
                        quantity: 1
                    })
                } else {
                    alert("Error ! Item sudah habis")
                }
            }
            return this.carts
        },

        deleteItemChart: function(itemId) {
            for(let i = 0; i < this.carts.length; i++) {
                if (itemId == this.carts[i].item_id ) {
                    this.carts.splice(i,1)
                }
            }
        },

        searchUnique: function (item) {
            let check = true;
            if(item.stock > 0) {
                for (let i = 0; i < this.carts.length; i++) {
                    if (item._id == this.carts[i].item_id) {
                        this.carts[i].quantity = this.carts[i].quantity + 1
                        this.carts[i].item_totalPrice = this.carts[i].item_price * this.carts[i].quantity
                        check = false;
                    }
                }
            } else {
                alert("Error ! Item sudah habis")
                return;
            }

            return check;
        },

        totalPrice: function() {
            let totalPrice = 0;
            for (let i = 0; i < this.carts.length; i++) {
                totalPrice = totalPrice + this.carts[i].item_totalPrice 
            }
            if(totalPrice) {
                return totalPrice
            } else {
                return 0
            }

        },

        formatUang: function(money) {
            return 'Rp. '+ parseInt(money).toLocaleString();    
        },

        setPrice: function(quantity,id) {
            let newPrice = 0;
            for (let i = 0; i < this.carts.length; i++) {
                if (id == this.carts[i].item_id) {
                   this.carts[i].item_totalPrice = this.carts[i].item_price * this.carts[i].quantity
                   newPrice = this.carts[i].item_totalPrice
                }
            }
            return newPrice;
        },

        checkCart : function() {
            alert(JSON.stringify(this.carts))
        },

        showModalChart: function() {
            this.chartModal = true;
        },

        showSuccess: function() {
            this.carts = []
            this.successActive = true;
        },

        backToHome: function() {
            this.checkoutActive = false;
            this.successActive = false;
        }
    }
})