// Application initializer
module.exports = async (config) => {

    // Initialize RDM
    const mongoose = await require('./mongoose')(config);

    // Return initialized express app
    const express = require("express");
    const expressInit = require('./express')
    return await expressInit(express, mongoose);
};