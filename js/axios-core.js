const hostname = document.location.hostname;

if (hostname == 'localhost' || hostname == '127.0.0.0') {
  var request = axios.create({
    baseURL: 'http://localhost:3000',
  });
} else {

  var request = axios.create({
    baseURL: 'http://ekom-api.geekosta.com',
  });

}
