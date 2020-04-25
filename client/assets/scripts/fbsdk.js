const server = 'http://localhost:3000'
// const server = 'http://35.198.222.140'

window.fbAsyncInit = function () {
    FB.init({
        appId: '202334057028734',
        cookie: true,
        xfbml: true,
        version: 'v2.12'
    });

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    if (response.status == "connected") {
        axios({
            method: 'post',
            url: server + '/api/login',
            headers: {
                access_token: response.authResponse.accessToken,
            }
        }).then(function (success) {
            if (success.status == 200 && window.location.pathname === '/index.html') {
                //
            }
        })
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

function fb_login() {
    FB.login(function (response) {
        if (response.authResponse) {
            localStorage.setItem("access_token", response.authResponse.accessToken) // set localStorage
            axios.post(server + '/api/login', {}, {
                    headers: {
                        access_token: response.authResponse.accessToken
                    }
                })
                .then(function (response) {
                    window.location.href = "/index.html"
                    localStorage.setItem("token_jwt", response.data.token) // set localStorage
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {
        scope: 'public_profile,email'
    });
}

function fb_logout() {
    // localStorage.clear();
    window.FB.logout(function (res) {
        localStorage.clear();
        window.location = "index.html";
    })
}