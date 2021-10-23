(function () {
    let mongoose = require('mongoose');

    let Schema = mongoose.Schema;

    let ProductoSchema = new Schema({
        producto: {
            type: String,
            required: true
        },
        valorUnitario: {
            type: Number,
            required: true
        },
        estado: {
            type: String,
            required: true
        }
    });

    module.exports = mongoose.model('productos', ProductoSchema);
})();