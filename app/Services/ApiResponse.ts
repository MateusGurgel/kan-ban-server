import { ResponseContract } from '@ioc:Adonis/Core/Response'

interface Error {
  rule?: string
  field?: string
  message: string
}

export default class ApiResponse {
  /*public static success(response: ResponseContract, status: number, message: string, data: any) {
    return response.status(status).json({
      message: message,
      data,
    })
  }
  */

  public static error(response: ResponseContract, status: number, errors: Error[]) {
    return response.status(status).json({
      errors,
    })
  }
}
