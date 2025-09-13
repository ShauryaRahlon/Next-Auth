import mongoose, { Schema, model, Document } from "mongoose";

export interface User extends Document {
  username: string;
  password: string;
  email: string;
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
}
const userSchema = new Schema<User>({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Please use a valid email address",
    ],
  },
  password: { type: String, required: [true, "Password is required"] },
  verifyCode: { type: String },
  verifyCodeExpiry: { type: Date },
  isVerified: { type: Boolean, default: false },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);
export default UserModel;
