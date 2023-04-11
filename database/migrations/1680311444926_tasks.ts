import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { TaskField } from 'Contracts/enums'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('index').notNullable
      table.text('content')
      table.enum('field', Object.values(TaskField)).defaultTo(TaskField.TODO).notNullable()
      table.integer('kanban_id').unsigned().references('kanbans.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
