// Facebook Login 

window.fbAsyncInit = function() {
  FB.init({
    appId      : '218559235391265',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.12'
  });
  
  FB.getLoginStatus(function(response) {
    console.log(response);
    // statusChangeCallback(response);
  });
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback (response) {
  if(response.status === 'connected') {
    console.log('Logged in and authenticated');
  } else {
    console.log('Not Authenticated');
  }
}

function checkLoginState() {
  FB.login((response)=>{
    console.log(response);
  },{
    scope:'email'
  })
}

//  End of Facebook Login 