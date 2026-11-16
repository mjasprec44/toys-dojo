import mongoose, { Schema, Document } from "mongoose";

export interface IBoard extends Document {
  name: string;
  userId: mongoose.Types.ObjectId;
  columns: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const BoardSchema = new Schema<IBoard>(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    columns: [
      {
        type: Schema.Types.ObjectId,
        ref: "Column",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Board ||
  mongoose.model<IBoard>("Board", BoardSchema);
