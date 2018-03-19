var app = new Vue({
  el:'#app',
  data:{
    message:'hello world',
    items:[{
      id:1,
      foto:'assets/img/obatgenerik.jpg',
      title:'paracetamol',
      harga:4000,
      stock:10,
      descripsi:'Some quick example text to build on the card title and make up the bulk of the cards content.'
    },
    {
      id:2,
      foto:'assets/img/obatgenerik2.jpg',
      title:'asam mefenamat',
      harga:4000,
      stock:10,
      descripsi:'Some quick example text to build on the card title and make up the bulk of the cards content.'
    },{
      id:3,
      foto:'assets/img/obatlangka1.jpg',
      title:'vip albumin',
      harga:4000,
      stock:10,
      descripsi:'Some quick example text to build on the card title and make up the bulk of the cards content.'
    },{
      id:4,
      foto:'assets/img/obatlangka2.jpg',
      title:'albusmin',
      harga:4000,
      stock:10,
      descripsi:'Some quick example text to build on the card title and make up the bulk of the cards content.'
    },
    {
      id:5,
      foto:'assets/img/obatgenerik3.jpg',
      title:'paracetamol',
      harga:4000,
      stock:10,
      descripsi:'Some quick example text to build on the card title and make up the bulk of the cards content.'
    },
    {
      id:6,
      foto:'assets/img/obatgenerik4.png',
      title:'asam mefenamat',
      harga:4000,
      stock:10,
      descripsi:'Some quick example text to build on the card title and make up the bulk of the cards content.'
    },{
      id:7,
      foto:'assets/img/obatlangka3.jpg',
      title:'vip albumin',
      harga:4000,
      stock:10,
      descripsi:'Some quick example text to build on the card title and make up the bulk of the cards content.'
    },{
      id:8,
      foto:'assets/img/obatlangka4.png',
      title:'albusmin',
      harga:4000,
      stock:10,
      descripsi:'Some quick example text to build on the card title and make up the bulk of the cards content.'
    }],
    listcart:[]
  },
  methods:{
    addtocart:function(data){
      let key=false
      for(let i=0;i<this.listcart.length;i++){
        if(this.listcart[i].id===data.id){
          key=true
          var index=i
        }
      }
      if(key){
          this.listcart[index].total= this.listcart[index].total+1
          this.listcart[index].harga= this.listcart[index].harga+data.harga
      }else{
        let obj = {
          id:data.id,
          foto:data.foto,
          harga:data.harga,
          title:data.title,
          total:1,
          descripsi:data.descripsi,
          sold:false
        }
        this.listcart.push(obj)
      }
      for(let i=0;i<this.items.length;i++){
        if(this.items[i].id===data.id){
          this.items[i].stock-=1
        }
      }
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
              this.items[i].stock+=this.listcart[i].total
              this.listcart.splice(i, 1);

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
        if(this.listcart[i].id===id){
          let kurangharga=this.listcart[i].harga/this.listcart[i].total
          this.listcart[i].total+=1
          this.listcart[i].harga+=kurangharga
        }
      }
    },
    deletetotal:function(id){
      for(let i=0;i<this.listcart.length;i++){
        if(this.listcart[i].id===id){
          if(this.listcart[i].total>1){
            let kurangharga=this.listcart[i].harga/this.listcart[i].total
            this.listcart[i].total-=1
            this.listcart[i].harga-=kurangharga
          }
        }
      }
    },
    buylistcart:function(id){
      for(let i=0;i<this.listcart.length;i++){
        if(this.listcart[i].id===id){
          this.listcart[i].sold=true
          swal({
            title: "Good job!",
            text: "Terimakasih sudah berbelanja disini!",
            icon: "success",
            button: "Aww yiss!",
          });
        }
      }
    }
  }
})
