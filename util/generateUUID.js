let crypto = require('crypto');

let generateUUID = async () => {
    return crypto.randomUUID();
};

module.exports = generateUUID;
