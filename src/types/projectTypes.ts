import { Document, Schema } from "mongoose";

export interface IProject extends Document {
  user: Schema.Types.ObjectId;
  title: string;
  description: string;
}
