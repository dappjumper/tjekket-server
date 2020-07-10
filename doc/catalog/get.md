# Read catalogs

Items are joined with full details based on item property catalogs

**URL** : `/catalog/{itemid}`

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "status": 200,
    "item": {
        "id": "<catalogid>",
        "name": "IKEA Catalog",
        "items": "[ [ Item ], [ Item ] ]"
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

**Condition** : Catalog with that ID not found

**Code** : `404 NOT FOUND`

**Content** :

```json
{
    "status": 404,
    "error": "Not found"
}
```

## Error Response

**Condition** : Something went wrong trying to populate items array

**Code** : `500 SERVER ERROR`

**Content** :

```json
{
    "status": 500,
    "error": "Failed to populate catalog"
}
```