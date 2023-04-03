import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { TaskField } from 'Contracts/enums'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column({})
  public kanbanId: number

  @column({})
  public columnName: string

  @column()
  public field: TaskField

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
