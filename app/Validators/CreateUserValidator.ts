import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string([rules.confirmed(), rules.minLength(8), rules.maxLength(64)]),
  })

  public messages: CustomMessages = {
    'email.unique': 'Email not available',
    'confirmed': 'The password and confirm password fields must match.',
    'required': 'The {{ field }} is required to create a new account',
    'minLength': 'The {{ field }} can be at least {{ options.minLength }} chars long',
    'maxLength': 'The {{ field }} can contain maximum of {{ options.maxLength }} chars long',
  }
}
