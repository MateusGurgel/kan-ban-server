import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async auth({ response }: HttpContextContract) {
    return response.forbidden('Olá')
  }

  public async store({ response }: HttpContextContract) {
    return response.forbidden('Olá')
  }

  public async edit({}: HttpContextContract) {}
}
