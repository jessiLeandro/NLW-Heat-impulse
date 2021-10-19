import { Router } from 'express'

import { AuthenticateUserController } from './controller/AuthenticateUserController'
import { CreateMessageController } from './controller/CreateMessageController'
import { GetLast3MessagesController } from './controller/GetLast3MessagesContoller'
import { ProfileUserController } from './controller/ProfileUserController'
import { ensureAuthenticated } from './middleware/ensureAuthenticated'

const router = Router()

router.post('/authenticate', new AuthenticateUserController().hendle)

router.post('/messages', ensureAuthenticated, new CreateMessageController().hendle)

router.get('/messages/last3', new GetLast3MessagesController().hendle)

router.get('/profile', ensureAuthenticated, new ProfileUserController().hendle)

export { router } 