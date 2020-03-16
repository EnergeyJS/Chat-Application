//path
const fs = require('fs')
const path = require("path");
const dirPath = path.join(__dirname, '../public');
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

// required user controller
const User = require("./user.model");

// get all users controller
const getAllUserController = async (req, res) => {
    res.send(await User.find());
};

// create user controller
const createUserController = async (req, res, next) => {
    const { name,  phoneNumber, email, institute, password} = req.body;

    try {
        const createUser = new User({
            name,
            phoneNumber,
            email,
            institute,
            password: bcrypt.hashSync(password, salt)
        });
        if (req.file) {
            createUser.photo = req.file.filename;
        }
        res.send(await createUser.save());
    } catch (error) {
        next(error);
    }
};

// get single user
const getSingleUser = async (req, res) => {
    const { id } = req.params;
    try {
        const userData = await User.findById(id);
        res.send(await userData);
    } catch (error) {
        console.log(error)
    }
}

//  update user controller
const updateUserController = async (req, res) => {
    const { id } = req.params;
    const { name, phoneNumber, email, photo, institute } = req.body;
    const user = await User.findById(id);
    user.name = name || user.name;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.institute = institute || user.institute;
    if (req.file) {
        const { photo } = user;
        try {
            if (fs.existsSync(`${dirPath}/${photo}`)) {
                fs.unlinkSync(`${dirPath}/${photo}`);
                user.photo = req.file.filename;
            }
        } catch (error) {
            console.log(error)
        }
    }
    res.send(await user.save());
}

//  delete user controller
const deleteUserController = async (req, res) => {
    const { id } = req.params;
    const userId = await User.findById(id);
    const { photo } = userId;
    try {
        if (fs.existsSync(`${dirPath}/${photo}`)) {
            fs.unlinkSync(`${dirPath}/${photo}`);
            res.send(await userId.remove());
        }
    } catch (error) {
        console.log(error)
    }
}

// export all friend controller
module.exports = {
    getAllUserController,
    createUserController,
    getSingleUser,
    deleteUserController,
    updateUserController

}