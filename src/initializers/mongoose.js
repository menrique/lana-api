const mongoose = require('mongoose');

// Mongoose initializer
module.exports = async (config) => {
    const connection = await mongoose.connect(config.databaseURI, {
        useNewUrlParser: true, useUnifiedTopology: true
    });
    return connection.connection.db;
}