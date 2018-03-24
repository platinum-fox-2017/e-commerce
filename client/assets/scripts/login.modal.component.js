Vue.component("login-component", {
  template: `
  <div class="modal fade" id="adminModal" tabindex="-1" role="dialog" aria-labelledby="adminModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="adminModalLabel">Login</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label class="col-form-label">E-mail</label>
                                <input class="form-control" name="email"
                                    type="text" placeholder="Email" v-model="email">
                            </div>
                            <div class="form-group">
                                <label class="col-form-label">Password</label>
                                <input type="password" class="form-control" v-model="password">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" v-on:click="adminlogin(email,password)">Login</button>
                    </div>
                </div>
            </div>
        </div>
  `
});