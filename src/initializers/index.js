const expressInit = require('./express');
const mongooseInit = require('./mongoose');

// Application initializer
module.exports = async (express, config) => {

    // Load RDM
    const mongoConnection = await mongooseInit(config);

    // ...

    // Return initialized application
    return await expressInit(express);
}