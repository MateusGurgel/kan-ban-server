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
      console.log(error)
      return response.badRequest(error)
    }
  }

  public async show({ response, auth }: HttpContextContract) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({ message: 'unauthorized' })
    }

    const kanbans = await user.related('kanbans').query()

    return response.created(kanbans)
  }
}
