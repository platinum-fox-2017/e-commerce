Vue.component('list-menu', {
    props: ['cart'],
    template: `
    <div class="collapse navbar-collapse" id="navbarHeader">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Kategori
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Novel</a>
                    <a class="dropdown-item" href="#">Komik</a>
                    <a class="dropdown-item" href="#">Teknik</a>
                </div>
            </li>
        </ul>
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#">Sign in</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="admin.html">Admin</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#"><i class="fa fa-search"></i></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" data-toggle="modal" data-target="#cartModal"><i class="fa fa-shopping-cart"></i> {{ cart.length }}</a>
            </li>
        </ul>
    </div>    
    `
});