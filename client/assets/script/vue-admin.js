// items=[
//     {
//         name: 'Anya Cardigan',
//         price: 135000,
//         stock: 12,
//         imgSource: 'assets/images/cardigan.jpg',
//         status: 'promo'
//     },
//     {
//         name: 'Seven Mukena Ayra',
//         price: 200000,
//         stock: 12,
//         imgSource: 'assets/images/mukena-seven.jpg',
//         status: 'promo',
//     },
//     {
//         name: 'Sneaker',
//         price: 550000,
//         stock: 3,
//         imgSource: 'assets/images/sneakers.jpg',
//         status: 'promo'
//     },
//     {
//         name: 'Instant lcb Coklat',
//         price: 60000,
//         stock: 25,
//         imgSource: 'assets/images/instant.jpg',
//         status: 'promo'
//     },
//     {
//         name: 'Janeska Outer',
//         price: 250000,
//         stock: 10,
//         imgSource: 'assets/images/janeska-outer-jacket.jpeg',
//         status: 'terbaru'
//     },
//     {
//         name: 'Kindayo Dress',
//         price: 325000,
//         stock: 3,
//         imgSource: 'assets/images/kindoyao.jpg',
//         status: 'terbaru',
//     },
//     {
//         name: 'Vicria Bag',
//         price: 450000,
//         stock: 3,
//         imgSource: 'assets/images/vicria.jpg',
//         status: 'terbaru'
//     },
//     {
//         name: 'Xena Flat',
//         price: 195000,
//         stock: 20,
//         imgSource: 'assets/images/xena.jpg',
//         status: 'terbaru'
//     },
//     {
//         name: 'mukena sutra paris',
//         price: 225000,
//         stock: 6,
//         imgSource: 'assets/images/gema-collection.jpg',
//         status: 'terbaru'
//     },
//     {
//         name: 'Deeja Prealy Hijab',
//         price: 78000,
//         stock: 10,
//         imgSource: 'assets/images/milyarda-hijab-Deeja-Prealy .jpg',
//         status: 'terbaru'
//     }],
new Vue({
    el: '#admin-timeline',
    data: {
        objitem:{
            name: '',
            price: '',
            stock: '',
        },
        items: [],
        formData: new FormData(),
        file: null,
        cart: []
    },
    created:function(){
        axios.get('http://localhost:3000/product').then(response=>{
             this.items = response.data.data.map(val=>val)
        }).catch(err=>console.log(err))
    },
    methods: {
        deleteProduct:function(id){
            axios.delete(`http://localhost:3000/product/${id}`).then(response=>{    
                location.reload();
                console.log(response)
            }).catch(err=>console.log(err))
        },

        currencyFormat: function (price) {
            return price.toLocaleString()
        },
        addProduct() {
            this.formData.set('image', this.file[0])
            this.formData.set('name', this.objitem.name);
            this.formData.set('price', this.objitem.price)
            this.formData.set('stock', this.objitem.stock)
            axios({
                method : 'post',
                url : 'http://localhost:3000/product',
                // headers:{
                //     token : localStorage.apptoken
                // },
                data:this.formData,               
                config:{headers:{'Content-Type':'multipart/form-data'}},
            }).then((response)=>{
                location.reload();
            }).catch(err=>console.log(err))
            
        },
    },
})


