//START DB nodemon server.js

//importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';
//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1465170",
    key: "55b483cc62fd7b2d0c6c",
    secret: "3e1f5cfb3af9c8e4e405",
    cluster: "eu",
    useTLS: true
});

//middleware
app.use(express.json());
app.use(cors());

//DB Config

//USER admin
//PASSWORD bPQOXCV9LLtnDETh
const connection_url = 'mongodb+srv://admin:bPQOXCV9LLtnDETh@cluster0.avzjsqa.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(connection_url);
//?????

const db = mongoose.connection

db.once('open', ()=>{
    console.log("DB connesso");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change)=>{
        console.log(change);

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            });
        } else {
            console.log('Errore Pusher');
        }
    });
})
//api routes
app.get('/',(req, res) => res.status(200).send("Hello World"));

app.get("/messages/sync", (req, res)=>{
    Messages.find((err,data) =>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
});

app.post('/messages/new', (req,res)=>{
    const dbMessage = req.body;
    Messages.create(dbMessage, (err, data)=>{
        if(err){
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

// listeners
app.listen(port, ()=> console.log('Listening on localhost >> '+port));