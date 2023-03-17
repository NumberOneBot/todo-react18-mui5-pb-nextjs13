migrate((db) => {
  const collection = new Collection({
    "id": "z4fdzpa2d4xbnh1",
    "created": "2023-03-13 14:49:50.742Z",
    "updated": "2023-03-13 14:49:50.742Z",
    "name": "todo",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
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
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("z4fdzpa2d4xbnh1");

  return dao.deleteCollection(collection);
})
