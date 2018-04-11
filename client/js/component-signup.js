Vue.component(
    'component-signup',
    {
        template :
        `
        <section class="content" style="margin-top:40px">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="form-group col-md-8 col-md-offset-2">
                        <label>Username</label>
                        <input id="login-username" type="text" class="form-control" placeholder="Your Username" v-model="username">
                    </div>
                    
                    <div class="form-group col-md-8 col-md-offset-2">
                        <label>Password</label>
                        <input id="login-password" type="password" class="form-control" v-model="password">
                    </div>

                    <div class="form-group col-md-8 col-md-offset-2">
                        <label>Name</label>
                        <input id="login-username" type="text" class="form-control" placeholder="Your Name" v-model="name">
                    </div>

                    <div class="form-group col-md-8 col-md-offset-2">
                        <label>Email</label>
                        <input id="login-username" type="email" class="form-control" placeholder="Your real email" v-model="email">
                    </div>

                    <div class="form-group col-md-8 col-md-offset-2">
                        <label>Gender</label>
                        <select class="form-control" v-model="gender">
                            <option disabled value="">Please select one</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>

                    <div class="form-group col-md-8 col-md-offset-2">
                        <button type="submit" class="btn btn-success" v-on:click="signUpUser">Sign Up</button>
                        <button type="submit" class="btn btn-danger" v-on:click="back">Back</button>                                
                    </div>
                </div>
            </div>
        </section>
        `
        ,
        data: function () {
            return {
                username: ``,
                password: ``,
                name: ``,
                email: ``,
                gender: ``,
            }
        },
        methods: {
            signUpUser: function () {
                axios.post('http://localhost:3000/api/customers/signup', {
                    username: this.username,
                    password: this.password,
                    name: this.name,
                    email: this.email,
                    gender: this.gender,                
                })
                .then((response) => {
                    if(response.status == 200) {
                        localStorage.setItem('userid', response.data.data.id)
                        localStorage.setItem('token', response.data.data.token)
                        localStorage.setItem('email', response.data.data.email)
                        localStorage.setItem('name', response.data.data.name)                                                        
                        location.reload()
                        alert('Sign Up Success, Happy Shopping !')
                    } else {
                        alert('Login Failed, please check your username or password')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            },
            back: function () {
                this.$emit('cancel-login')
            }
        }
    }
)