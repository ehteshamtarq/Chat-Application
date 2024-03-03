import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import "./Chat.css";
import InfoBar from '../InfoBar/InfoBar.js';
import Input from '../Input/Input.js';
import Messages from '../Messages/Messages.js'

let socket;

const Chat = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const URL = 'http://localhost:5000';
  
    useEffect(()=>{
        console.log(window.location.search);
        const {name, room} = queryString.parse(window.location.search);

        socket = io(URL, {autoConnect: false});
        socket.connect();

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, ({error})=>{
            alert(error);
        } );

        return () =>{
            socket.disconnect();
        }

    }, [URL, window.location.search])

    useEffect(()=>{
        socket.on('message', (message)=>{
            setMessages([...messages, message]);
            
        })
    }, [messages]);

    const sendMessage = (event) =>{
        event.preventDefault();
        console.log('inside sendMessage')

        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className = "container">
                <InfoBar room ={room} />

                <Messages messages={messages} name = {name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />

            </div>
        </div>
    )
}

export default Chat;