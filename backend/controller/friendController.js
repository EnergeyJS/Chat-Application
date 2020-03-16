// required message controller
const Friend = require("../modal/friend");

// get all friend controller
const getAllFriendController = async (req, res) => {
    res.send(await Friend.find().populate('user'));
};

// get all pending request
const getAllPendingFriendRequestController = async (req, res) => {
    res.send(await Friend.find({ recipient: req.query.recipient, statusData: false }).populate('requester'));
};

// accept friend request
const getFriendRequestAcceptController = async (req, res) => {
    const { requester } = req.query;
    console.log(requester);
    try {
        const friend = await Friend.findOne({ requester });
        friend.statusData = true;
        console.log(friend);
        res.send(await friend.save());

    } catch (error) {
        console.log(error);
    }
}

// sending all friend request
const sendAllFriendRequestUser = async (req, res) => {
    const sendingFriend = await Friend.find({}).select('requester');
    res.send(sendingFriend);
}

//delete single sending friend
const deleteSendingFriendRequest = async (req, res) => {
    const removesending = await Friend.findOne({ requester: req.query.requester });
    res.send(removesending.remove());
}

// delete single pending request
const deletePendingFriendRequest = async (req, res) => {
    const removepending = await Friend.findOne({ recipient: req.query.recipient }).select('requester');
    res.send(removepending.remove());
}



// create friend controller
const createFriendController = async (req, res) => {
    const CreateFriend = new Friend({
        requester: req.body.requester,
        recipient: req.body.recipient,
        statusData: req.body.statusData
    });
    res.send(await CreateFriend.save());
};

// get single friend  controller
const getSingleFriendController = async (req, res) => {
    const { id } = req.params;
    try {
        const singleFriend = await Friend.findById(id).populate({ path: 'requester', select: 'name' });
        res.send(singleFriend);
    } catch (error) {
        console.log(error)
    }
};

// update friend controller
const updateSingleFriendController = async (req, res) => {
    const { id } = req.params;
    const { requester, recipient, statusData } = req.body;
    try {
        const friend = await Friend.findById(id);
        friend.requester = requester || friend.requester;
        friend.recipient = recipient || friend.recipient;
        friend.statusData = statusData || friend.statusData;
        res.send(friend.save());

    } catch (error) {
        console.log(error);
    }
};

// delete single friend controller
const deleteSingleFriendController = async (req, res) => {
    const { id } = req.params;
    try {
        const friendId = await Friend.findById(id);
        res.send(friendId.remove());
    } catch (error) {
        console.log(error)
    }
};


// export all friend controller
module.exports = {
    getAllFriendController,
    createFriendController,
    getSingleFriendController,
    deleteSingleFriendController,
    updateSingleFriendController,
    getAllPendingFriendRequestController,
    getFriendRequestAcceptController,
    sendAllFriendRequestUser,
    deleteSendingFriendRequest,
    deletePendingFriendRequest
}