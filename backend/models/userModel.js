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
    ref: 'resume',
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
  // try to get working with just email
  email: {
    type: String,
    required: true,
  }
});

// maybe use .pre()

// resumeSchema.pre('save', function (field) {

//   // checks if field is not already in resumeSchema
//   if (!(field in this)) {
//     this.add({ field: Schema.Types.Mixed });
//   }
//   return next;
//   https://stackoverflow.com/questions/28166463/how-to-create-mongoose-schema-dynamically
// });

// resumeSchema.methods.addField = function (field) {
//   // add field to resume. Using mixed incase of a number, but not sure if a string could still be used for that
//   // not sure if it should be this.add
//   resumeSchema.add({ field: Schema.Types.Mixed });
// 
// }

const Resume = mongoose.model('resume', resumeSchema);

// Export
export default { User, Resume };
