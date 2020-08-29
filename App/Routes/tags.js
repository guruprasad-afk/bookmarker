const express = require("express");
const {
  addTag,
  deleteTag,
  getAllTags,
  getOneTag,
} = require("../Controllers/tags");

const router = new express.Router();

router.post("/", addTag);

router.get("/", getAllTags);

router.get("/:id", getOneTag);

router.delete("/:id", deleteTag);

module.exports = router;
