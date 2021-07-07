# KameraKu e-commerce
layouting e-commerce web app

# what is kameraKu?
adalah sebuah web app e-commerce sederhana dimana user bisa sign up dan login, lalu bisa menambahkan produk ke dalam cart.
Terdapat pula halaman admin untuk menambahkan item baru.

#Build set up

##Server
```
npm install
npm start /nodemon start

```
##Client

```
npm install
npm run dev

```

#Routing

**Route** | **HTTP** | **Descrition**
----------|----------|---------------
/login/signup | POST | sign up user
/login/signin | POST | login user
/login/fbsignin | POST | login user with facebook
/login/admin/signin | POST | login admin
/transaction | GET | show all transaction
/transaction | POST | add new transaction
/transaction/:id | PUT | update transaction
/transaction/:id | DELETE | remove transaction
/transaction/checkout | GET | show checkout items
/items | GET | show all item
/items | POST | add new item

#Demo

For demo apps you can access [kameraku.haripermadi.com](http://kameraku.haripermadi.com)

For admin page
[kameraku.haripermadi.com/admin.html](http://kameraku.haripermadi.com/admin.html)

Halaman admin bisa diakses dengan menggunakan email dan password berikut:

```
email: admin@kameraku.com
password: admin
```