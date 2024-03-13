import express from 'express';
import postController from '../controller/post-controller';

const postsRouter = express.Router();

//Create
postsRouter.post('/create', postController.create);

//Update
postsRouter.post('/update', postController.update);

//Delete
postsRouter.delete('/delete/:id', postController.remove);

//Read
postsRouter.get('/', postController.getAll);
postsRouter.get('/filter', postController.filter);

export default postsRouter;
