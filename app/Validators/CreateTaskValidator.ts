import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateTaskValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    content: schema.string([rules.maxLength(1000)]),
  })

  public messages: CustomMessages = {
    required: 'The {{ field }} is required to create a new account',
    maxLength: 'The {{ field }} can contain maximum of {{ options.maxLength }} chars long',
  }
}
