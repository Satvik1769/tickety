const router = require('express').Router();
const Ticket = require("../models/ticket.model")
const Reply = require("../models/reply.model")

router.route("/getTickets").get((req,res)=>{
Ticket.find().then((tickets)=>{
    console.log(tickets);
    res.json(tickets)
}).catch((e)=>res.status(400).json('Error ' + e));
})

router.route("/createTicket").post((req,res)=>{
    const userName = req.body.userName;
    const type = req.body.type;
    const description = req.body.description;
    const subject = req.body.subject;
    const status = req.body.status;
    const date = req.body.date;
    const updated = req.body.updated;
    const priority = req.body.priority;
    const newTicket = new Ticket({
        userName:userName,
        type : type ,
        description : description,
        subject : subject,
        status : status,
        date : date,
        updated : updated,
        priority : priority
    });

    newTicket.save().then((ticket)=>{
        res.json(ticket)
    }).catch((e)=>res.status(400).json('Error ' + e))
})

router.route("/updateTicket/:id").post((req,res)=>{
    Ticket.findById(req.params.id).then((ticket)=>{
        ticket.userName = req.body.userName;
        ticket.type = req.body.type;
        ticket.description = req.body.description;
        ticket.subject = req.body.subject;
        ticket.status = req.body.status;
        ticket.date = req.body.date;
        ticket.updated = req.body.updated;
        ticket.priority = req.body.priority;

        ticket.save().then((ticket)=>{
            res.json(ticket)
        }).catch((e)=>res.status(400).json('Error ' + e))
    }).catch((e)=>res.status(400).json('Error ' + e))
})

router.route("/deleteTicket/:id").delete((req,res)=>{
    Ticket.findByIdAndDelete(req.params.id).then((ticket)=>{
        res.json(ticket)
    }).catch((e)=>res.status(400).json('Error ' + e))
})

router.route("/getTicket/:id").get((req,res)=>{
    Ticket.findById(req.params.id).then((ticket)=>{
        res.json(ticket)
    }).catch((e)=>res.status(400).json('Error ' + e))
})

router.route("/getTicketByUser/:userName").get((req,res)=>{
    Ticket.find({userName:req.params.userName}).then((tickets)=>{
        res.json(tickets)
    }).catch((e)=>res.status(400).json('Error ' + e))
})
router.route("/getTicketByStatus/:status").get((req,res)=>{
    Ticket.find({status:req.params.status}).then((tickets)=>{
        res.json(tickets)
    }).catch((e)=>res.status(400).json('Error ' + e))
})

router.route("/getTicketByPriority/:priority").get((req,res)=>{
    Ticket.find({priority:req.params.priority}).then((tickets)=>{
        res.json(tickets)
    }).catch((e)=>res.status(400).json('Error ' + e))
})

router.route("/getTicketByType/:type").get((req,res)=>{
    Ticket.find({type:req.params.type}).then((tickets)=>{
        res.json(tickets)
    }).catch((e)=>res.status(400).json('Error ' + e))
})

router.route("/getTicketByUser/:userName/status/:status").get((req,res)=>{
    Ticket.find({userName:req.params.userName,status:req.params.status}).then((tickets)=>{
        res.json(tickets)
    }).catch((e)=>res.status(400).json('Error ' + e))
})
router.route("/getTicketByUser/:userName/priority/:priority").get((req,res)=>{
    Ticket.find({userName:req.params.userName,priority:req.params.priority}).then((tickets)=>{
        res.json(tickets)
    }).catch((e)=>res.status(400).json('Error ' + e))
})
router.route("/getTicketByUser/:userName/type/:type").get((req,res)=>{
    Ticket.find({userName:req.params.userName,type:req.params.type}).then((tickets)=>{
        res.json(tickets)
    }).catch((e)=>res.status(400).json('Error ' + e))
})
// Inside the route handler

router.route("/updateTicket/:ticketId/reply").post(async(req,res)=>{
    const { ticketId } = req.params;
    const { userName, reply } = req.body;

  
    try {
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      const message= new Reply({ userName, reply });
        await message.save();
  
      // Add the reply to the ticket
      ticket.reply.push(message._id);
      await ticket.save();
  
      res.status(201).json({ message: 'Reply added successfully', ticket });
    } catch (error) {
      console.error('Error adding reply:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.route("/updateTicket/:ticketId/reply/:replyId").post(async(req,res)=>{
    const { ticketId,replyId } = req.params;
    const { userName, reply } = req.body;

  
    try {
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      const commentbyId= await Reply.findById(replyId);
      const message= new Reply({ userName, reply });
        await message.save();
  
      // Add the reply to the ticket
      commentbyId.replies.push(message._id);
      await commentbyId.save();
  
      res.status(201).json({ message: 'Reply added successfully', ticket });
    } catch (error) {
      console.error('Error adding reply:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  router.route("/replies").get((req,res)=>{
    Reply.find().then((replies)=>{
        console.log(replies);
        res.json(replies)
    }).catch((e)=>res.status(400).json('Error ' + e));
    })
    router.route("/replies/:id").get((req,res)=>{
        Reply.findById(req.params.id).then((reply)=>{
            res.json(reply)
        }).catch((e)=>res.status(400).json('Error ' + e))
    })
module.exports = router;
