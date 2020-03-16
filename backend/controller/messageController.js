// required message controller
const Message = require("../modal/message");

// get all message controller
const getAllMessageController = async (req, res) => {
    res.send(await Message.find());
}

// create message controller
const createMessageController = async (req, res) => {
    const CreateMessage = new Message({
        sender: req.body.sender,
        recever: req.body.recever,
        messagetext: req.body.messagetext
    });
    res.send(await CreateMessage.save());
}


// get sender and recever controller
const messageSenderReceverController = async (req, res) => {
    let sender = req.query.sender;
    let recever = req.query.recever;
    res.send(await Message.find({ $or: [{ sender: sender, recever: recever }, { sender: recever, recever: sender }] }));
}



//  get single message
const getSingleMessageController = async (req, res) => {
    const { id } = req.params;
    try {
        res.send(await Message.findById(id))
    } catch (error) {
        console.log(error);
    }
}

//  delete single message
const deleteSingleMessageController = async (req, res) => {
    const { id } = req.params;
    try {
        const singleId = await Message.findById(id);
        res.send(await singleId.remove());
    } catch (error) {
        console.log(error)
    }
}

// update single message
const updateSingleMessageController = async (req, res) => {
    const { id } = req.params;
    const { sender, recever, messagetext } = req.body;
    try {
        const messageUpdate = await Message.findById(id);
        messageUpdate.sender = sender || messageUpdate.sender;
        messageUpdate.recever = recever || messageUpdate.recever;
        messageUpdate.messagetext = messagetext || messageUpdate.messagetext;
        res.send(await messageUpdate.save());
    } catch (error) {
        console.log(error)
    }
}


// export all controller
module.exports = {
    getAllMessageController,
    createMessageController,
    getSingleMessageController,
    deleteSingleMessageController,
    updateSingleMessageController,
    messageSenderReceverController
}