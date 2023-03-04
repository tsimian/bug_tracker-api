import { IProject } from "../types/projectTypes";
import { model, Schema } from "mongoose";

const projectSchema: Schema = new Schema({
  title: {
    type: String,
    require: [true, "Please add a text value"],
  },
  description: {
    type: String,
    require: [true, "Please add a text value"],
  },
});

export default model<IProject>("Project", projectSchema);
