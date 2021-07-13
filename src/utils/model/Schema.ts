import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 3,
  tables: [
    tableSchema({
      name: "items_recycled",
      columns: [
        { name: "created_at", type: "number" },
        { name: "bottles", type: "number" },
        { name: "plastic_items", type: 'number' },
        { name: "metallic_items", type: 'number'},
        { name: "paper_items", type: 'number'},
        { name: "all_items", type: 'number'}
      ]
    }),
    tableSchema({
      name: "bottles_recycled",
      columns: [
        { name: "created_at", type: "number" },
        { name: "amount", type: "number" }
      ]
    }),
    tableSchema({
      name: 'friends',
      columns: [
        { name: "friend_id", type: "string", isIndexed: true }
      ]
    })
  ]
});

