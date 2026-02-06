import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISubscriber extends Document {
  email: string;
  createdAt: Date;
}

const SubscriberSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Explicitly set collection name to 'abuneciler'
const Subscriber: Model<ISubscriber> =
  mongoose.models.Subscriber || mongoose.model<ISubscriber>("Subscriber", SubscriberSchema, "abuneciler");

export default Subscriber;
