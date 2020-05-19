// Mongoose initializer
module.exports = async (config) => {

    // Create a new instance
    const mongoose = require('mongoose');

    // Connect to DB
    await mongoose.connect(config.databaseURI, {
        useNewUrlParser: true, useUnifiedTopology: true
    });

    // Get the default connection
    const db = mongoose.connection;

    // Notify connection errors
    db.on('error', (error) => { console.log(`MongoDB connection error: ${error.message}`) });

    // Notify connection success
    db.on('open', () => {
        console.log('MongoDB connected successfully.')
    });

    // Return the reference
    return mongoose
}