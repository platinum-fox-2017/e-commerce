new Vue({
    el: '#checkout',
    data: {
        carts: []
    },
    created(){
        let firstCarts = JSON.parse(localStorage.getItem('carts'))
            if(firstCarts) {
        this.carts = firstCarts
        }
    },
    methods:{
        getTotal: function () {
           let total = 0;
           this.carts.map(data => {
               total += data.subtotal
           })
           return total
       },
       checkout: function(){
        swal("Pesanan anda tengah kami proses!", "Terimakasih telah berbelanja", "success")
        .then((value) => {
            localStorage.removeItem('carts')
            window.location.href="index.html"
        });
            
       },
       currencyFormat: function (price) {
            return price.toLocaleString()
        },
    }
})

