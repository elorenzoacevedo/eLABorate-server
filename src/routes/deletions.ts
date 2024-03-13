import express from 'express';
import deletionController from '../controller/deletion-controller';

const deletionsRouter = express.Router();

//Create
deletionsRouter.post('/create', deletionController.create);

//Update
deletionsRouter.post('/update', deletionController.update);

//Delete
deletionsRouter.delete('/delete/:id', deletionController.remove);

//Read
deletionsRouter.get('/', deletionController.getAll);
deletionsRouter.get('/filter', deletionController.filter);

export default deletionsRouter;
