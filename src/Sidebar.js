import React from 'react';
import './Sidebar.css';
import IconButton from '@mui/material/IconButton';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import SidebarChat from './SidebarChat';

function Sidebar() {
  return (
    <div className='sidebar'>
       <div className="sidebar_header">
            <Avatar src="https://cdns-images.dzcdn.net/images/artist/f21443a563e5d03ddf83ed1e6a12d581/500x500.jpg"/>
            <div className="sidebar_headerRight">
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
       </div>
       <div className="sidebar_search">
            <div className="sidebar_searchContainer">
                <SearchOutlinedIcon />
                <input placeholder="Cerca nelle chat" type="text"/>
            </div>
       </div>

       <div className="sidebar_chats">
           <SidebarChat/>
       </div>
    </div>
  )
}

export default Sidebar;