# Create users

**URL** : `/user`

**Method** : `PUT`

**Auth required** : NO

**Data constraints**

```json
{
    "email": "[unique email address]", // required
    "username": "[unique username]", // required
    "password": "[password in plain text]", //required
}
```

**Data example**

```json
{
    "email": "tobias@dappjump.io",
    "username": "dappjumper",
    "password": "1234"
}
```

## Registration response

**Condition** : If username and email are not taken

**Code** : `201 CREATED`

**Content example**

```json
{
    "status": 200,
    "token": "xxxxx.yyyyy.zzzzz",
    "user": {
        "_id": "5f08354398c5f52aa4d9ab79",
        "name": "I am not John Doe",
        "isVerified": false,
        "role": "user",
        "email": "someuser@somedomain.com",
        "username": "johnny"
    }
}
```

## Login Response

**Condition** : If username, email and password match request

**Code** : `200 OK`

**Content example**

```json
{
    "status": 200,
    "token": "xxxxx.yyyyy.zzzzz",
    "user": {
        "_id": "5f08354398c5f52aa4d9ab79",
        "name": "I am not John Doe",
        "isVerified": false,
        "role": "user",
        "email": "someuser@somedomain.com",
        "username": "johnny"
    }
}
```

## Error Response

**Condition** : If either email, password, or username is not in request body

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "status": 400,
    "error": "No <field> specified"
}
```

## Error Response

**Condition** : Password is incorrect

**Code** : `403 FORBIDDEN`

**Content** :

```json
{
    "status": 403,
    "error": "Incorrect password"
}
```

## Error Response

**Condition** : If email or username does not match what is stored

**Code** : `409 CONFLICT`

**Content** :

```json
{
    "status": 409,
    "error": "Email and username does not match existing user"
}
```

## Error Response

**Condition** : Unexpected error occured

**Code** : `500 SERVER ERROR`

**Content** :

```json
{
    "status": 500,
    "error": "Server error"
}
```