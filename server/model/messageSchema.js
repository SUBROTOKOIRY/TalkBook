const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  conversationId: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timeStamp: {
    // Corrected field name
    type: Date, // Use Date type for timestamp
    default: Date.now, // Set the default value to the current timestamp
  },
})

module.exports=mongoose.model("Messages",messageSchema);