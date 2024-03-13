import expressAsyncHandler from 'express-async-handler';
import { Deletion } from '../entity/Deletion';
import { Post } from '../entity/Post';
import { DeletionFilters } from '../lib/types';
import { Between } from 'typeorm';


const create = expressAsyncHandler(async (req, res) => {
    const deletionData = req.body as Deletion;
    try {
        
        await Deletion.insert(deletionData);
        res.json({ message: 'Deletion created successfully', deletion: deletionData});
    } catch (error) {
        res.status(500).json(error);
    }
});

const update = expressAsyncHandler(async (req, res) => {
    const deletionData= req.body as Deletion;
    try {
        const deletion = await Deletion.findOneBy({ id:deletionData.id});
        if (!deletion) {
            res.status(400).json({message: 'Deletion does not exist'});
            return;
        }
        await Deletion.update({id: deletionData.id}, deletionData);
        res.json({ message: 'Deletion updated successfully', deletion: deletionData});
    } catch (error) {
        res.status(500).json(error);
    }
});

const remove = expressAsyncHandler(async (req, res) => {
    const idData = req.params.id; 
    const id: number= +idData;
    try {
        const deletion = Deletion.findOneBy({id});
        if (!deletion) {
            res.status(400).json({ message: 'Deletion does not exist' });
            return;
        }
        await Deletion.delete({id});
        res.json({ message: 'Deletion deleted successfully'});
    } catch (error) {
        res.status(500).json(error);
    }
});

const getAll = expressAsyncHandler(async (req, res) => {
    try{
        const deletions = await Deletion.find();
        res.json(deletions)
    } catch (error) {
        res.status(500).json(error);
    }
});

const filter = expressAsyncHandler(async (req, res) => {
    const { deletionDate} = req.body as DeletionFilters;
    try {
        const posts= await Deletion.findBy({
                deletionDate: !deletionDate ? undefined : Between(deletionDate.start,deletionDate.end),
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});

const deletionController = {create, update, remove, getAll, filter };

export default deletionController;
