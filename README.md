# ecommerce_server
Ecommerce App is an application of a mini e-commercer web app. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /register

> Create new user

_Request Header_
```
<not needed>
```

_Request Body_
```
{
  "email": "odading@mail.com",
  "password": "asdasd",
  "full_name": "Mang Oleh"
}
```

_Response (201 - Created)_
```
{
  "email": "odading@mail.com",
  "full_name": "Mang Oleh"
}
```
_Response (400 - Bad request)_
```
{
  "msg": "Email is required!, Password min. 6 characters!"
}
```

_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### POST /login

> Login user

_Request Header_
```
<not needed>
```

_Request Body_
```
{
  "email": "admin@mail.com",
  "password": "1234"
}
```

_Response (200 - OK)_
```
{
  "accesstoken": "<your access token>",
  "full_name": "Mang Oleh"
}
```
_Response (400 - Bad request)_
```
{
  "msg": "Email is required!, Password min. 6 characters!"
}
```
_Response (401 - Unauthorized)_
```
{
  "msg": "Wrong password/email!"
}
```

_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### POST /products

> Create new products

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```

_Request Body_
```
{
  "name": "Nike Air Jordan",
  "image_url": "nike-air-jordan.jpg",
  "price": 8000000,
  "stock": 12,
  "CategoryId": 3
}
```

_Response (201 - Created)_
```
{ 
  "id": 1
  "name": "Nike Air Jordan",
  "image_url": "nike-air-jordan.jpg",
  "price": 8000000,
  "stock": 12,
  "CategoryId": 3
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```
_Response (400 - Bad request)_
```
{
  "msg": "Name cannot be empty!, Image URL cannot be empty!"
}
```

_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### GET /products

> Get all products

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```

_Request Body_
```
<not needed>
```

_Response (200 - OK)_
```
[
  {
    "id": 1
    "name": "Nike Air Jordan",
    "image_url": "nike-air-jordan.jpg",
    "price": 8000000,
    "stock": 12,
    "CategoryId": 3
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
    "Category": {
      "id": 3,
      "name": "Sepatu Casual",
      "createdAt": "2020-11-14T02:56:20.348Z",
      "updatedAt": "2020-11-14T02:56:20.348Z"
    }
  },
  {
    "id": 2,
    "name": "Adidas Nemeziz",
    "image_url": "https://assets.adidas.com/images/w_600,f_auto,q_auto/49d66726bbbf41f99777aab600fd59e7_9366/Nemeziz_19.1_Firm_Ground_Cleats_Grey_EF8281_01_standard.jpg",
    "price": 3400000,
    "stock": 14,
    "CategoryId": 1,
    "createdAt": "2020-11-14T02:57:57.057Z",
    "updatedAt": "2020-11-14T05:52:47.261Z",
    "Category": {
        "id": 1,
        "name": "Sepatu Futsal",
        "createdAt": "2020-11-14T02:56:20.348Z",
        "updatedAt": "2020-11-14T02:56:20.348Z"
    }
  }
]
```
_Response (401 - Not authorized!)_
```
{
  "msg": "Not authorized!"
}
```
_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### GET /products

> Get all products

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```
_Request Params_
```
{
  "id": <number>
}
```
_Request Body_
```
<not needed>
```
_Response (200 - OK)_
```
{
  "id": 1
  "name": "Nike Air Jordan",
  "image_url": "nike-air-jordan.jpg",
  "price": 8000000,
  "stock": 12,
  "CategoryId": 3
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
  "Category": {
    "id": 3,
    "name": "Sepatu Casual",
    "createdAt": "2020-11-14T02:56:20.348Z",
    "updatedAt": "2020-11-14T02:56:20.348Z"
  }
}
```
_Response (401 - Not authorized!)_
```
{
  "msg": "not authorized!"
}
```
_Response (404 - Not Found!)_
```
{
  "msg": "Product not found!"
}
```
_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### PUT /products/:id

> Update product

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```
_Request Params_
```
{
  "id": <number>
}
```
_Request Body_
```
{
  "name": "Nike Air Jordan",
  "image_url": "nike-air-jordan.jpg",
  "price": 8000000,
  "stock": 12,
  "CategoryId": 3
}
```

_Response (200 - OK)_
```
{
  "id": 1
  "name": "Nike Air Jordan",
  "image_url": "nike-air-jordan.jpg",
  "price": 8000000,
  "stock": 12,
  "CategoryId": 3
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
  "Category": {
    "id": 3,
    "name": "Sepatu Casual",
    "createdAt": "2020-11-14T02:56:20.348Z",
    "updatedAt": "2020-11-14T02:56:20.348Z"
  }
}
```
_Response (400 - Bad request)_
```
{
  "msg": "Name is required!, CategoryId is required!"
}
```
_Response (401 - Not authorized!)_
```
{
  "msg": "not authorized!"
}
```
_Response (404 - Not Found!)_
```
{
  "msg": "Product not found!"
}
```
_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### DELETE /products/:id

> Delete products by id

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```
_Request Params_
```
{
  "id": <number>
}
```
_Request Body_
```
<not needed>
```

_Response (201 - Created)_
```
{
  "msg" : "Product deleted successfully!"
}
```
_Response (400 - Bad request)_
```
{
  "msg": "Product ID is not valid!"
}
```
_Response (401 - Not authorized!)_
```
{
  "msg": "not authorized!"
}
```
_Response (404 - Not Found!)_
```
{
  "msg": "Product not found!"
}
```
_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
