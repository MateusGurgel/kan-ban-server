import { DateTime } from 'luxon'
import { BaseModel, HasMany, beforeSave, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Kanban from './Kanban'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  @hasMany(() => Kanban)
  public kanbans: HasMany<typeof Kanban>

  @column({ isPrimary: true })
  public id: number

  @column({})
  public email: string

  @column({ serializeAs: null })
  public password: string

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
