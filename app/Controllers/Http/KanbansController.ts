import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Kanban from 'App/Models/Kanban'
import CreateKanbanValidator from 'App/Validators/CreateKanbanValidator'

export default class KanbansController {
  public async show({}: HttpContextContract) {}
  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateKanbanValidator)

      const kanban = await Kanban.create({ name: payload.name })

      return response.created(kanban)
    } catch (error) {
      return response.badRequest(error)
    }
  }
}
