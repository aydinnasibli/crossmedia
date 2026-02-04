import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  mainImage: string;
  category: string;
  publishedAt: Date;
  author: {
    name: string;
    role: string;
    image: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    mainImage: { type: String, required: true },
    category: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now },
    author: {
      name: { type: String, required: true },
      role: { type: String, required: true },
      image: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
