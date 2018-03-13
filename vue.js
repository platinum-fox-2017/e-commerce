var app = new Vue({
    el: '#app',
    data: {
        albumList: [
            {
                image: 'https://is3-ssl.mzstatic.com/image/thumb/Music118/v4/bc/31/ab/bc31ab00-2199-370d-94f2-6f9189a93d3c/075679882493.jpg/1200x630bb.jpg',
                artist: 'Panic! At The Disco',
                album: 'Death of A Bachelor Tour Live',
                price: 65000
            },{
                image: 'https://i.scdn.co/image/df15a1fd35bae6843b9814836411495bd9450d5f',
                artist: 'Twenty One Pilots',
                album: 'TOP x MM',
                price: 55000
            },{
                image: 'http://mblogthumb4.phinf.naver.net/20160825_175/hhzoa_14721087074574m3LK_JPEG/NaverBlog_20160825_160507_00.jpg?type=w2',
                artist: 'RADWIMPS',
                album: 'Your Name.',
                price: 100000
            },{
                image: 'https://1.bp.blogspot.com/-hVblCbVBlos/WLMKDSFdh0I/AAAAAAAAFGA/EMDPFdAtTyobtV2T6zY8DaqeA2tMuEd3wCLcB/s1600/Pee%2BWee%2BGaskins%2B%2528A%2BYouth%2BNot%2BWasted%2529%2B-%2B2016.jpg',
                artist: 'Pee Wee Gaskins',
                album: 'A Youth Not Wasted',
                price: 45000
            },{
                image: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Twicetagram_album_cover.png',
                artist: 'TWICE',
                album: 'Twicetagram',
                price: 200000
            },{
                image: 'https://upload.wikimedia.org/wikipedia/en/6/62/Ly-her.jpg',
                artist: 'BTS',
                album: `Love Yourself 承 'Her'`,
                price: 150000
            },{
                image: 'http://st.cdjapan.co.jp/pictures/l/14/07/VVCL-1042.jpg',
                artist: 'LiSA',
                album: 'Little Devil Parade',
                price: 150000
            },{
                image: 'https://upload.wikimedia.org/wikipedia/id/thumb/2/2f/JKT48_Dirimu_Melody_Cover.jpg/220px-JKT48_Dirimu_Melody_Cover.jpg',
                artist: 'JKT48',
                album: 'Dirimu Melody',
                price: 80000
            }
        ],
        bannerList: [
            {
                image: 'https://images1.laweekly.com/imager/u/original/7450139/ebff4069-73f5-4127-aaa3-df5d2885a39a_177801_tablet_landscape_large_16_9.jpg',
                artist: 'Panic! At The Disco',
                album: 'Death of A Bachelor Tour Live'
            },{
                image: 'http://mutantkids.com.br/wp-content/uploads/2016/12/topxmm-png.png',
                artist: 'Twenty One Pilots',
                album: 'TOP x MM'
            },{
                image: 'http://s1.dmcdn.net/otNFb/1280x720-Ljb.jpg',
                artist: 'RADWIMPS',
                album: 'Your Name.'
            }
        ],
        cart: [],
        cartTotal: 0
    },
    methods: {
        addToCart: function(item){
            alert('Added Item to Cart')
            for(let i=0; i<this.cart.length; i++){
                if(this.cart[i].album == item.album){
                    this.cart[i].quantity ++
                    this.cart[i].price += item.price
                    this.cartTotal += item.price
                    return
                }
            }
            let payload = {
                image: item.image,
                artist: item.artist,
                album: item.album,
                price: item.price,
                quantity: 1
            }
            this.cart.push(payload)
            this.cartTotal += item.price
        },
        clearCart: function(){
            if(this.cart.length == 0){
                return
            }
            let x = confirm('Are you sure want to clear this cart?')
            if(x == true){
                this.cart = []
                this.cartTotal = 0
            }
            return
        },
        clearItem: function(item){
            for(let i=0; i<this.cart.length; i++){
                if(this.cart[i].album == item.album){
                    let x = confirm('Are you sure want to delete this item?')
                    if(x == true){
                        this.cart.splice(i, 1)
                        this.cartTotal -= item.price
                    }
                }
            }
        }
    }
})