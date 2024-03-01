import express from 'express';
import userController from '../controller/user-controller';

const usersRouter = express.Router();

//Create
usersRouter.post('/create', userController.createUser);

export default usersRouter;
