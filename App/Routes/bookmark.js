const express = require("express");

const {
  addBookmark,
  deleteBookmark,
  getAllBookmarks,
  getOneBookmark,
  addTagToBookmark,
  deleteTagFromBookmark,
} = require("./../Controllers/bookmark");

const router = new express.Router();

router.post("/", addBookmark);

router.patch("/addTag/:id", addTagToBookmark);

router.patch("/deleteTag/:id", deleteTagFromBookmark);

router.delete("/:id", deleteBookmark);

router.get("/:id", getOneBookmark);

router.get("/", getAllBookmarks);

module.exports = router;
