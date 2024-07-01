import {registerUser} from '../services/auth.js';
import {loginUser} from '../services/auth.js';
import { ONE_DAY } from '../index.js';

export const registerUserController = async(req, res) => {
    const user = await registerUser(req.body);

    res.json({
        status: 201,
        message: 'Successfully registered a user!',
        data: user,
    });
};

export const loginUserController = async(req, res) => {
const session = await loginUser(req.body);

res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
})
res.cookie('sessionId, session_id',)
};

