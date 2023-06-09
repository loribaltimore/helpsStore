
import mongoose from 'mongoose';
const{ Schema, models } = mongoose;

const sessionSchema = new Schema({
    sessionToken: String,
    userId: mongoose.Types.ObjectId,
    expires: Date,
    flash: {
        type: {
            type: String,
        },
        message: String
    }
});


export default models.Session || mongoose.model('Session', sessionSchema);