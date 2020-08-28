const express = require("express");
const {
  addTag,
  deleteTag,
  getAllTags,
  getOneTag,
} = require("../Controllers/tags");

const router = new express.Router();

router.post("/", addTag);

router.delete("/:id", deleteTag);

router.get("/:id", getOneTag);

router.get("/", getAllTags);

module.exports = router;
