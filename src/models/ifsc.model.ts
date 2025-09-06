import mongoose, { Schema, Document } from "mongoose";

export interface IfscDoc extends Document {
  IFSC: string;
  BANK: string;
  BRANCH: string;
  ADDRESS: string;
  CITY: string;
  DISTRICT: string;
  STATE: string;
  CONTACT?: string;
  updatedAt: Date;
}

const IfscSchema = new Schema<IfscDoc>(
  {
    IFSC: { type: String, required: true, unique: true },
    BANK: String,
    BRANCH: String,
    ADDRESS: String,
    CITY: String,
    DISTRICT: String,
    STATE: String,
    CONTACT: String,
  },
  { timestamps: true }
);

export const IfscModel = mongoose.model<IfscDoc>("Ifsc", IfscSchema);
