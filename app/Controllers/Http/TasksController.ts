import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Kanban from 'App/Models/Kanban'
import CreateTaskValidator from 'App/Validators/CreateTaskValidator'

export default class TasksController {
  public async store({ response, request, bouncer, params }: HttpContextContract) {
    const kanbanId = params.kanban
    const kanban = await Kanban.find(kanbanId)

    if (!kanban) {
      return response.notFound({ message: 'kanban not found' })
    }

    await bouncer.authorize('accessTask', kanban)

    const payload = await request.validate(CreateTaskValidator)
    const task = await kanban.related('tasks').create({
      content: payload.content,
    })

    return response.created(task)
  }

  public async show({ response, bouncer, params }: HttpContextContract) {
    const kanbanId = params.kanban
    const kanban = await Kanban.find(kanbanId)

    if (!kanban) {
      return response.notFound({ message: 'kanban not found!' })
    }

    await bouncer.authorize('accessTask', kanban)

    const tasks = await kanban.related('tasks').query()

    return response.created(tasks)
  }
}
