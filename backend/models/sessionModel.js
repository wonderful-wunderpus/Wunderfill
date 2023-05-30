import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const sessionSchema = new Schema ({
    cookieId: {type: String, required: true, unique: true},
    createdAt: {type: Date, expires: 60, default: Date.now}
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;