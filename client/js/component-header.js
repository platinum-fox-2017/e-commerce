Vue.component(
    'component-header',
    {
        props : ['objactiveuser'],
        template:
        `
        <header>
            <div class="container">
                <div class="row">
                    <div class="col-md-6" id="branding">
                        <h3>
                            <span class="highlight">Hoops </span>Store
                        </h3>
                    </div>

                    <div class="col-md-2" v-if="objactiveuser.token != undefined" style="margin-top:15px">
                        <h4>
                            <span>Hi, {{objactiveuser.name}} </span>
                        </h4>
                    </div>

                    <div class="col-md-2" v-if="objactiveuser.token != undefined">
                        <a data-toggle="modal" data-target="#myModal">
                            <i class="material-icons icon-cart">
                                add_shopping_cart
                            </i>
                        </a>
                    </div>

                    <div class="col-md-2 category-list" v-if="objactiveuser.token != undefined">
                        <button class="btn btn-default" @click="logout">
                            Logout
                        </button>
                    </div>

                </div>
            </div>
        </header>
        `,

        methods : {
            logout : function() {
                localStorage.removeItem('token')
                localStorage.removeItem('userid')
                localStorage.removeItem('email')
                localStorage.removeItem('name')                
                location.reload()
            }
        }
    }
)