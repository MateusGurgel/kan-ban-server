import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string([rules.confirmed(), rules.minLength(4)]),
  })
}
