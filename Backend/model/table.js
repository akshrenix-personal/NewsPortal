import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: { type: String, required: true, trim: true },
   email: { type: String, required: true, unique: true, lowercase: true, trim: true },
   password: { type: String, required: true },
   contact: { type: String },
   address: { type: String },
   profile: { type: String },
   userType: { type: String, enum: ['user', 'admin'], default: 'user' },
   createAt: { type: Date, default: Date.now },
   updateAt: { type: Date, default: Date.now },
});
export const userModel = mongoose.model('users', userSchema);

const NewsSchema = new mongoose.Schema({
   title: { type: String, required: true, trim: true },
   category: { type: String },
   city: { type: String },
   type: { type: String, enum: ['image', 'video'] },
   url: { type: String },
   desc: { type: String },
   userId: { type: String },
   isApproved: { type: Boolean, default: false },
   createAt: { type: Date, default: Date.now },
   updateAt: { type: Date, default: Date.now },
});
NewsSchema.index({ isApproved: 1, type: 1, createAt: -1 });
export const newsModel = mongoose.model('news', NewsSchema);

const ContactSchema = new mongoose.Schema({
   name: { type: String },
   email: { type: String },
   phone: { type: String },
   message: { type: String },
   createAt: { type: Date, default: Date.now },
   updateAt: { type: Date, default: Date.now },
});
export const contactUsModel = mongoose.model('contacts', ContactSchema);
