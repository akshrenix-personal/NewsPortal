import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { dbConnect } from '../config/db.js';
import { userModel } from '../model/table.js';

await dbConnect();
const email = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
const exists = await userModel.findOne({ email });
if (exists) {
  console.log('Admin already exists:', email);
} else {
  await userModel.create({
    name: process.env.ADMIN_NAME || 'Admin',
    email,
    password: await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@12345', 10),
    userType: 'admin',
  });
  console.log('Admin created:', email);
}
await mongoose.disconnect();
