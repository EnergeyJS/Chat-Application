const bcrypt = require('bcryptjs');
const JWToken = require('../libs/jwtToken');

const User = require("../user/user.model");

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email});
        if(bcrypt.compareSync(password,user.password)){
            const paylod = {
                _id: user._id,
                email: user.email
            }
            const token = JWToken.create(paylod, '60m');
            return res.json({
                token,
                user:{
                    _id: user._id,
                    email: user.email
                }
            })
        }
        next(new Error('Email and password doent match'))
    } catch (error) {
        next(error);
    }

};

module.exports = {
    login,

}