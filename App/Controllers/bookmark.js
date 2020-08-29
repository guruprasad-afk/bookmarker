const Bookmark = require("./../Models/bookmark");
const mongoose = require("mongoose");
ObjectId = require("mongodb").ObjectID;

const addBookmark = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({
      status: "Failure",
      message: "Title is required",
    });
  }

  if (!req.body.link) {
    return res.status(400).send({
      status: "Failure",
      message: "Link is required",
    });
  }

  let tags = [];

  if (req.body.tags) {
    tags = req.body.tags;
  }

  const bookmark = new Bookmark({
    title: req.body.title,
    link: req.body.link,
    publisher: req.body.publisher,
    tags,
  });
  try {
    await bookmark.save();

    res.status(201).send({
      status: "Success",
      bookmark,
    });
  } catch (error) {
    if (error._message) {
      res.status(400).send({
        status: "Failure",
        message: error._message,
      });
    } else if (error.name === "MongoError" && error.code === 11000) {
      res
        .status(404)
        .send({ status: "Failure", message: "Link Already exists" });
    } else {
      res.status(400).send({
        status: "Failure",
        message: "Server not responding. Try again later",
      });
    }
  }
};

const deleteBookmark = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      status: "Failure",
      message: "Given ID is not valid",
    });
  }

  try {
    const bookmark = await Bookmark.findByIdAndDelete(id);

    if (bookmark) {
      res.status(200).send({
        status: "Success",
        bookmark,
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

const getAllBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    res.status(200).send({
      status: "Success",
      count: bookmarks.length,
      bookmarks,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failure",
      message: "Server not responding. Try again later",
    });
  }
};

const getOneBookmark = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      status: "Failure",
      message: "Given ID is not valid",
    });
  }

  try {
    const bookmark = await Bookmark.findById(id);
    if (bookmark) {
      res.status(200).send({
        status: "Success",
        bookmark,
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

const addTagToBookmark = async (req, res) => {
  if (!req.body.tags) {
    return res.status(400).send({
      status: "Failure",
      message: "Tags is required",
    });
  }

  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      status: "Failure",
      message: "Given ID is not valid",
    });
  }

  let tags = req.body.tags;

  tags.forEach((tag) => {
    tag = ObjectId(tag);
  });

  try {
    const bookmark = await Bookmark.findById(id);

    tags = tags.filter((tag) => !bookmark.tags.includes(tag));

    if (tags.length > 0) {
      bookmark.tags = [...bookmark.tags, ...tags];

      await bookmark.save();
    }

    res.status(201).send({
      status: "Success",
      bookmark,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failure",
      message: "Server not responding. Try again later",
    });
  }
};

const deleteTagFromBookmark = async (req, res) => {
  if (!req.body.tags) {
    return res.status(400).send({
      status: "Failure",
      message: "Tags is required",
    });
  }

  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      status: "Failure",
      message: "Given ID is not valid",
    });
  }

  let tags = req.body.tags;

  try {
    const bookmark = await Bookmark.findById(id);

    bookmark.tags = bookmark.tags.filter((tag) => !tags.includes(tag + ""));

    await bookmark.save();

    res.status(201).send({
      status: "Success",
      bookmark,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failure",
      message: "Server not responding. Try again later",
    });
  }
};

module.exports = {
  addBookmark,
  deleteBookmark,
  getAllBookmarks,
  getOneBookmark,
  addTagToBookmark,
  deleteTagFromBookmark,
};
