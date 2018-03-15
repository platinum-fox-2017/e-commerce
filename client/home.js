Vue.config.devtools = true
const app =new Vue({
  el:"#app",
  data:{
    items:[{
      SKU : "C01",
      title: "Canon EOS Rebel SL2",
      category: "canon",
      description: `Canon EOS Rebel SL2 DSLR with EF-S 18-55mm f/4-5.6 IS STM Lens - Black
      Perfect for families, budding photo enthusiasts and first-time SLR users`,
      price: 649,
      stock:10,
      imgUrl:"./pic/canon-eosrebel.jpg",
      imgAlt : "Canon eos rebel"
    },{
      SKU : "C02",
      title: "Canon EOS 1300D",
      category: "canon",
      description: `The EOS 1300D packs in all the fun of photography, 
      It uses an 18-megapixel APS-C size sensor and the DIGIC 4+ image processor—which 
      even professional photographers recognize as high performance core features.`,
      price: 550,
      stock:10,
      imgUrl:"./pic/canon-eos1300.jpg",
      imgAlt : "Canon eos 1300d"
    },{
      SKU : "C03",
      title: "Sony Alpha a7 III",
      category: "sony",
      description: `Sony Alpha a7 III 24MP UHD 4K Mirrorless Digital Camera with 28-70mm Lens`,
      price: 2100,
      stock:10,
      imgUrl:"./pic/sony-alpha.jpg",
      imgAlt : "Sony Alpha"
    },{
      SKU : "C04",
      title: "LEICA S (TYP 006)",
      category: "leica",
      description: `The next generation in the successful line, the Leica S offers increased imaging 
      quality and sensor sensitivity, predictive autofocus, higher speed and improved handling.`,
      price: 18500,
      stock:10,
      imgUrl:"./pic/leica-camera.jpg",
      imgAlt : "LEICA S (TYP 006)"
    },{
      SKU : "C05",
      title: "LEICA M-P (TYP 240)",
      category: "leica",
      description: `Embodying the best of Leica M cameras, the Leica M-P has 
      an unobtrusive appearance, appealing to professional photographers and avid Leica M users.`,
      price: 7000,
      stock:10,
      imgUrl:"./pic/leica-mp.jpg",
      imgAlt : "LEICA M-P (TYP 240)"
    }],
    carts:[],
    total:0,
  },
  methods:{
    addCart:function(data){
      alert("add to cart?")
      var carts = this.carts
    console.log("add cart:",data)
      // alert(carts.length)
      for(let i = 0; i<carts.length; i++) {
        console.log('masuk sini')
        if (carts[i].SKU === data.SKU) {
          console.log('sama')
          carts[i].qty = Number(carts[i].qty) + 1
          carts[i].subTotal += data.price
          this.total += data.price
          console.log(carts[i].qty)
          // alert(typeof carts[i].qty)
          return
        }
      }
      let obj={
              title:data.title,
              category:data.category,
              description:data.description,
              price:data.price,
              imgUrl:data.imgUrl,
              imgAlt:data.imgAlt,
              SKU:data.SKU,
              qty: 1,
              subTotal: data.price
            }
      carts.push(obj)
      this.total += obj.price
      // this.subTotal += obj.subTotal
    console.log("cart",this.carts)
    },
    removeCart :function(data){
      console.log(data)
      let carts = this.carts
      for(let i = 0; i<carts.length; i++) {
        if (carts[i].SKU === data.SKU) {
          let check = confirm("Remove item from cart?")
          if(check === true){
            carts.splice(i,1)
            this.total -= data.subTotal
            return
          }
          
        }
      }
    },
    clearCart : function(){
      let check = confirm("Clear all products from cart?")
      if(check){
        this.carts = []
        this.total = 0
        return
      }
    },
    limitDesc: function(desc){
      if (desc.length > 100){
          desc = desc.substr(0,100)
          var index = desc.lastIndexOf(' ')
          desc = desc.substr(0, index) + ' ...'
      } else {
         desc = desc
      }
      return desc
    },
  },
  computed:{
    substractStock: function(){
      let items = this.items
      
    }
  }
})
