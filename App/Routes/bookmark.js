const express = require("express");

const {
  AddBookmark,
  DeleteBookmark,
  getAllBookmarks,
  getOneBookmark,
  addTagToBookmark,
  deleteTagFromBookmark,
} = require("./../Controllers/bookmark");

const router = new express.Router();

router.post("/", AddBookmark);

router.patch("/addTag/:id", addTagToBookmark);

router.patch("/deleteTag/:id", deleteTagFromBookmark);

router.delete("/:id", DeleteBookmark);

router.get("/:id", getOneBookmark);

router.get("/", getAllBookmarks);

module.exports = router;
