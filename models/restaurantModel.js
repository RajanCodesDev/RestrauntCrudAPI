import mongoose from "mongoose";

const RestaurantSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Restaurant title is required"],
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

const RestaurantModel = mongoose.model("Restaurants ", RestaurantSchema);

export default RestaurantModel;
