# Read all catalogs

Items are joined with full details based on item property catalogs

**URL** : `/catalogs`

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "status": 200,
    "item": [{
        "id": "<catalogid>",
        "name": "IKEA Catalog"
    },{
        "id": "<catalogid>",
        "name": "IKEA Catalog"
    },{
        "id": "<catalogid>",
        "name": "IKEA Catalog"
    },{
        "id": "<catalogid>",
        "name": "IKEA Catalog"
    }]
}
```