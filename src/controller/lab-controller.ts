import expressAsyncHandler from 'express-async-handler';
import { Lab } from '../entity/Lab';
import { LabFilters } from '../lib/types';
import { Between } from 'typeorm';

const create = expressAsyncHandler(async (req, res) => {
  const labData = req.body as Lab;
  try {
    const lab = await Lab.findOneBy({ name: labData.name });
    if (lab) {
      res.status(400).json({ message: 'Lab already exists' });
      return;
    }
    await Lab.insert(labData);
    res.json({ message: 'Lab created successfully', lab: labData });
  } catch (error) {
    res.status(500).json(error);
  }
});

const update = expressAsyncHandler(async (req, res) => {
  const labData = req.body as Lab;
  try {
    const lab = await Lab.findOneBy({ name: labData.name });
    if (!lab) {
      res.status(400).json({ message: 'Lab does not exist' });
      return;
    }
    await Lab.update({ name: labData.name }, labData);
    res.json({ message: 'Lab updated successfully', lab: labData });
  } catch (error) {
    res.status(500).json(error);
  }
});

const remove = expressAsyncHandler(async (req, res) => {
  const name = req.params.id;
  try {
    const lab = Lab.findOneBy({ name });
    if (!lab) {
      res.status(400).json({ message: 'Lab does not exist' });
      return;
    }
    await Lab.delete({ name });
    res.json({ message: 'Lab deleted succesfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

const getAll = expressAsyncHandler(async (req, res) => {
  try {
    const labs = await Lab.find();
    res.json(labs);
  } catch (error) {
    res.status(500).json(error);
  }
});

const filter = expressAsyncHandler(async (req, res) => {
  const { name, startDate, endDate, course } = req.body as LabFilters;
  try {
    const labs = await Lab.findBy({
      name,
      course,
      startDate: !startDate
        ? undefined
        : Between(startDate.start, startDate.end),
      endDate: !endDate ? undefined : Between(endDate.start, endDate.end),
    });
    res.json(labs);
  } catch (error) {
    res.status(500).json(error);
  }
});

const labController = { create, update, remove, getAll, filter };

export default labController;
