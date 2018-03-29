window.fbAsyncInit = function() {
  FB.init({
    appId      : '2003026586628434',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.8'
  });
    
  FB.AppEvents.logPageView();   
    
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));




function statusChangeCallback(response) {
  console.log("response",response)
  if(response.status === 'connected') {
    console.log("log in and authenticated")
    axios({
      method:'post',
      url:'http://api-kameraku.haripermadi.com/login/fbsignin',
      headers :{
        fb_token:response.authResponse.accessToken
      }
    }).then(function(resLogin){
        console.log("resLogin",JSON.stringify(resLogin));
        localStorage.setItem('token',resLogin.data.data.token)
        localStorage.setItem('userId',resLogin.data.data._id)
        localStorage.setItem('fbId',resLogin.data.data.fbId)
        // location.reload();
        
    }).catch(function(err){
      console.log(err)
    })
      
  }else{
    console.log('not authenticated')
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    console.log("respon login:",response)
    statusChangeCallback(response);
  });
}

function logout() {
  console.log('masuk sini')
  console.log("fbid",this.fbId)
  localStorage.clear()
  // if(this.fbId !==null){
  //   FB.logout(function(response) {
  //     localStorage.clear()
  //     console.log('user log out fb')
  //     // statusChangeCallback(response)
  //   })
  // }else{
  //   localStorage.clear()
  // }
   
}

