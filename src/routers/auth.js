import {Router} from 'exspress';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { registerUserSchema, loginUserSchema } from '../validation/auth';
import { registerUserController, loginUserController } from '../controllers/auth';
import { validateBody } from '../middlewares/validateBody';

const router = Router();

router.post('/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);

 router.post('/login', validateBody(loginUserSchema),
 ctrlWrapper(loginUserController),);

export default router;
