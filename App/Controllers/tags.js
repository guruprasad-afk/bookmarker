const Tag = require("./../Models/tags");

//TO-DO Handle Mongo DB errors properly
//TO-DO Add pagination features to fetching all tags

const AddTag = async (req, res) => {
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
    res.status(400).send({
      status: "Failure",
      message: "Server not responding. Try again later",
    });
  }
};

const DeleteTag = async (req, res) => {
  const id = req.params.id;

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

  try {
    const tag = await Tag.findById(id);
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
  AddTag,
  DeleteTag,
  getAllTags,
  getOneTag,
};
