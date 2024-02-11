const Messages=require("../model/messageSchema");

const addmsg=async(req,res)=>{
    try{
        const { from, to, text } = req.body
        const data = new Messages({
          conversationId: from + to,
          sender: from,
          text: text,
        });
        await data.save();
       if (data)
        {
            return res.json({ status:true,msg: 'Message added successfully.' })
        }
       else 
         return res.json({status:true, msg: 'Failed to add message to the database' })
    }
    catch(error){
        console.log(error);
    }
}

const getAllmsgs=async(req,res)=>{
    try{
        const { from, to } = req.body
        const messages = await Messages.find({
          $or: [
            { conversationId: `${from}${to}` },
            { conversationId: `${to}${from}` },
          ],
        }).sort({ timeStamp: 1 })

        if (messages) {
          const pastMessages = messages.map((msg) => {
            return {
              text: msg.text,
              fromSender: msg.sender.toString() === from,
              // timeStamp:message.timeStamp
            }
          })
          return res.json({ status: true, pastMessages })
        }
        return res.json({ status: false, msg: 'You have no messages' })
    }
    catch(error){
        console.log(error);
    }
}

module.exports={addmsg,getAllmsgs};