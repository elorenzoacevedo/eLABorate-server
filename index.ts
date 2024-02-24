import express, {Router} from 'express';
import { getTasks } from './index.controllers.js';

const app= express();
const port=8000;
const taskRouter=Router();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

taskRouter.get("/peeps",getTasks);

app.use(taskRouter);

app.get('/',(req,res)=>{
    res.send("Bop");
})

app.listen(port, () => {
    console.log('now listening on port 8000');
});
