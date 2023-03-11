import { Document, Schema } from "mongoose";

export interface IBug extends Document {
  name: string;
  projectId: Schema.Types.ObjectId;
  summary: string;
  status: string;
}
