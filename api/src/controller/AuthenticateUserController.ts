import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {

  async hendle(request: Request, response: Response){
    const service = new AuthenticateUserService()
    
    const { code } = request.body

    try{
      const result = await service.execute(code)

      return response.json(result)

    }catch(error){
      return response.json({ message: error.message })
    }
  }

}

export { AuthenticateUserController }