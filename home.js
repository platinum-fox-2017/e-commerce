const app =new Vue({
  el:"#app",
  data:{
    cameras:[{
      SKU : "C01",
      title: "Canon 5000",
      description: `The next generation in the successful line, the Leica S offers increased imaging 
      quality and sensor sensitivity, predictive autofocus, higher speed and improved handling.`,
      price: 2000,
      imgUrl:"./pic/camera.jpeg",
      imgAlt : "Canon 5000"
    },{
      SKU : "C02",
      title: "Canon 70D",
      description: `The next generation in the successful line, the Leica S offers increased imaging 
      quality and sensor sensitivity, predictive autofocus, higher speed and improved handling.`,
      price: 3000,
      imgUrl:"./pic/camera.jpeg",
      imgAlt : "Canon 70D"
    },{
      SKU : "C03",
      title: "Sony 30",
      description: `The next generation in the successful line, the Leica S offers increased imaging 
      quality and sensor sensitivity, predictive autofocus, higher speed and improved handling.`,
      price: 4000,
      imgUrl:"./pic/camera.jpeg",
      imgAlt : "Sony 30"
    },{
      SKU : "C04",
      title: "LEICA S (TYP 006)",
      description: `The next generation in the successful line, the Leica S offers increased imaging 
      quality and sensor sensitivity, predictive autofocus, higher speed and improved handling.`,
      price: 10000,
      imgUrl:"./pic/camera.jpeg",
      imgAlt : "LEICA S (TYP 006)"
    },],
    lenses:[{
      SKU : "L01",
      title: "LEICA SUMMICRON-C 100MM T2.0 ",
      description: `The Leica Summicron-C lenses bring much of the look and feel of the Summilux-C
       lenses but with one less stop and at a much lower cost.`,
      price: 2500,
      imgUrl:"./pic/lense.jpg",
      imgAlt : "LEICA SUMMICRON-C 100MM T2.0"
    },{
      SKU : "L02",
      title: "LEICA SUMMICRON-C 135MM T2.0 ",
      description: `The Leica Summicron-C lenses bring much of the look and feel of the Summilux-C
       lenses but with one less stop and at a much lower cost.`,
      price: 3500,
      imgUrl:"./pic/lense.jpg",
      imgAlt : "LEICA SUMMICRON-C 135MM T2.0"
    },{
      SKU : "L03",
      title: "Sony G-Master ",
      description: `Sony - G Master FE 16-35mm f/2.8 GM Wide Angle Zoom Lens for Sony E-mount Cameras - Black`,
      price: 2199,
      imgUrl:"./pic/lense.jpg",
      imgAlt : "Sony G-Master"
    },{
      SKU : "L04",
      title: "Canon - EF 50mm ",
      description: `Canon - EF 50mm f/1.8 STM Standard Lens and EF-S 10-18mm F4.5-5.6 IS STM Ultra-Wide Zoom Lens Kit - black`,
      price: 400,
      imgUrl:"./pic/lense.jpg",
      imgAlt : "Canon - EF 50mm"
    },],
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
    }
  }
})
