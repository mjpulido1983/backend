(function () {
    'use strict';

    module.exports = {
        init: init
    };

    let mongoose = require('mongoose');

    let mongodbConfig = require('../../config/mongodb/mongodb-config').mongodb;

    function init() {
        var options = {
            promiseLibrary: require('bluebird'),
            useNewUrlParser: true
        };

        let connectionString = prepareConnectionString(mongodbConfig);

        mongoose.connect(connectionString, options)
            .then(function (result) {
                console.log("MongoDB connection successful. DB: " + connectionString);
            })
            .catch(function (error) {
                console.log(error.message);
                console.log("Error occurred while connecting to DB: : " + connectionString);
            });
    }

    function prepareConnectionString(config) {
        let connectionString = 'mongodb+srv://';

        if (config.user) {
            connectionString += config.user + ':' + config.password + '@';
        }

        connectionString += config.server + '/' + config.database+"?retryWrites=true&w=majority";

        return connectionString;
    }

})();