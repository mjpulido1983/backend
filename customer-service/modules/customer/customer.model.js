(function () {
    let mongoose = require('mongoose');

    let Schema = mongoose.Schema;

    let CustomerSchema = new Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        address: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    });

    module.exports = mongoose.model('customer', CustomerSchema);
})();