const mongoose = require("mongoose");
const validator = require("validator");

const bookmarkSchema = mongoose.Schema(
  {
    link: {
      type: String,
      unique: true,
      required: true,
      validate(val) {
        if (!validator.isURL(val)) {
          throw new Error("URL is invalid");
        }
      },
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    publisher: {
      type: String,
      trim: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        rel: "Tags",
      },
    ],
  },
  {
    timestamps: true,
  }
);

bookmarkSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.bookmark_id = _id;
  return object;
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

module.exports = Bookmark;
