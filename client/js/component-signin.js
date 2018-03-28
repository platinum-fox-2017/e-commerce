Vue.component(
    'component-signin',
    {
        template:
        `
        <section class="content" style="margin-top:40px">
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div class="box box-warning">
                    <div class="box-body">
                        <div class="form-group col-md-6 col-md-offset-3">
                            <label>Username</label>
                            <input id="login-username" type="text" class="form-control" placeholder="Username or Email" v-model="username_email">
                        </div>
                        <div class="form-group col-md-6 col-md-offset-3">
                            <label>Password</label>
                            <input id="login-password" type="password" class="form-control" placeholder="Password" v-model="password">
                        </div>
                        <div class="row">
                            <div class="form-group col-md-8 col-md-offset-2 col-xs-8 col-xs-offset-4">
                                <button type="submit" class="btn btn-success col-md-6 col-md-offset-3" v-on:click="signInUser">Login</button>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-md-8  col-md-offset-2">
                                <p class="text-center">Don't have account yet ? Create one today ! </p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-md-8 col-md-offset-2 col-xs-8 col-xs-offset-4">
                                <button type="submit" class="btn btn-warning col-md-6 col-md-offset-3" v-on:click="signUpUser">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
        `,

        data : function() {
            return {
                username_email: ``,
                password: ``
            }
        },
        methods: {
            signInUser : function () {
                axios.post('http://localhost:3000/api/customers/signin', {
                    username_email: this.username_email,
                    password: this.password,
                })
                .then((response) => {
                    if(response.status == 200) {
                        localStorage.setItem('userid', response.data.data.id)
                        localStorage.setItem('token', response.data.data.token)
                        localStorage.setItem('email', response.data.data.email) 
                        localStorage.setItem('name', response.data.data.name)                                                               
                        location.reload()
                        alert('Login Success')
                        $('#modalSignIn').modal('hide')
                    } else {
                        alert('Login Failed, please check your username or password')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            },

            signUpUser : function () {
                this.$emit('sign-up')
            }
        }
    }   
)