import {Router} from 'exspress';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { registerUserSchema } from '../validation/auth';
import { registerUserController } from '../controllers/auth';
import { validateBody } from '../middlewares/validateBody';

const router = Router();

router.post('/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);

export default router;
