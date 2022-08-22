import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from './axios';
//INSTALLARE PUSHER npm i pusher-js

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
    .then(response =>{
      console.log(response.data);
      setMessages(response.data);
    })
  }, []);

  useEffect(()=> {
    var pusher = new Pusher('55b483cc62fd7b2d0c6c', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      //alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;