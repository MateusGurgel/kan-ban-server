import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateKanbanValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.maxLength(32)]),
  })

  public messages: CustomMessages = {
    required: 'The {{ field }} is required to create a new account',
    maxLength: 'The {{ field }} can contain maximum of {{ options.maxLength }} chars long',
  }
}
