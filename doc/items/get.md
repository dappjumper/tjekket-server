# Read all items

**URL** : `/items`

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "status": 200,
    "items": [{
        "id": "<itemid>",
        "name": "IKEA Brunhjorn",
        "price": 500,
        "catalogs": "[<catalogid>, <catalogid>]"
    },{
        "id": "<itemid>",
        "name": "IKEA Hilda",
        "price": 23,
        "catalogs": "[<catalogid>]"
    },{
        "id": "<itemid>",
        "name": "IKEA Oaka",
        "price": 13,
        "catalogs": "[<catalogid>, <catalogid>]"
    }]
}
```