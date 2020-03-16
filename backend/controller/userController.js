//path
const fs = require('fs')
const path = require("path");
const dirPath = path.join(__dirname, '../public');

// required user controller
const User = require("../modal/user");

// get all users controller
const getAllUserController = async (req, res) => {
    res.send(await User.find());
};

// create user controller
const createUserController = async (req, res) => {
    if (req.file) {
        const CreateUser = new User({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            photo: req.file.filename,
            institute: req.body.institute
        });
        res.send(await CreateUser.save());
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