import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TaskField } from 'Contracts/enums'

export default class EditTasksValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    tasks: schema.array().members(
      schema.object().members({
        id: schema.number(),
        index: schema.number.optional(),
        field: schema.enum.optional([TaskField.TODO, TaskField.IN_PROGRESS, TaskField.DONE]),
        content: schema.string.optional([rules.maxLength(1000)]),
      })
    ),
  })

  public messages: CustomMessages = {
    required: 'The {{ field }} is required to create a new task',
    maxLength: 'The {{ field }} can contain maximum of {{ options.maxLength }} chars long',
  }
}
