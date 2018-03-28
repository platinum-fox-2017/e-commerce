new Vue({
    el: '#app',
    data: {
        message: 'Hello world !',
        objShow: {
            itemId: ``,
            name: ``,
            description: ``,
            picture: ``,
            stock: ``,
        },
        objUser : {
            token : localStorage.getItem('token'),
            username: localStorage.getItem('username')
        },
        items: []
    },
    methods: {
        showItem: function(payload) {
            this.objShow.itemId        = payload.itemId
            this.objShow.name          = payload.name
            this.objShow.description   = payload.description
            this.objShow.picture       = payload.picture
            this.objShow.stock         = payload.stock
        },
        addUserData: function(payload) {
            localStorage.setItem('token', payload.token)
            localStorage.setItem('username', payload.username)      
            alert(`${objUser.token} ini token, dan ini username ${objUser.username}`)           
        },
        clearUserData: function() {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            alert(`${objUser.token} ini token, dan ini username ${objUser.username}`)    
        },
        clearDataUpdate : function() {
            this.objShow.postId = ''
            this.objShow.title = ''
            this.objShow.body = ''
        }
    },
    created: function () {
        axios.get('http://localhost:3000/api/items',{})
        .then((response) => {
            this.items  = response.data.data
        })
        .catch(err => {
            console.log(err)
        })
    },
    updated: function() {
        axios.get('http://localhost:3000/api/items',{})
        .then((response) => {
            this.items  = response.data.data
        })
        .catch(err => {
            console.log(err)
        })
    }
})