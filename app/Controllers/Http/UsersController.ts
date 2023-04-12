import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import ApiResponse from 'App/Services/ApiResponse'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import LoginValidator from 'App/Validators/LoginValidator'

export default class UsersController {
  public async login({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(LoginValidator)

    try {
      const token = await auth.use('api').attempt(payload.email, payload.password)
      return response.ok(token)
    } catch {
      return ApiResponse.error(response, 401, [{ message: 'Invalid Credentials' }])
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return {
      revoked: true,
    }
  }

  public async getId({ response, auth }: HttpContextContract) {
    const user = auth.user

    if (!user) {
      return ApiResponse.error(response, 401, [{ message: 'Invalid User' }])
    }

    return response.ok({ id: user.id })
  }
  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)

    try {
      const user = await User.create({ email: payload.email, password: payload.password })
      const token = await auth.use('api').attempt(payload.email, payload.password)

      const data = {
        user: user,
        token: token,
      }

      return response.created(data)
    } catch (error) {
      return response.badRequest(error)
    }
  }
}
