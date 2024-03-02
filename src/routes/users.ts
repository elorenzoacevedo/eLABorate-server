import express from 'express';
import userController from '../controller/user-controller';

const usersRouter = express.Router();

//Create
usersRouter.post('/create', userController.createUser);

//Update
usersRouter.post('/update', userController.updateUser);

export default usersRouter;
