migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z4fdzpa2d4xbnh1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mjbmt9vj",
    "name": "priority",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 3
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uuq9nrmk",
    "name": "blockers",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vvk4e08g",
    "name": "status",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "new",
        "pending",
        "completed"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uaz4q54o",
    "name": "admitAt",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z4fdzpa2d4xbnh1")

  // remove
  collection.schema.removeField("mjbmt9vj")

  // remove
  collection.schema.removeField("uuq9nrmk")

  // remove
  collection.schema.removeField("vvk4e08g")

  // remove
  collection.schema.removeField("uaz4q54o")

  return dao.saveCollection(collection)
})
