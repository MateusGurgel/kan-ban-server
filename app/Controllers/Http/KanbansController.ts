import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateKanbanValidator from 'App/Validators/CreateKanbanValidator'

export default class KanbansController {
  public async show({ auth, response }: HttpContextContract) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({ message: 'unauthorized' })
    }

    const kanbans = await user.related('kanbans').query()

    return kanbans
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const user = auth.user

      if (!user) {
        return response.unauthorized({ message: 'unauthorized' })
      }

      const payload = await request.validate(CreateKanbanValidator)
      const kanban = await user.related('kanbans').create({
        name: payload.name,
      })

      return response.created(kanban)
    } catch (error) {
      return response.badRequest(error)
    }
  }
}
