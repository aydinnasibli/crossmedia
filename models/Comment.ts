import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComment extends Document {
  postId: string; // Refers to Sanity Post ID or Slug
  name: string;
  avatar?: string;
  content: string;
  createdAt: Date;
  likes: number;
}

const CommentSchema: Schema = new Schema(
  {
    postId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    avatar: { type: String },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
