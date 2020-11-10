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
  "errors": "Email is required!, Password min. 6 characters!"
}
```

_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
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
  "email": "odading@mail.com",
  "password": "asdasd"
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
  "errors": "Email is required!, Password min. 6 characters!"
}
```
_Response (401 - Unauthorized)_
```
{
  "errors": "Wrong password/email!"
}
```

_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
}
```
---