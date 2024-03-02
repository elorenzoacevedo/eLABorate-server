import expressAsyncHandler from 'express-async-handler';
import { User } from '../entity/User';
import { EnrollArgs, IUser, UserFilters } from '../lib/types';
import { Lab } from '../entity/Lab';
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
    const users = await User.find({
      relations: { lab: true },
      select: { lab: { name: true } },
    });
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
      relations: { lab: true },
      select: { lab: { name: true } },
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

const enroll = expressAsyncHandler(async (req, res) => {
  const { pantherId, labName } = req.body as EnrollArgs;
  const errors: string[] = [];
  try {
    const user = await User.findOneBy({ pantherId });
    const lab = await Lab.findOneBy({ name: labName });
    if (!user) errors.push('User does not exist');
    if (!lab) errors.push('Lab does not exist');
    if (errors.length !== 0) {
      res.status(400).json(errors);
      return;
    }
    (user as User).lab = lab as Lab;
    await User.update({ pantherId }, user as User);
    res.json({ message: `User [${pantherId}] enrolled to lab [${labName}]` });
  } catch (error) {
    res.status(500).json(error);
  }
});

const userController = {
  create,
  update,
  remove,
  getAll,
  filter,
  enroll,
};

export default userController;
