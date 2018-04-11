Vue.component('header-admin', {
    props : ['datauser'],
    template: `
    <header class="main-header">
        <a href="index2.html" class="logo" style="height:65px;position:fixed">
            <span class="logo-mini"><b>A</b>DM</span>
            <span class="logo-lg"><b>A</b>dmin</span>
        </a>

        <nav class="navbar navbar-static-top" role="navigation">
            <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
            </a>

            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <li class="dropdown user user-menu"  v-if="datauser.userId != ''">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" v-on:click="logoutUser">
                            <i class="btn btn-danger">Logout</i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    `
    ,
    methods : {
        logoutUser : function() {
            this.$emit('clear-user-data')
            location.reload()
        }
    }
})