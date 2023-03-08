import { IProject } from "../types/projectTypes";
import { model, Schema } from "mongoose";

const projectSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      require: [true, "Please add a text value"],
    },
    description: {
      type: String,
      require: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

export default model<IProject>("Project", projectSchema);
