import express from 'express';
import labController from '../controller/lab-controller';

const labsRouter = express.Router();

//Create
labsRouter.post('/create', labController.create);

//Update
labsRouter.post('/update', labController.update);

//Delete
labsRouter.delete('/delete/:id', labController.remove);

//Read
labsRouter.get('/', labController.getAll);
labsRouter.post('/filter', labController.filter);

export default labsRouter;
