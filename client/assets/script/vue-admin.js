new Vue({
    el: '#admin-timeline',
    data: {
        objitem:{
            name: '',
            price: '',
            stock: '',
            file: null,            
        },
        objAdmin:{
            email:'',
            password:''
        },
        items: [],
        cart: []
    },
    created:function(){
        axios({
            method:'get',
            url:'http://localhost:3000/product',
            headers:{
                token : localStorage.token
            },
        }).then(response=>{
             this.items = response.data.data.map(val=>val)
        }).catch(err=>console.log(err))
    },
    methods: {
        // signup:function(){
        //     axios({
        //         method:'post',
        //         url:'http://localhost:3000/admin/signup',
        //         data:{
        //             name : this.objAdmin.name,
        //             password: this.objAdmin.password,
        //             email : this.objAdmin.email
        //         }
        //     }).then(data=>{
        //         console.log(data)
        //     }).catch(err=>console.log(err))
        // },
        login:function(){
           alert(this.objAdmin.password)
            axios({
                method:"post",
                url :"http://localhost:3000/admin/signin",
                data:{
                    email: this.objAdmin.email,
                    password: this.objAdmin.password
                }
            }).then(response=>{
                alert(response)
                console.log(response)
                localStorage.setItem('token', response.data.token)
                window.location.href='admin.html'
                console.log('success login')
            }).catch(err=>console.log(err))
        },
        signout:function(){
            localStorage.clear()
            window.location.href='admin-login.html'
        },
        getpayloadname: function(name){
            this.objitem.name = name
        },
        getpayloadprice: function(price){
            this.objitem.price = price
        },
        getpayloadstock: function(stock){
            this.objitem.stock = stock
        },
        deleteProduct:function(id){
            swal({
                title: "Are you sure?",
                text: "want delete this product ?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    axios({
                        method:'delete',
                        url:`http://localhost:3000/product/${id}`,
                        // headers:{
                        //     token : localStorage.token
                        // },
                    }).then(response=>{    
                        location.reload();
                        console.log(response)
                    }).catch(err=>console.log(err))
                  swal("Your product has been deleted!", {
                    icon: "success",
                  });
                } else {
                  swal("your product is safe");
                }
              });
        },

        currencyFormat: function (price) {
            return price.toLocaleString()
        },
        addProduct:function() {
                let formData=new FormData()
                formData.set('name', this.objitem.name)
                formData.set('price', this.objitem.price)
                formData.set('stock', this.objitem.stock)
                formData.set('image', this.objitem.image[0])
          
                axios.post('http://localhost:3000/product', formData)
                  .then(response => {
                    console.log(response)
                  }).catch(err => {
                    console.log(err.response)
                  })
              },

            // this.formData.set('image', this.file[0])
            // this.formData.set('name', this.objitem.name);
            // this.formData.set('price', this.objitem.price)
            // this.formData.set('stock', this.objitem.stock)
            // axios({
            //     method : 'post',
            //     url : 'http://localhost:3000/product',
            //     data:{
            //         name:this.objitem.name, 
            //         price:this.objitem.price,
            //         stock:this.objitem.stock
            //     },
            //     // headers:{
            //     //     token : localStorage.token
            //     // },
            //     // data:this.formData,               
            //     // config = {
            //     //     headers: {
            //     //       'content-type': 'multipart/form-data'
            //     //     }
            // }).then((response)=>{
            //     location.reload();
            // }).catch(err=>console.log(err))
            
        // },
        editProduct:function(id){
            axios({
                method : 'put',
                url : 'http://localhost:3000/product/'+id,
                data:{
                    name:this.objitem.name, 
                    price:this.objitem.price,
                    stock:this.objitem.stock
                },
                // headers:{
                //     token : localStorage.token
                // },
                // data:this.formData,               
                // config = {
                //     headers: {
                //       'content-type': 'multipart/form-data'
                //     }
            }).then((response)=>{
                location.reload();
            }).catch(err=>console.log(err))
            

        }
    },
})


