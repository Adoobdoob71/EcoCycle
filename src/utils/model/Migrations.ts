import { addColumns, createTable, schemaMigrations } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    {
      // ⚠️ Set this to a number one larger than the current schema version
      toVersion: 2,
      steps: [
        // See "Migrations API" for more details
        addColumns({
          table: 'items_recycled',
          columns: [
            { name: "created_at", type: "number" },
          ],
        }),
      ],
    },
    ],
})
