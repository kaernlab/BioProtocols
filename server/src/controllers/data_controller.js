jsonData = require('../data/data2.json');

const getAll = async (req, res, next) => {
  try {
    const data = jsonData;
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const updateLab = async (req, res, next) => {
  console.log("Called update")
  const labId = req.body.labIdd;
  const content = req.body.content;
  try {
    // Send in "data" format? Decide what to do
    res.status(202).send(content);
  } catch (e) {
    next(e);
  }
};

// TODO: To optimize - only get lab info when selected
const getLabById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const lab = await labs.findOne({
        _id: id
    });

    if(!lab) {
        const error = new Error('Lab does not exist');
        return next(error);
    }

  res.json(lab);
  } catch(e) {
      next(e);
  }
};


const createLab = async (req, res, next) => {
  try {
    const { name, job } = req.body;
    const result = await schema.validateAsync({ name, job });

    const employee = await employees.findOne({
        name,
    })

    // Employee already exists
    if (employee) {
        res.status(409); // conflict error
        const error = new Error('Lab already exists');
        return next(error);
    } 

    const newuser = await employees.insert({
        name,
        job,
    });

    console.log('New lab has been created');
    res.status(201).json(newuser);
  } catch(error) {
      next(error);
  }
};

const deleteLab = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await labs.findOne({
        _id: id
    });

    // Employee does not exist
    if(!employee) {
        return next();
    }
    await employees.remove({
        _id: id
    });

    res.json({
        message: 'Success'
    });

  } catch(error) {
      next(error);
  }
};

const DataController = {
  getAll,
  getLabById,
  updateLab,
  createLab,
  deleteLab
};

module.exports = DataController;