import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Task from './Task'

export default class Kanban extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column({})
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Task)
  public tasks: HasMany<typeof Task>
}
