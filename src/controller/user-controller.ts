import expressAsyncHandler from 'express-async-handler';
import { User } from '../entity/User';
import { IUser, UserFilters } from '../lib/types';
const encryptly = require('encryptly');

const create = expressAsyncHandler(async (req, res) => {
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
    res.status(500).json(error);
  }
});

const update = expressAsyncHandler(async (req, res) => {
  const userData = req.body as IUser;
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

const remove = expressAsyncHandler(async (req, res) => {
  const pantherId = req.params.id;
  try {
    const user = await User.findOne({ where: { pantherId } });
    if (!user) {
      res.status(400).json({ message: 'User does not exist' });
      return;
    }
    await User.delete({ pantherId });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

const getAll = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

const filter = expressAsyncHandler(async (req, res) => {
  try {
    const {
      pantherId,
      username,
      password,
      firstName,
      lastName,
      email,
      role,
      labName,
    } = req.body as UserFilters;
    const users = await User.find({
      where: {
        pantherId,
        username,
        password,
        firstName,
        lastName,
        email,
        role,
        lab: { name: labName },
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

const userController = {
  create,
  update,
  remove,
  getAll,
  filter
};

export default userController;
