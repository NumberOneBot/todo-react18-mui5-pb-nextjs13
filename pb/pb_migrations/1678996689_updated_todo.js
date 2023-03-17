migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z4fdzpa2d4xbnh1")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "le09lxiq",
    "name": "status",
    "type": "select",
    "required": true,
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z4fdzpa2d4xbnh1")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "le09lxiq",
    "name": "status",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "new",
        "pending",
        "finished"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
