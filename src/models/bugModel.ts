import { IBug } from "../types/bugTypes";
import { model, Schema } from "mongoose";

const bugSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a text value"],
    },
    projectId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    summary: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

export default model<IBug>("Bug", bugSchema);
