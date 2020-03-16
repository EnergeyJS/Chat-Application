const express = require('express');
const router = express.Router();
//  required all message controller
const FriendRouteController = require("./friend.controller");

// all message route
router.get('/', FriendRouteController.getAllFriendController);
router.post('/', FriendRouteController.createFriendController);
router.get('/:id', FriendRouteController.getSingleFriendController);
router.delete('/:id', FriendRouteController.deleteSingleFriendController);
router.put('/:id', FriendRouteController.updateSingleFriendController);
router.get('/get/pending-request', FriendRouteController.getAllPendingFriendRequestController);
router.get('/accept/accept-request', FriendRouteController.getFriendRequestAcceptController);
router.get('/sending/friend-request', FriendRouteController.sendAllFriendRequestUser);

// delete sending friend request route
router.delete('/delete/sending/friend-request', FriendRouteController.deleteSendingFriendRequest);

// delete pending request from recepient
router.delete('/delete/pending/data/friend-request', FriendRouteController.deletePendingFriendRequest);

// export all router
module.exports = router;