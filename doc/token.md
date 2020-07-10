# Authentication

This is the basic protection layer before route logic is applied

You must supply the following in your request header for protected routes

[Click here](user/put.md) for information on how to acquire

**Data example**

```json
{
    "Authentication": "Bearer <TOKEN>"
}
```

## Error Response

**Condition** : Authentication header not present

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
    "status": 400,
    "error": "Missing Authentication header"
}
```

## Error Response

**Condition** : Incorrect Authentication header format

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "status": 400,
    "error": "Malformed Authentication header. Use format: Bearer <token>"
}
```

## Error Response

**Condition** : The token is invalid

**Code** : `403 FORBIDDEN`

**Content** :

```json
{
    "status": 403,
    "error": "Bad Authentication token"
}
```