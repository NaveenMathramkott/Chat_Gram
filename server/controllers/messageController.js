import MessageModel from "../models/messageModel.js";
import ChatModel from "../models/chatModel.js";

const allMessages = async (req, res) => {
  try {
    const messages = await MessageModel.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.status(200).send(messages);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res
      .status(400)
      .send({ message: "Invalid data passed into request" });
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await MessageModel.create(newMessage);

    message = await message.populate("sender", "name pic").execPopulate();
    message = await message.populate("chat").execPopulate();
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await ChatModel.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.status(200).send(message);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export { sendMessage, allMessages };
