 window.fbAsyncInit = function() {
    FB.init({
      appId      : '1000063793478369',
      cookie     : true,
      xfbml      : true, 
      version    : 'v2.8'
    });

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

  };

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected'){
      if(!localStorage.getItem('fbToken')){
      localStorage.setItem('fbToken',response.authResponse.accessToken)
        axios({
          method:"post",
          url:"http://localhost:3000/user/signin",
          headers:{
            access_token : localStorage.getItem('fbToken')
          }
        }).then(user=>{
          console.log(user)
          localStorage.setItem('idUser',user.data.userData._id)
        }).catch(err=>console.log(err))
      }
    } else {
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
  function logout(){
    localStorage.clear()
    FB.logout()
    location.reload()
  }