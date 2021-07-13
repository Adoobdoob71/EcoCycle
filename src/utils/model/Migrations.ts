import { addColumns, createTable, schemaMigrations } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    {
      // ⚠️ Set this to a number one larger than the current schema version
      toVersion: 3,
      steps: [
        createTable({
          name: 'friends',
          columns: [
            { name: "friend_id", type: "string", isIndexed: true }
          ]
        })
      ],
    },
    ],
})
