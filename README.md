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
### GET /products/:id

> Get product by id

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
### POST /carts

> Create new cart

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```

_Request Body_
```
{
  "ProductId": <number>
}
```

_Response (201 - Created)_
```
{
    "id": 2,
    "UserId": 2,
    "ProductId": 2,
    "quantity": 1,
    "status": 1,
    "updatedAt": "2020-11-19T00:40:15.735Z",
    "createdAt": "2020-11-19T00:40:15.735Z"
}
```
_Response (400 - Bad request)_
```
{
  "msg": "product not found!"
}
```

_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### GET /carts

> Get all cart

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
        "id": 1,
        "UserId": 2,
        "ProductId": 5,
        "quantity": 2,
        "status": 1,
        "total": 8400000,
        "createdAt": "2020-11-19T00:38:04.475Z",
        "updatedAt": "2020-11-19T00:40:06.341Z",
        "Product": {
            "id": 5,
            "name": "Nemeziz 19.1",
            "image_url": <image_url>,
            "price": 4200000,
            "stock": 45,
            "CategoryId": 2,
            "createdAt": "2020-11-19T00:30:47.237Z",
            "updatedAt": "2020-11-19T00:30:47.237Z"
        }
    },
    {
        "id": 2,
        "UserId": 2,
        "ProductId": 2,
        "quantity": 1,
        "status": 1,
        "total": 1100000,
        "createdAt": "2020-11-19T00:40:15.735Z",
        "updatedAt": "2020-11-19T00:40:15.735Z",
        "Product": {
            "id": 2,
            "name": "Adidas Adizero Adios 5",
            "image_url": <image_url>,
            "price": 1100000,
            "stock": 45,
            "CategoryId": 3,
            "createdAt": "2020-11-19T00:27:10.945Z",
            "updatedAt": "2020-11-19T00:27:10.945Z"
        }
    }
]
```
_Response (401 - Not authorized!)_
```
{
  "msg": "not authenticated!"
}
```
_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### GET /carts/:id

> Get cart by id

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
    "id": 1,
    "UserId": 2,
    "ProductId": 5,
    "quantity": 2,
    "status": 1,
    "createdAt": "2020-11-19T00:38:04.475Z",
    "updatedAt": "2020-11-19T00:40:06.341Z",
    "Product": {
        "id": 5,
        "name": "Nemeziz 19.1",
        "image_url": <image_url>,
        "price": 4200000,
        "stock": 45,
        "CategoryId": 2,
        "createdAt": "2020-11-19T00:30:47.237Z",
        "updatedAt": "2020-11-19T00:30:47.237Z"
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
  "msg": "cart not found!"
}
```
_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### PUT /carts/:id

> Update cart

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
  "order": <number>
}
```

_Response (200 - OK)_
```
{
  "id": 4,
  "UserId": 2,
  "ProductId": 6,
  "quantity": 2,
  "status": 1,
  "createdAt": "2020-11-19T00:57:25.035Z",
  "updatedAt": "2020-11-19T00:57:35.228Z"
}
```
_Response (400 - Bad request)_
```
{
  "msg": "wrong order!"
}
{
    "msg": "can't add quantity more than stock !"
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
  "msg": "cart not found!"
}
```
_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### DELETE /carts/:id

> Delete cart by id

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
  "msg": "delete cart succeed"
}
```
_Response (400 - Bad request)_
```
{
  "msg": "UserId/CartId is invalid!"
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
  "msg": "cart not found!"
}
```
_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### GET /customer-products

> Get all products for customer

_Request Header_
```
<not needed>
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
    "image_url": <string>,
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
    "image_url": <string>,
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
_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### GET /customer-banners

> Get all banner for customer

_Request Header_
```
<not needed>
```

_Request Body_
```
<not needed>
```

_Response (200 - OK)_
```
[
  {
    "id": 1,
    "title": "Nike cleats",
    "status": "unactive",
    "image_url": "https://www.uksoccershop.com/blog/wp-content/uploads/2016/09/nike-september-2016-boots-banner-soleplate.jpg",
    "createdAt": "2020-11-19T00:15:55.829Z",
    "updatedAt": "2020-11-19T00:18:57.608Z"
  },
  {
    "id": 2,
    "title": "Nike Elite",
    "status": "active",
    "image_url": "https://www.prodirectsoccer.com/siteimages/global/article/nike/elite-pack/desktop/home-top-banner.jpg",
    "createdAt": "2020-11-19T00:16:27.397Z",
    "updatedAt": "2020-11-19T00:16:45.138Z"
  }
]
```
_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### GET /customer-categories

> Get all category for customer

_Request Header_
```
<not needed>
```

_Request Body_
```
<not needed>
```

_Response (200 - OK)_
```
[
  {
    "id": 1,
    "name": "Sepatu Futsal",
    "createdAt": "2020-11-19T00:11:40.599Z",
    "updatedAt": "2020-11-19T00:11:40.599Z"
  },
  {
    "id": 2,
    "name": "Sepatu Sepakbola",
    "createdAt": "2020-11-19T00:11:40.599Z",
    "updatedAt": "2020-11-19T00:11:40.599Z"
  },
]
```
_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### POST /categories

> Create new category

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```

_Request Body_
```
{
  "name": <string>
}
```

_Response (201 - Created)_
```
{
    "id": 6,
    "name": "Shorts",
    "updatedAt": "2020-11-19T01:13:49.174Z",
    "createdAt": "2020-11-19T01:13:49.174Z"
}
```
_Response (400 - Bad request)_
```
{
    "msg": "Category name cannot be empty!"
}
```

_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### GET /categories

> Get all category

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
        "id": 1,
        "name": "Sepatu Futsal",
        "createdAt": "2020-11-19T00:11:40.599Z",
        "updatedAt": "2020-11-19T00:11:40.599Z"
    },
    {
        "id": 2,
        "name": "Sepatu Sepakbola",
        "createdAt": "2020-11-19T00:11:40.599Z",
        "updatedAt": "2020-11-19T00:11:40.599Z"
    }
]
```
_Response (401 - Not authorized!)_
```
{
  "msg": "not authenticated!"
}
```
_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### GET /categories/:id

> Get category by id

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
    "id": 4,
    "name": "Miscellaneous",
    "createdAt": "2020-11-19T00:14:37.364Z",
    "updatedAt": "2020-11-19T00:14:37.364Z"
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
  "msg": "Category not found!"
}
```
_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### PUT /categories/:id

> Update category

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
  "name": <string>
}
```

_Response (200 - OK)_
```
{
    "id": 6,
    "name": "Pants",
    "createdAt": "2020-11-19T01:13:49.174Z",
    "updatedAt": "2020-11-19T01:16:45.936Z"
}
```
_Response (400 - Bad request)_
```
{
    "Category name cannot be empty!"
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
  "msg": "Category not found!"
}
```
_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### DELETE /categories/:id

> Delete category by id

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
   "msg": "Category deleted successfully!"
}
```
_Response (400 - Bad request)_
```
{
  "msg": "Category id is not valid!"
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
  "msg": "Category not found!"
}
```
_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### POST /banners

> Create new banner

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```

_Request Body_
```
{
  "title": <string>,
  "image_url": <string>,
  "status": <string>
}
```

_Response (201 - Created)_
```
{
    "id": 5,
    "title": "Big sale",
    "status": "active",
    "image_url": <image_url>,
    "updatedAt": "2020-11-19T01:20:17.126Z",
    "createdAt": "2020-11-19T01:20:17.126Z"
}
```
_Response (400 - Bad request)_
```
{
    "msg": "Title cannot be empty!"
}
{
    "msg": "Status cannot be empty!"
}
```
_Response (401 - Unauthorized)_
```
{
  "msg": "not authorized!"
}
```
_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### GET /banners

> Get all banner

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
        "id": 1,
        "title": "Nike cleats",
        "status": "unactive",
        "image_url": <image_url>,
        "createdAt": "2020-11-19T00:15:55.829Z",
        "updatedAt": "2020-11-19T00:18:57.608Z"
    },
    {
        "id": 2,
        "title": "Nike Elite",
        "status": "active",
        "image_url": <image_url>,
        "createdAt": "2020-11-19T00:16:27.397Z",
        "updatedAt": "2020-11-19T00:16:45.138Z"
    }
]
```
_Response (401 - Not authorized!)_
```
{
  "msg": "not authenticated!"
}
```
_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### GET /banners/:id

> Get banner by id

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
    "id": 2,
    "title": "Nike Elite",
    "status": "active",
    "image_url": <image_url>,
    "createdAt": "2020-11-19T00:16:27.397Z",
    "updatedAt": "2020-11-19T00:16:45.138Z"
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
  "msg": "Banner not found!"
}
```
_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### PUT /banners/:id

> Update category

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
  "title": <string>,
  "image_url": <string>,
  "status": <string>
}
```

_Response (200 - OK)_
```
{
    "id": 4,
    "title": "Adidas All In",
    "status": "unactive",
    "image_url": <image_url>,
    "createdAt": "2020-11-19T00:18:53.331Z",
    "updatedAt": "2020-11-19T01:30:22.444Z"
}
```
_Response (400 - Bad request)_
```
{
    "Banner name cannot be empty!"
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
  "msg": "Banner not found!"
}
```
_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
### DELETE /banners/:id

> Delete banner by id

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
   "msg": "Banner deleted successfully!"
}
```
_Response (400 - Bad request)_
```
{
  "msg": "Banner id is not valid!"
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
  "msg": "Banner not found!"
}
```
_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---