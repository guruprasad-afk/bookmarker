const Tag = require("./../Models/tags");
const mongoose = require("mongoose");

const addTag = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({
      status: "Failure",
      message: "Title is required",
    });
  }

  const tag = new Tag({
    title: req.body.title,
  });
  try {
    await tag.save();

    res.status(201).send({
      status: "Success",
      tag,
    });
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      res
        .status(404)
        .send({ status: "Failure", message: "Title Already exists" });
    } else {
      res.status(400).send({
        status: "Failure",
        message: "Server not responding. Try again later",
      });
    }
  }
};

const deleteTag = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      status: "Failure",
      message: "Given ID is not valid",
    });
  }

  try {
    const tag = await Tag.findByIdAndDelete(id);

    if (tag) {
      res.status(200).send({
        status: "Success",
        tag,
      });
    } else {
      res.status(400).send({
        status: "Failure",
        message: "No record found matching the given id",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failure",
      message: "Server not responding. Try again later",
    });
  }
};

const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).send({
      status: "Success",
      count: tags.length,
      tags,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failure",
      message: "Server not responding. Try again later",
    });
  }
};

const getOneTag = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      status: "Failure",
      message: "Given ID is not valid",
    });
  }

  try {
    const tag = await Tag.findById(mongoose.Types.ObjectId(id));
    if (tag) {
      res.status(200).send({
        status: "Success",
        tag,
      });
    } else {
      res.status(400).send({
        status: "Failure",
        message: "No record found matching the given id",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "Failure",
      message: "Server not responding. Try again later",
    });
  }
};

module.exports = {
  addTag,
  deleteTag,
  getAllTags,
  getOneTag,
};
