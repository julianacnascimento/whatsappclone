import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";

import { MessageItem } from "../MessageItem";

import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';

import "./styles.css"

export const ChatWindow = ({ user }) => {

    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if(SpeechRecognition !== undefined){
        recognition = new SpeechRecognition();
    }

    const body = useRef();

    const [emojiOpen, setEmojiOpen] = useState(false)
    const [text, setText] = useState("");
    const [listening, setListening] = useState(false);
    const [list, setList] = useState([
        {author: 1, body: 'opa, tudo bem?' },
        {author: 2, body: 'opa, tudo sim!'},
        {author: 2, body: 'conta as boas'},
        {author: 1, body: 'opa, tudo bem?' },
        {author: 2, body: 'opa, tudo sim!'},
        {author: 2, body: 'conta as boas'},
        {author: 1, body: 'opa, tudo bem?' },
        {author: 2, body: 'opa, tudo sim!'},
        {author: 2, body: 'conta as boas'},
        {author: 1, body: 'opa, tudo bem?' },
        {author: 2, body: 'opa, tudo sim!'},
        {author: 2, body: 'conta as boas'},
        {author: 1, body: 'opa, tudo bem?' },
        {author: 2, body: 'opa, tudo sim!'},
        {author: 2, body: 'conta as boas'},
        {author: 1, body: 'opa, tudo bem?' },
        {author: 2, body: 'opa, tudo sim!'},
        {author: 2, body: 'conta as boas'},
        {author: 1, body: 'opa, tudo bem?' },
        {author: 2, body: 'opa, tudo sim!'},
        {author: 2, body: 'conta as boas'},
        {author: 1, body: 'opa, tudo bem?' },
        {author: 2, body: 'opa, tudo sim!'},
        {author: 2, body: 'conta as boas'},
    ]);

    useEffect(()=>{
        if(body.current.scrollHeight > body.current.offsetHeight){
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight
        }
    }, [list]);

    const handleEmojiClick = (e, emojiObject) => {
        setText(text + emojiObject.emoji)
    }

    const handleOpenEmoji = () => {
        setEmojiOpen(true);
    }

    const handleCloseEmoji = () => {
        setEmojiOpen(false);
    }

    const handleMicClick = () => {
        if(recognition !== null){
            recognition.onstart = () => {
                setListening(true)
            }
            recognition.onend = () => {
                setListening(false)
            }
            recognition.onresult = (e) => {
                setText( e.results[0][0].transcript)
            }

            recognition.start();
        }
    }

    const handleSendClick = () => {}

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
            <div ref={body} className="chatwindow--body">
                {list.map((item, key) => (
                    <MessageItem 
                        key={key}
                        data={item}
                        user={user}
                    />
                ))}
            </div>

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
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </div>
                <div className="chatwindow--pos">
                    { text === "" && 
                        <div onClick={handleMicClick} className="chatwindow-btn">
                            <MicIcon style={{color: listening ? "#126ECE" : "#919191"}} />
                        </div>                    
                    }
                    { text !== "" && 
                        <div onClick={handleSendClick} className="chatwindow-btn">
                            <SendIcon style={{color: "#919191"}} />
                        </div>                    
                    }                    
                </div>
            </div>           
        </div>
    )
}