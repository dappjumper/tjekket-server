# Read items

**URL** : `/item/{itemid}`

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "status": 200,
    "item": {
        "id": "<itemid>",
        "name": "IKEA Brunhjorn",
        "price": 500,
        "catalogs": "[<catalogid>, <catalogid>]"
    }
}
```

## Error Response

**Condition** : ID Not specified

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "status": 400,
    "error": "ID not specified"
}
```

## Error Response

**Condition** : Item with that ID not found

**Code** : `404 NOT FOUND`

**Content** :

```json
{
    "status": 404,
    "error": "Not found"
}
```