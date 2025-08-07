import mongoose from "mongoose";

const restrauntSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "restraunt title is required"],
      unique: true
    },

    foods: { type: Array },

    time: {
      type: String,
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isopen: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const restrauntModel = mongoose.model("Restraunt", restrauntSchema);

export default restrauntModel;
