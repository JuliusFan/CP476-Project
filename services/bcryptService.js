"use strict";

let bcrypt = require('bcrypt');
let User = require("../services/databaseService").User;

let encrypt = (password) => {
    return bcrypt.hash(password, 12);
}

let compare = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
}

module.exports = {encrypt, compare};