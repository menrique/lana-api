// Set development as default environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load environment configuration or fail to load
const dotEnv = require('dotenv');
const envFound = dotEnv.config();
if (envFound.error) {
    throw new Error("Couldn't find .env file");
}

// Export configuration
module.exports = {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    databaseURI: process.env.DATABASE_URI
}