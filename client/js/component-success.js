Vue.component(
    'component-success',
    {
        props: ['objuseractive'],
        template :
        `
        <section class="content" style="margin-top:40px">
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div class="box box-warning">
                    <div class="box-body">
                        <h4 class="text-center"> 
                            Terimakasih telah melakukan transaksi di hoopstore ! {{ objuseractive.name}}
                        </h4>

                        <div class="col-md-4 col-md-offset-4">
                            <a @click="backToHome" href="#" class="btn btn-warning">
                                <i class="fa fa-angle-left"></i> Continue Shopping
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
        `,
        methods: {
            backToHome: function () {
                this.$emit('back-home')
            }
        }
    },

)