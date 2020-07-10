# Update users

**URL** : `/user`

**Method** : `POST`

**Auth required** : YES. Elevated and self.

**Data constraints**

```json
{
    "id": "[userid]", // required
    "email": "[valid email address]",
    "username": "[String]",
    "name": "[String]",
    "password": "[String]"
}
```

**Data example**

```json
{
    "password": "MyNewPassword",
    "name:": "Legolas"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

## Error Response

**Condition** : 

**Code** : `500 SERVER ERROR`

**Content** :

```json
{
    "status": 500,
    "error": "Could not update user"
}
```

## Error Response

**Condition** : Password is incorrect

**Code** : `403 BAD REQUEST`

**Content** :

```json
{
    "status": 403,
    "error": "Incorrect password"
}
```