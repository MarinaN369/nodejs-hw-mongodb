import {Router} from 'exspress';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { registerUserSchema, loginUserSchema } from '../validation/auth';
import { registerUserController, loginUserController } from '../controllers/auth';
import { validateBody } from '../middlewares/validateBody';
import {logoutUserController} from '../controllers/auth.js';
import {refreshUserSessionController} from '../controllers/auth.js';

const router = Router();

router.post('/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);

 router.post('/login', validateBody(loginUserSchema),
 ctrlWrapper(loginUserController),);

 router.post('/logout', ctrlWrapper(logoutUserController));

 router.post('/refresh', ctrlWrapper(refreshUserSessionController))

export default router;
