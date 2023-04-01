import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import LoginValidator from 'App/Validators/LoginValidator'

export default class UsersController {
  public async login({ request, response, auth }: HttpContextContract) {
    let payload

    try {
      payload = await request.validate(LoginValidator)
      const token = await auth.use('api').attempt(payload.email, payload.password)
      return response.ok(token)
    } catch (error) {
      response.badRequest(error)
    }

    try {
      const token = await auth.use('api').attempt(payload.email, payload.password)
      return response.ok(token)
    } catch {
      return response.unauthorized({ message: 'Invalid Credentials' })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateUserValidator)

      const user = await User.create({ email: payload.email, password: payload.password })

      return response.created(user)
    } catch (error) {
      return response.badRequest(error)
    }
  }
}
