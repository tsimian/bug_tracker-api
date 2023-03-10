import { Document, Schema } from "mongoose";

export interface IBug extends Document {
  name: string;
  projectId: string;
  summary: string;
  status: string;
}
