# Update catalogs

**URL** : `/catalog`

**Method** : `POST`

**Auth required** : YES. Elevated only.

**Data constraints**

```json
{
    "id": "[catalogid]", // required
    "name": "[String]",
}
```

**Data example**

```json
{
    "id": "<catalogid>",
    "name": "IKEA Catalog",
}
```

## Success Response

**Code** : `200 OK`

## Error Response

**Condition** : Missing required id

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "status": 400,
    "error": "ID not specified"
}
```

## Error Response

**Condition** : Non-elevated access

**Code** : `403 FORBIDDEN`

**Content** :

```json
{
    "status": 403,
    "error": "Not authorized"
}
```

## Error Response

**Condition** : Catalog with that id not found

**Code** : `404 NOT FOUND`

**Content** :

```json
{
    "status": 404,
    "error": "Catalog not found"
}
```

## Error Response

**Condition** : Something unexpected went wrong

**Code** : `500 SERVER ERROR`

**Content** :

```json
{
    "status": 500,
    "error": "Failed updating catalog"
}
```