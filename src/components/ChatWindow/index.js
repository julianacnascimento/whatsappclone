import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';

import "./styles.css"

export const ChatWindow = () => {


    const [emojiOpen, setEmojiOpen] = useState(false)

    const handleEmojiClick = () => {}

    const handleOpenEmoji = () => {
        setEmojiOpen(true);
    }

    const handleCloseEmoji = () => {
        setEmojiOpen(false);
    }

    return(
        <div className="chatwindow">
            <div className="chatwindow--header">
                
                <div className="chatwindow--headerinfo">
                    <img className="chatwindow--avatar" src="https://www.w3schools.com/howto/img_avatar2.png" alt="" />
                    <div className="chatwindow--name">Juliana</div>                    
                </div>
            
                <div className="chatwindow--headerbuttons">
                    <div className="chatwindow-btn">
                        <SearchIcon style={{color: "#919191"}} />
                    </div>
                    <div className="chatwindow-btn">
                        <AttachFileIcon style={{color: "#919191"}} />
                    </div>
                    <div className="chatwindow-btn">
                        <MoreVertIcon style={{color: "#919191"}} />
                    </div>
                </div>
            </div>
            <div className="chatwindow--body"></div>

            <div className="chatwindow--emojiarea"
                style={{height: emojiOpen ? '200px' : '0px'}}
            >
                <EmojiPicker 
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                />
            </div>
            <div className="chatwindow--footer">
                <div className="chatwindow--pre">
                    <div 
                        className="chatwindow-btn"
                        style={{width: emojiOpen ? 40 : 0 }}    
                    >
                        <CloseIcon 
                            onClick={handleCloseEmoji}
                            style={{color: "#919191"}} 
                        />
                    </div>
                    <div 
                        className="chatwindow-btn"
                    >
                        <InsertEmoticonIcon 
                            onClick={handleOpenEmoji}
                            style={{color: emojiOpen ? "#009688" : "#919191"}} 
                        />
                    </div>
                </div>
                <div className="chatwindow--inputarea">
                    <input 
                        className="chatwindow--input" 
                        type="text"
                        placeholder="Digite uma mensagem"
                    />
                </div>
                <div className="chatwindow--pos">
                    <div className="chatwindow-btn">
                        <SendIcon style={{color: "#919191"}} />
                    </div>
                </div>
            </div>           
        </div>
    )
}