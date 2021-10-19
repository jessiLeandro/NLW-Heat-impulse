import { Request, Response } from "express";
import { ProfileUserService } from "../services/ProfileUserService";

class ProfileUserController {

  async hendle(request: Request, response: Response){
    const service = new ProfileUserService

    const { user_id } = request

    try{
      const result = await service.execute(user_id)

      return response.json(result)

    }catch(error){

      return response.json({ message: error.message })
    }
  }

}

export { ProfileUserController }