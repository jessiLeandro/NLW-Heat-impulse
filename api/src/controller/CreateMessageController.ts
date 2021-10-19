import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessageService";

class CreateMessageController {

  async hendle(request: Request, response: Response){
    const service = new CreateMessageService

    const { user_id, body: { message } } = request

    try{
      const result = await service.execute(message, user_id)

     

      return response.json(result)

    }catch(error){
      console.log(error);

      return response.json({ message: error.message })
    }
  }

}

export { CreateMessageController }