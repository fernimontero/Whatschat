import React from 'react';
import './Sidebar.css';
import Avatar from '@mui/material/Avatar';

function SidebarChat() {
  return (
    <div className="sidebarChat">
        <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Ozuna-2019.jpg/230px-Ozuna-2019.jpg"/>
        <div className="sidebarChat_info">
            <h2>Ozuna</h2>
            <p>Ya le tirè a Tainy</p>
        </div>
    </div>
  )
}

export default SidebarChat;