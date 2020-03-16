const express = require('express');
const router = express.Router();


//  required all message controller
const UserRouteController = require("./user.controller");
const { upload } = require("../libs/upload");

// all message route
router.get('/', UserRouteController.getAllUserController);
router.post('/', upload.single('photo'), UserRouteController.createUserController);
router.get('/:id', UserRouteController.getSingleUser);
router.put('/:id', upload.single('photo'), UserRouteController.updateUserController);
router.delete('/:id', UserRouteController.deleteUserController);

// export all router
module.exports = router;