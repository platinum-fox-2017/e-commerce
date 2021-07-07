// const server = 'http://35.198.234.210'

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1574957469223942',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.12'
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v2.12&appId=369326503475419&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function statusChangeCallback(response) {
    if (response.status === 'connected') {
      console.log(response);
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/signin',
        data: {
          access_token: response.authResponse.accessToken,
        }
      }).then(function(response) {
        console.log(response);
        if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('role', response.data.role)
        // window.location = 'index.html';
          if (localStorage.role === 'admin') {
            window.location = 'admin.html'
          }
        }
      });
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
}

function logout() {
  window.FB.logout(function (response) {
    localStorage.clear()
    // statusChangeCallback(response)
    window.location.reload()
  })
}
