import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import LoginValidator from 'App/Validators/LoginValidator'

export default class UsersController {
  public async login({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(LoginValidator)

    try {
      const token = await auth.use('api').attempt(payload.email, payload.password)
      return response.ok(token)
    } catch {
      return response.unauthorized({ message: 'Invalid Credentials' })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)

    try {
      const user = await User.create({ email: payload.email, password: payload.password })
      return response.created(user)
    } catch (error) {
      return response.badRequest(error)
    }
  }
}
