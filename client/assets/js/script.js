var app = new Vue({
  el:'#app',
  data:{
    message:'hello world',
    idupdate:'',
    titleupdate:'',
    descripsiupdate:'',
    hargaupdate:0,
    stockupdate:0,
    items:[],
    listcart:[]
  },
  created:function(){
    axios.get(`http://localhost:3000/showitems/`,
      {
        headers: {
          token: localStorage.token,
          tokenfb: localStorage.tokenfb
       },
     })
      .then(response =>{
          this.items=response.data
          this.imgfb=response.data[0].itemsuserid.picture
          // console.log(this.items);
      })
      .catch(err => {
        console.log(err)
      })

      axios.get(`http://localhost:3000/showsellitem/`,
        {
          headers: {
            token: localStorage.token
         },
       })
        .then(response =>{
          this.listcart=response.data
        })
        .catch(err => {
          console.log(err)
        })
  },
  methods:{
    addtocart:function(data){
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/addtocart/',
        data:{
          token:localStorage.token,
          itemid:data._id,
          harga:data.harga,
          qty:1,
        },
        success: function(resp) {
          // console.log(resp);
          window.location.reload()
        },
        error: function(error) {
          console.error('Failed send to server');
          console.log(error);
        }
      })
      // let key=false
      // for(let i=0;i<this.listcart.length;i++){
      //   if(this.listcart[i]._id===data._id){
      //     key=true
      //     var index=i
      //   }
      // }
      // if(key){
      //     this.listcart[index].total= this.listcart[index].total+1
      //     this.listcart[index].harga= this.listcart[index].harga+data.harga
      // }else{
      //   let obj = {
      //     _id:data._id,
      //     picture:data.picture,
      //     harga:data.harga,
      //     title:data.title,
      //     total:1,
      //     descripsi:data.descripsi,
      //     sold:false
      //   }
      //   this.listcart.push(obj)
      // }
      // for(let i=0;i<this.items.length;i++){
      //   if(this.items[i]._id===data._id){
      //     this.items[i].stock-=1
      //   }
      // }
    },
    deletelistcart:function(data){
      for(let i=0;i<this.listcart.length;i++){
        if(this.listcart[i].id===data.id){
          swal({
            title: "Are you sure?",
            text: "item di cart ini akan hilang",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              console.log(data);
              $.ajax({
                type: 'DELETE',
                url: `http://localhost:3000/deletesellitem/${data.userid}/${data.itemid._id}`,
                success: function(resp) {
                  window.location.reload()
                  console.log(resp);
                },
                error: function(error) {
                  console.error('Failed send to server');
                  console.log(error);
                }
              })

              swal("delete item succes", {
                icon: "success",
              });
            }
          });
        }
      }
    },
    addtotal:function(id){
      for(let i=0;i<this.listcart.length;i++){
        if(this.listcart[i]._id===id){
          let kurangharga=this.listcart[i].totalbiaya/this.listcart[i].qty
          this.listcart[i].qty+=1
          this.listcart[i].totalbiaya+=kurangharga
        }
      }
    },
    deletetotal:function(id){
      for(let i=0;i<this.listcart.length;i++){
        if(this.listcart[i]._id===id){
          if(this.listcart[i].qty>1){
            let kurangharga=this.listcart[i].totalbiaya/this.listcart[i].qty
            this.listcart[i].qty-=1
            this.listcart[i].totalbiaya-=kurangharga
          }
        }
      }
    },
    buylistcart:function(data){
      console.log(data);
      for(let i=0;i<this.listcart.length;i++){
        if(this.listcart[i]._id===data._id){
          this.listcart[i].sold=true
          axios.put(`http://localhost:3000/buyitem/${data._id}`,{
            qty:data.qty,
            totalbiaya:data.totalbiaya,
            sold:true
          })
          .then(response => {
            console.log(response);
            swal({
              title: "Good job!",
              text: "Terimakasih sudah berbelanja disini!",
              icon: "success",
              button: "Aww yiss!",
            });
          })
          .catch(err => {
            console.log(err);
          })
        }
      }
    },
    additem:function(payload){
      // console.log(payload.picture);
      // $.ajax({
      //   type: 'POST',
      //   url: 'http://localhost:3000/additems/',
      //   data:{
      //     title:payload.title,
      //     descripsi:payload.descripsi,
      //     stock:payload.stock,
      //     harga:payload.harga,
      //     picture:payload.picture
      //   },
      //   success: function(resp) {
      //     // window.location.reload()
      //   },
      //   error: function(error) {
      //     console.error('Failed send to server');
      //     console.log(error);
      //   }
      // })
    },
    deleteitem:function(id){
      $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/${id}`,
        success: function(resp) {
          window.location.reload()
        },
        error: function(error) {
          console.error('Failed send to server');
          console.log(error);
        }
      })
    },
    showupdateitem:function(data){
      this.idupdate = data._id
      this.titleupdate = data.title
      this.stockupdate = data.stock
      this.hargaupdate = data.harga
      this.descripsiupdate = data.descripsi
    },
    updateitems : function(id){
      $.ajax({
        type: 'PUT',
        url: `http://localhost:3000/${id}`,
        data:{
          title:this.titleupdate,
          descripsi:this.descripsiupdate,
          stock : this.stockupdate,
          harga : this.hargaupdate
        },
        success: function(resp) {
          window.location.reload()
        },
        error: function(error) {
          console.error('Failed send to server');
          console.log(error);
        }
      })
    }
  }
})
