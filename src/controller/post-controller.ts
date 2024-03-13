import expressAsyncHandler from 'express-async-handler';
import { Post } from '../entity/Post';
import { PostFilters } from '../lib/types';
import { Between } from 'typeorm';
import { User } from '../entity/User';


const create = expressAsyncHandler(async (req, res) => {
    const postData = req.body as Post;
    try {
        
        await Post.insert(postData);
        res.json({ message: 'Post created successfully', post: postData});
    } catch (error) {
        res.status(500).json(error);
    }
});

const update = expressAsyncHandler(async (req, res) => {
    const postData= req.body as Post;
    try {
        const post = await Post.findOneBy({ id:postData.id});
        if (!post) {
            res.status(400).json({message: 'Post does not exist'});
            return;
        }
        await Post.update({id: postData.id}, postData);
        res.json({ message: 'Post updated successfully', post: postData});
    } catch (error) {
        res.status(500).json(error);
    }
});

const remove = expressAsyncHandler(async (req, res) => {
    const idData = req.params.id; 
    const id: number= +idData;
    try {
        const post = Post.findOneBy({id});
        if (!post) {
            res.status(400).json({ message: 'Lab does not exist' });
            return;
        }
        await Post.delete({id});
        res.json({ message: 'Post deleted successfully'});
    } catch (error) {
        res.status(500).json(error);
    }
});

const getAll = expressAsyncHandler(async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts)
    } catch (error) {
        res.status(500).json(error);
    }
});

const filter = expressAsyncHandler(async (req, res) => {
    const { datePosted, labName } = req.body as PostFilters;
    try {
        const posts= await Post.find({
            relations: {lab:true },
            select : {lab: { name: true } },
            where: {
                datePosted: !datePosted ? undefined : Between(datePosted.start,datePosted.end),
                lab : {name: labName},
            }
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});

const postController = {create, update, remove, getAll, filter };

export default postController;
