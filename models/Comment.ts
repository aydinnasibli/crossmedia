import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComment extends Document {
  postId: string; // Refers to Post Slug or ID
  name: string;
  surname: string;
  email: string;
  avatar?: string;
  content: string;
  likes: number;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
  {
    postId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
