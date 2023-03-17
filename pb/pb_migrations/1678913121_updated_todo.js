migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z4fdzpa2d4xbnh1")

  // remove
  collection.schema.removeField("olrrh0pq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "quln9med",
    "name": "cost",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ulksmocs",
    "name": "priority",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "1",
        "2",
        "3"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qr9idrga",
    "name": "blockers",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vhea1iv4",
    "name": "admitAt",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4tsg4x6r",
    "name": "title",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z4fdzpa2d4xbnh1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "olrrh0pq",
    "name": "field2",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("quln9med")

  // remove
  collection.schema.removeField("ulksmocs")

  // remove
  collection.schema.removeField("qr9idrga")

  // remove
  collection.schema.removeField("le09lxiq")

  // remove
  collection.schema.removeField("vhea1iv4")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4tsg4x6r",
    "name": "field1",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
