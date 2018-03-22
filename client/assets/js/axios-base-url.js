const hostname = document.location.hostname;
var request;

if (hostname == '127.0.0.1' || hostname == 'localhost')
    request = axios.create({ baseURL: 'http://localhost:3000/' });
else
    request = axios.create({ baseURL: 'http://api-tokobuku.ardhiansyahmp.com/' });