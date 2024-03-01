import expressAsyncHandler from 'express-async-handler';
import { User } from '../entity/User';

const createUser = expressAsyncHandler(async (req, res) => {
  const userData = req.body as User;
  try {
    await User.insert(userData);
    res.json({
      message: 'User created successfully: ',
      user: userData,
    });
  } catch (error) {
    res.json(error);
  }
});

const userController = {
  createUser,
};

export default userController;
