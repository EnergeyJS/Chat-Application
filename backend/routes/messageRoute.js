const express = require('express');
const router = express.Router();
//  required all message controller
const messageRouteController = require("../controller/messageController");

// all message route
router.get('/', messageRouteController.getAllMessageController);
router.post('/', messageRouteController.createMessageController);
router.get('/:id', messageRouteController.getSingleMessageController);
router.delete('/:id', messageRouteController.deleteSingleMessageController);
router.put('/:id', messageRouteController.updateSingleMessageController);
router.get('/get/sender-recever', messageRouteController.messageSenderReceverController);

// export all router
module.exports = router;