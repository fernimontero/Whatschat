import React, {useState} from 'react';
import './Chat.css';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import SearchOutlinedIcon from '@mui/icons-material/DonutLarge';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicNoneIcon from '@mui/icons-material/MicNone';
import SendIcon from '@mui/icons-material/Send';
import axios from './axios';

function Chat({ messages }) {

  const [input, setInput] = useState("");

  const sendMessage = async(e) => {
   e.preventDefault();
   await axios.post('/messages/new',{
    message:input,
    name:"Demo app",
    timestamp: new Date(Date.now()).toUTCString(),
    received:true
   });

   setInput('');
  };

  return (
    <div className="chat">
        <div className="chat__header">
            <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Ozuna-2019.jpg/230px-Ozuna-2019.jpg"/>
            <div className="chat__headerInfo">
                <h3>Ozuna</h3>
                <p>Last seen at ......</p>
            </div>

            <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlinedIcon />
                </IconButton>
                <IconButton>
                    <AttachFileIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
        </div>

        <div className="chat__body">
            {messages.map(message =>(
                <p className={`chat__message ${message.received && 'chat__receiver'}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">
                        {message.timestamp}
                    </span>
                </p>
            ))}
        </div>

        <div className="chat__footer">
            <IconButton>
                <InsertEmoticonIcon/>
            </IconButton>
            <form>
                <input value={input} onChange={e => setInput(e.target.value)} placeholder='Scrivi un messaggio' type="text"/>
                <button onClick={sendMessage} type="submit">Invia</button>
            </form>
            <IconButton>
                <MicNoneIcon/>
            </IconButton>
        </div>
    </div>
  )
}

export default Chat;