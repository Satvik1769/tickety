const express = require('express');
const cors = require("cors")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(cors())
app.use(bodyParser.json())



mongoose.connect("mongodb+srv://Satvik1769:IRONMAn17@devclan.0dqjiuu.mongodb.net/tickets").then(()=>{
    console.log('Connected to database');
}).catch((e)=>{
    console.error(`Error connecting to the db ${e}`);
})

// Import Routes
const authRoute = require('./routes/index');
const ticketRoute = require('./routes/ticket');

// Route Middlewares
app.use('/auth', authRoute);
app.use('/ticket', ticketRoute);
app.get('/node-version', (req, res) => {
    res.send(process.version);
  });

  app.get('/', (req, res) => {
    res.send("hello world");
  });


const port = process.env.port ||  3001;
app.listen(port, function(){console.log("Server running on localhost:" + port)});