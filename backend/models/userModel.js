import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import dotenv from 'dotenv';
import '../db/db.js';

dotenv.config();

const SALT_WORK_FACTOR = 10;
const { Schema } = mongoose;

// User schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resume: {
    type: Schema.Types.ObjectId,
    ref: 'sesume',
    default: undefined,
  },
});

// userSchema.pre: (hash password)
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, SALT_WORK_FACTOR)
    .then((response) => {
      this.password = response;
      return next();
    })
    .catch((err) => next(err));
});

userSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return callback(err);
    return callback(null, isMatch);
  });
};
const User = mongoose.model('user', userSchema);

// Resume schema as own file
const resumeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
});
const Resume = mongoose.model('resume', resumeSchema);

// Export
export default { User, Resume };
