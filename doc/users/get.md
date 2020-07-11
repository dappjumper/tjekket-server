# Read all users

**URL** : `/users`

**Method** : `GET`

**Auth required** : YES. Elevated.

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "status": 200,
    "token": "xxxxx.yyyyy.zzzzz",
    "users": [{
        "_id": "5f08354398c5f52aa4d9ab79",
        "name": "I am not John Doe",
        "isVerified": false,
        "role": "user",
        "email": "someuser@somedomain.com",
        "username": "johnny"
    },{
        "_id": "ejd8f3r8jvduuwehri878347",
        "name": "Johan",
        "isVerified": false,
        "role": "user",
        "email": "someuser2@somedomain.com",
        "username": "johnny2"
    },]
}
```

## Error Response

**Condition** : If not authenticated is admin or owner

**Code** : `403 FORBIDDEN`

**Content** :

```json
{
    "status": 403,
    "error": "Unauthorized access"
}
```