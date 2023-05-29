import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

require('dotenv').config();
require('../db/db');

const SALT_WORK_FACTOR = 10;
const { Schema } = mongoose;

// User schema
const userSchema = new Schema({
  username: { type : String, required : true, unique: true },
  password: { type : String, required : true },
  resume: {
    type: Schema.Types.ObjectId,
    ref: 'Resume',
    default: undefined
  }
});

// userSchema.pre: (hash password)
userSchema.pre('save', async function(next) {
  try {

    this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
    return next();

  } catch(err) {
    console.log(err);
    return next();
  }
})

userSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return callback(err);
    return callback(null, isMatch);
  })
}
const User = mongoose.model('user', userSchema);

// Resume schema as own file
const resumeSchema = new Schema({
  // change fields to handle unbounded number of fields
  fields: [
    {
      key: String,
      value: String
    }
  ]

});
const Resume = mongoose.model('resume', resumeSchema);

// Export 
export default { User, Resume }