Vue.component('tokobuku-footer', {
    template: `
    <nav class="page-footer font-small stylish-color-dark pt-4 mt-4">
        <div class="container text-center text-md-left">
            <div class="row text-center text-md-left mt-4 pb-4">
                <div class="col-md-4 col-lg-4 col-xl-4 mx-auto mt-4">
                    <h6 class="text-uppercase mb-4 font-weight-bold">tokobuku.com</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at quam et tellus varius cursus ut sed arcu. Vestibulum fringilla elit in risus dictum, id rhoncus lorem consequat.</p>
                </div>                    
                <hr class="w-70 clearfix d-md-none">
        
                <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-4">
                    <h6 class="text-uppercase mb-4 font-weight-bold">Products</h6>
                    <p><a href="/">Books</a></p>
                </div>
                <hr class="w-70 clearfix d-md-none">
            
                <div class="col-md-4 col-lg-4 col-xl-4 mx-auto mt-4">
                    <h6 class="text-uppercase mb-4 font-weight-bold">Contact</h6>
                    <p><i class="fa fa-home mr-3"></i> Jakarta, Indonesia</p>
                    <p><i class="fa fa-envelope mr-3"></i> ardhimetanaputra@gmail.com</p>
                    <p><i class="fa fa-phone mr-3"></i> + 01 234 567 88</p>
                    <p><i class="fa fa-print mr-3"></i> + 01 234 567 89</p>
                </div>
            </div>
            <hr>
            <div class="row py-3 d-flex align-items-center">
                <div class="col-md-8 col-lg-8">
                    <p class="text-center text-md-left grey-text">© 2018 Copyright: <a href="#"><strong> M. Ardhiansyah Metana Putra</strong></a></p>
                </div>
                <div class="col-md-4 col-lg-4 ml-lg-0">
                    <div class="text-center text-md-right">
                        <ul class="list-unstyled list-inline">
                            <li class="list-inline-item"><a class="btn-floating btn-sm rgba-white-slight mx-1"><i class="fa fa-facebook"></i></a></li>
                            <li class="list-inline-item"><a class="btn-floating btn-sm rgba-white-slight mx-1"><i class="fa fa-twitter"></i></a></li>
                            <li class="list-inline-item"><a class="btn-floating btn-sm rgba-white-slight mx-1"><i class="fa fa-google-plus"></i></a></li>
                            <li class="list-inline-item"><a class="btn-floating btn-sm rgba-white-slight mx-1"><i class="fa fa-linkedin"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    `
})