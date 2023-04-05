import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email()]),
    password: schema.string([rules.minLength(8), rules.maxLength(64)]),
  })

  public messages: CustomMessages = {
    required: 'The {{ field }} is required to create a new account',
    email: 'The {{ field }} field must be an valid email',
    minLength: 'The {{ field }} can be at least {{ options.minLength }} chars long',
    maxLength: 'The {{ field }} can contain maximum of {{ options.maxLength }} chars long',
  }
}
