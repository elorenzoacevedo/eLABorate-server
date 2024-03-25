import express from 'express';
import userController from '../controller/user-controller';

const usersRouter = express.Router();

//Create
usersRouter.post('/create', userController.create);

//Update
usersRouter.post('/update', userController.update);
usersRouter.post('/enroll', userController.enroll);

//Delete
usersRouter.delete('/delete/:id', userController.remove);

//Read
usersRouter.get('/', userController.getAll);
usersRouter.post('/filter', userController.filter);
usersRouter.post('/login', userController.login);

export default usersRouter;
