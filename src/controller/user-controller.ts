import expressAsyncHandler from 'express-async-handler';
import { User } from '../entity/User';
const encryptly = require('encryptly');

const createUser = expressAsyncHandler(async (req, res) => {
  const userData = req.body as User;
  try {
    const existingUser = await User.findOne({
      where: { pantherId: userData.pantherId },
    });

    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    userData.password = encryptly.encrypt(
      userData.password,
      process.env.ENCRYPTION_KEY
    );
    await User.insert(userData);
    res.json({
      message: 'User created successfully',
      user: userData,
    });
  } catch (error) {
    res.json(error);
  }
});

const updateUser = expressAsyncHandler(async (req, res) => {
  const userData = req.body as User;
  try {
    const existingUser = await User.findOne({
      where: { pantherId: userData.pantherId },
    });

    if (!existingUser) {
      res.status(400).json({ message: 'User does not exist' });
      return;
    }

    userData.password = encryptly.encrypt(
      userData.password,
      process.env.ENCRYPTION_KEY
    );
    await User.update({ pantherId: userData.pantherId }, userData);
    res.json({
      message: 'User updated successfully',
      user: userData,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

const userController = {
  createUser,
  updateUser,
};

export default userController;
