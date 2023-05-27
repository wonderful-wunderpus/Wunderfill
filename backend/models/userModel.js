const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

//user schema
const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  resume: {
    type: Schema.Types.ObjectId,
    ref: 'resume'
  }
});

// userSchema.pre: (hash password)
userSchema.pre('save', async function(next) {
  try {
    this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
    return next();
  } catch(err) {
    console.log(err);
  }
})

const User = mongoose.model('user', userSchema);

//resume schema as own file
const resumeSchema = new Schema({
  // resumeSchemaId: {type: Number},
  firstName: String,
  lastName: String,
  fields: [
    {
      key: 'Key',
      value: 'Value'
    }
  ],
  // address: 
});

const Resume = mongoose.mode('resume', resumeSchema);

//export 
module.exports = {
  User,
  Resume
}