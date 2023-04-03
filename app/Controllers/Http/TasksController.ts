import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Kanban from 'App/Models/Kanban'
import CreateTaskValidator from 'App/Validators/CreateTaskValidator'

export default class TasksController {
  public async store({ response, request, params }: HttpContextContract) {
    try {
      const kanbanId = params.kanban
      const kanban = await Kanban.findOrFail(kanbanId)

      const payload = await request.validate(CreateTaskValidator)
      const task = await kanban.related('tasks').create({
        content: payload.content,
      })

      return response.created(task)
    } catch (error) {
      return response.badRequest(error)
    }
  }

  public async show({ response, auth, params }: HttpContextContract) {
    try {
      const kanbanId = params.kanban
      const kanban = await Kanban.findOrFail(kanbanId)

      const tasks = await kanban.related('tasks').query()

      return response.created(tasks)
    } catch (error) {
      return response.badRequest(error)
    }
  }
}
