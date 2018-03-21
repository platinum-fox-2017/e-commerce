Vue.config.devtools = true
const app =new Vue({
  el:"#app",
  data:{
    items:[{
      sku : "C01",
      title: "Canon EOS Rebel SL2",
      category: "canon",
      description: `Canon EOS Rebel SL2 DSLR with EF-S 18-55mm f/4-5.6 IS STM Lens - Black
      Perfect for families, budding photo enthusiasts and first-time SLR users`,
      price: 649,
      stock:10,
      imgUrl:"./pic/canon-eosrebel.jpg",
      imgAlt : "Canon eos rebel"
    },{
      sku : "C02",
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
      sku : "C03",
      title: "Sony Alpha a7 III",
      category: "sony",
      description: `Sony Alpha a7 III 24MP UHD 4K Mirrorless Digital Camera with 28-70mm Lens`,
      price: 2100,
      stock:10,
      imgUrl:"./pic/sony-alpha.jpg",
      imgAlt : "Sony Alpha"
    },{
      sku : "C04",
      title: "LEICA S (TYP 006)",
      category: "leica",
      description: `The next generation in the successful line, the Leica S offers increased imaging 
      quality and sensor sensitivity, predictive autofocus, higher speed and improved handling.`,
      price: 18500,
      stock:10,
      imgUrl:"./pic/leica-camera.jpg",
      imgAlt : "LEICA S (TYP 006)"
    },{
      sku : "C05",
      title: "LEICA M-P (TYP 240)",
      category: "leica",
      description: `Embodying the best of Leica M cameras, the Leica M-P has 
      an unobtrusive appearance, appealing to professional photographers and avid Leica M users.`,
      price: 7000,
      stock:10,
      imgUrl:"./pic/leica-mp.jpg",
      imgAlt : "LEICA M-P (TYP 240)"
    },{
      sku : "C06",
      title: "Sony Alpha A6000",
      category: "Sony",
      description: `Sony Alpha A6000 Mirrorless Camera with 16-50mm f/3.5-5.6 OSS 
      Alpha E-Mount Retractable Zoom Lens, Black.Hybrid AF with 179-point focal plane 
      phase-detection and 25 contrast detect points`,
      price: 7000,
      stock:10,
      imgUrl:"./pic/sony-alphaa6000.jpg",
      imgAlt : "Sony Alpha A6000"
    }],
    carts:[],
    total:0,
  },
  methods:{
    addCart:function(data){
      alert("add to cart?")
      // let carts = this.carts
      let obj={
        title:data.title,
        category:data.category,
        description:data.description,
        price:data.price,
        imgUrl:data.imgUrl,
        imgAlt:data.imgAlt,
        sku:data.sku,
        qty: 1,
        subTotal: data.price
        }
      for(let i = 0; i<this.carts.length; i++) {
        console.log('masuk sini')
        if (this.carts[i].sku === data.sku) {
          console.log('sama')
          this.carts[i].qty ++
          this.carts[i].subTotal = this.carts[i].price * this.carts[i].qty
          this.total += data.price
          this.reduceStock(data.sku)
          return
        }
      }
      
      this.carts.push(obj)
      this.total += obj.price
      this.reduceStock(data.sku)
    },
    removeCart :function(data){
      console.log(data)
      let carts = this.carts
      for(let i = 0; i<carts.length; i++) {
        if (carts[i].sku === data.sku) {
          let check = confirm("Remove item from cart?")
          if(check === true){
            carts.splice(i,1)
            this.total -= data.subTotal
            let index = this.items.map(item => item.sku).indexOf(data.sku)
            this.items[index].stock += data.qty
            return
          }
          
        }
      }
    },
    // limitDesc: function(desc){
    //   if (desc.length > 100){
    //       desc = desc.substr(0,100) + '...'
    //   } else {
    //      desc = desc
    //   }
    //   return desc
    // },
    reduceStock : function(sku){
      for(let i=0;i<this.items.length;i++){
        if(this.items[i].sku === sku){
          this.items[i].stock -= 1
          return
        }
      }
    }
  },
  computed:{
    cartTotal : function(){
      let count = 0
      for(let i =0; i<this.carts.length;i++){
        count+= this.carts[i].qty
      }
      return count
    }
  }
})
