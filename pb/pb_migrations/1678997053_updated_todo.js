migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z4fdzpa2d4xbnh1")

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yiqbojja",
    "name": "cost",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 8
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z4fdzpa2d4xbnh1")

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
        "completed"
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

  // remove
  collection.schema.removeField("yiqbojja")

  return dao.saveCollection(collection)
})
