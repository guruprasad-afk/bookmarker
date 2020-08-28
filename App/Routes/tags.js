const express = require("express");
const {
  AddTag,
  DeleteTag,
  getAllTags,
  getOneTag,
} = require("../Controllers/tags");

const router = new express.Router();

router.post("/", AddTag);

router.delete("/:id", DeleteTag);

router.get("/:id", getOneTag);

router.get("/", getAllTags);

module.exports = router;
