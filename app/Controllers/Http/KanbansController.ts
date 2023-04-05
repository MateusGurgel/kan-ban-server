import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import ApiResponse from 'App/Services/ApiResponse'
import CreateKanbanValidator from 'App/Validators/CreateKanbanValidator'

export default class KanbansController {
  public async index({ response, params, bouncer }: HttpContextContract) {
    const userId = params.user
    const user = await User.find(userId)

    if (!user) {
      return ApiResponse.error(response, 404, [{ message: 'User not found!' }])
    }

    await bouncer.authorize('accessKanban', user)

    const kanbans = await user.related('kanbans').query()
    return response.created(kanbans)
  }

  public async store({ request, response, params, bouncer }: HttpContextContract) {
    const userId = params.user
    const user = await User.find(userId)

    if (!user) {
      return ApiResponse.error(response, 404, [{ message: 'User not found!' }])
    }

    await bouncer.authorize('accessKanban', user)

    const payload = await request.validate(CreateKanbanValidator)
    const kanban = await user.related('kanbans').create({
      name: payload.name,
    })

    return response.created(kanban)
  }
}
