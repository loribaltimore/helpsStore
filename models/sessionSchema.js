
const mongoose = require('mongoose') ;
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
    },
    cart: {
        currentUser: String,
        total: Number,
        toDonate: [],
        pool: [],
        items: [
            {
        name: String,
        price: Number,
        config: Object,
        img: String,
        code: String,
        id: String,
        receiptNo: String,
        orderedFrom: String
            }
        ],
    }
});


module.exports = models.Session || mongoose.model('Session', sessionSchema);