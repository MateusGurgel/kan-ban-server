import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Kanban from 'App/Models/Kanban'
import Task from 'App/Models/Task'
import ApiResponse from 'App/Services/ApiResponse'
import CreateTaskValidator from 'App/Validators/CreateTaskValidator'
import EditTaskValidator from 'App/Validators/EditTaskValidator'

export default class TasksController {
  public async store({ response, request, bouncer, params }: HttpContextContract) {
    const kanbanId = params.kanban
    const kanban = await Kanban.find(kanbanId)

    if (!kanban) {
      return ApiResponse.error(response, 404, [{ message: 'kanban not found!' }])
    }

    await bouncer.authorize('accessTask', kanban)

    const payload = await request.validate(CreateTaskValidator)
    const task = await kanban.related('tasks').create({
      content: payload.content,
    })

    return response.created(task)
  }

  public async update({ response, request, bouncer, params }: HttpContextContract) {
    const kanbanId = params.kanban
    const kanban = await Kanban.find(kanbanId)

    if (!kanban) {
      return ApiResponse.error(response, 404, [{ message: 'kanban not found!' }])
    }

    await bouncer.authorize('accessTask', kanban)

    const taskID = params.task
    const task = await Task.find(taskID)

    if (!task) {
      return ApiResponse.error(response, 404, [{ message: 'task not found!' }])
    }

    const payload = await request.validate(EditTaskValidator)
    task.merge(payload).save()

    return response.created(task)
  }

  public async index({ response, bouncer, params }: HttpContextContract) {
    const kanbanId = params.kanban
    const kanban = await Kanban.find(kanbanId)

    if (!kanban) {
      return ApiResponse.error(response, 404, [{ message: 'kanban not found!' }])
    }

    await bouncer.authorize('accessTask', kanban)

    const tasks = await kanban.related('tasks').query()

    return response.created(tasks)
  }
}
