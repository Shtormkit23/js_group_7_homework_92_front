import React, {useEffect, useRef, useState} from 'react';
import EnteringMessage from "../../components/EnteringMessage/EnteringMessage";
import './Chat.css'
import Message from "../../components/Messages/Message";
import {useSelector} from "react-redux";
import ActiveUser from "../../components/activeUser/activeUser";
import ReconnectingWebSocket from 'reconnecting-websocket';


const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [usersConnections, setUsersConnections] = useState("");
    const ws = useRef(null);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        ws.current = new ReconnectingWebSocket(`ws://localhost:8003/chat?token=${user.token}`);
        ws.current.onopen = () => {
            ws.current.send(JSON.stringify({type: "GET_ALL_MESSAGES"}))
            ws.current.send(JSON.stringify({type: "GET_ALL_CONNECTIONS"}))
        };
        ws.current.onclose = () => console.log("ws closed");
        ws.current.onmessage = event => {
            const decodedMessage = JSON.parse(event.data);
            if (decodedMessage.type === 'NEW_MESSAGE') {
                setMessages((messages) => [...messages, decodedMessage]);
            } else if (decodedMessage.type === "ALL_MESSAGES") {
                setMessages(messages => [...messages, ...decodedMessage.messages])
            }else if (decodedMessage.type === "ALL_CONNECTIONS") {
                setUsersConnections(usersConnections => [...usersConnections, ...decodedMessage.connections])
            }
            // else if (decodedMessage.type === "NEW_USER") {
            //     setUsersConnections(usersConnections => [...usersConnections, ...decodedMessage])
            // }
        };

        return () => ws.current.close();
    }, [user.token]);

    const changeMessage = e => {
        setMessageText(e.target.value);
    };

    const sendMessage = event => {
        event.preventDefault();
        ws.current.send(JSON.stringify({
            type: 'CREATE_MESSAGE',
            message: messageText
        }));
        setMessageText('');
    };



    return (

        <div className="chat">
            <div className="messages">
                {messages.map((message,index) => (
                    <Message
                        key={index}
                        message={message.message}
                        user={message.user.username}
                        datetime={message.datetime}
                    />
                ))}
            </div>
            <EnteringMessage
                addMessage = {sendMessage}
                changeMessage = {changeMessage}
                value = {messageText}
            />
            <div className="users">
                {usersConnections && usersConnections.map((user,index) => (
                    <ActiveUser
                        key={index}
                        user={user}
                    />
                ))}
            </div>
        </div>
    );
};

export default Chat;