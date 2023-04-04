import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TaskField } from 'Contracts/enums'

export default class EditTaskValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    content: schema.string.optional({}, [rules.minLength(1), rules.maxLength(1000)]),
    field: schema.enum.optional([TaskField.TODO, TaskField.IN_PROGRESS, TaskField.DONE]),
  })
}
