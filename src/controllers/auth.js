import {registerUser} from '../services/auth.js';

export const registerUserController = async(req, res) => {
    await registerUser(req.body);

    res.json({
        status: 201,
        message: 'Successfully registered a user!',
        data: user,
    });
};
