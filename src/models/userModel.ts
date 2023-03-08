import { IUser } from "../types/userTypes";
import { model, Schema } from "mongoose";

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      require: [true, "Please add a text value"],
    },
    email: {
      type: String,
      require: [true, "Please add a text value"],
    },
    password: {
      type: String,
      require: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", userSchema);
