# Read users

**URL** : `/user/{userid}`

**Method** : `GET`

**Auth required** : YES. Elevated and self.

## Success Response

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

**Condition** : User ID not found in database

**Code** : `404 NOT FOUND`

**Content** :

```json
{
    "status": 404,
    "error": "User not found"
}
```

## Error Response

**Condition** : If authenticated as user and not same ID as requested resource

**Code** : `403 FORBIDDEN`

**Content** :

```json
{
    "status": 404,
    "error": "User not found"
}
```