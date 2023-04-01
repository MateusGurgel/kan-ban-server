import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async auth({ response }: HttpContextContract) {
    response.send('Brabor')
  }

  public async store({ response }: HttpContextContract) {
    response.send('Brabor')
  }

  public async edit({}: HttpContextContract) {}
}
