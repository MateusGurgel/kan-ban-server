import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TaskField } from 'Contracts/enums'

export default class EditTaskValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    index: schema.number.optional(),
    content: schema.string.optional([rules.maxLength(1000)]),
    field: schema.enum.optional([TaskField.TODO, TaskField.IN_PROGRESS, TaskField.DONE]),
  })

  public messages: CustomMessages = {
    required: 'The {{ field }} is required to create a new account',
    maxLength: 'The {{ field }} can contain maximum of {{ options.maxLength }} chars long',
  }
}
