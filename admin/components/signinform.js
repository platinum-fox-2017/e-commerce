Vue.component(
    'signin-form',
    {
        template : 
        `
        <section class="content">
            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <div class="box box-warning">
                        <div class="box-body">
                            <div class="form-group col-md-6 col-md-offset-3">
                                <label>Username</label>
                                <input id="login-username" type="text" class="form-control" placeholder="Username or Email" v-model="username">
                            </div>
                            <div class="form-group col-md-6 col-md-offset-3">
                                <label>Password</label>
                                <input id="login-password" type="password" class="form-control" placeholder="Password" v-model="password">
                            </div>
                            <div class="row">
                                <div class="form-group col-md-8 col-md-offset-2">
                                    <button type="submit" class="btn btn-success col-md-6 col-md-offset-3" v-on:click="signInUser">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `
        ,
        data : function() {
            return {
                username       : ``,
                password       : ``
            }
        },
        methods : {
            signInUser : function() {
                axios.post('http://localhost:3000/api/admin/signin', {
                    username: this.username,
                    password: this.password,
                })
                .then((response) => {
                    if(response.status == 200) {
                        this.$emit('add-user-data', response.data.data)                    
                        alert('Login Success')
                        location.reload()
                        $('#modalSignIn').modal('hide')
                    } else {
                        alert('Login Failed, please check your username or password')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            },
        }
    }
)