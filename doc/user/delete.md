# Delete users

**URL** : `/user`

**Method** : `DELETE`

**Auth required** : YES. Elevated and self.

**Data constraints**

```json
{
    "id": "userid", // optional*
}
```
* Only authorized users can delete non-self user

**Data example**

```json
{
    "id": "<userid>"
}
```

## Success Response

**Code** : `200 OK`

## Error Response

**Condition** : Non-elevated user tries to delete non-self user

**Code** : `403 FORBIDDEN`

**Content** :

```json
{
    "status": 403,
    "error": "Unauthorized"
}
```

## Error Response

**Condition** : Unexpected error

**Code** : `500 SERVER ERROR`

**Content** :

```json
{
    "status": 500,
    "error": "Could not delete user"
}
```