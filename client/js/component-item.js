Vue.component(
    'component-item',
    {
        props: ['item'],
        template : 
        `
        <div>
            <img :src="item.picture" alt="..." class="img-responsive" style="width:244px;height:244px">
            <div class="caption">
                <p style="font-weight: bold">{{ item.name }}</p>
                <p>{{item.description}}</p>
                <p>Price : {{ formatUang(item.price) }} </p>
                <p>
                    <a class="btn btn-primary" data-toggle="modal" data-target="#myModal" v-on:click="addToChartChildren(item)" role="button">Add to chart</a>
                </p>
            </div>
        </div>
        `,
        methods : {
            addToChartChildren: function(item) {
                this.$emit('add-item-to-chart', item)
            },

            formatUang: function(money) {
                return 'Rp. '+ parseInt(money).toLocaleString();    
            },
        }
    },
    
)