# Create catalogs

**URL** : `/catalog`

**Method** : `PUT`

**Auth required** : YES. Elevated only.

**Data constraints**

```json
{
    "name": "[any name]", // required
}
```

**Data example**

```json
{
    "name": "IKEA Catalog"
}
```

## Success Response

**Code** : `201 CREATED`

**Content example**

```json
{
    "status": 201,
    "catalog": {
        "_id": "5f08354398c5f52aa4d9ab79",
        "name": "IKEA Catalog"
    }
}
```

## Error Response

**Condition** : Missing required field(s)

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "status": 400,
    "error": "<field> not specified"
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

**Condition** : Something unexpected went wrong

**Code** : `500 SERVER ERROR`

**Content** :

```json
{
    "status": 500,
    "error": "Error creating catalog"
}
```