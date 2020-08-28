const mongoose = require("mongoose");

const tagSchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

tagSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.tag_id = _id;
  return object;
});

const Tag = mongoose.model("Tags", tagSchema);

module.exports = Tag;
