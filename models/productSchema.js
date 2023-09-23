let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let model = mongoose.model;
const models = mongoose.models;

let productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    lead: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    img: [
        {
            filename: {
                type: String
            },
            path: {
                type: String
            }
        }
    ],
    raised: {
        type: Number,
        default: 0
    },
    sizeable: {
        type: Boolean,
        default: false
    }
});


// productSchema.virtual('raised').get(function () {
//     return (this.cost * this.sold) / 2
// });

// productSchema.static('popularity', async (name) => {
//     let allProducts = await Product.find({});
//     let sorted = allProducts.sort(function (a, b) {
//         return a.sold - b.sold;
//     }).filter(x => x.name);
//     return sorted.indexOf(name) + 1;
// });

module.exports = models.Product || model('Product', productSchema);