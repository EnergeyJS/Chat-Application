const jwt = require('jsonwebtoken');
const config = require('../config/index');

const create = (payload, expiresIn ) => jwt.sign(payload, config.secret, {expiresIn });

module.exports = {
    create
}