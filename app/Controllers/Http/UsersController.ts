import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
  public async auth({ response }: HttpContextContract) {
    response.send('Brabor')
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateUserValidator)

      const user = await User.create({ email: payload.email, password: payload.password })

      return response.created(user)
    } catch (error) {
      response.badRequest(error)
    }
  }

  public async edit({}: HttpContextContract) {}
}
