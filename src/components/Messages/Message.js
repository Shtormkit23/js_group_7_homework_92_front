import React from "react";
import './Message.css';

const Message = props => (
    <div className="message">
        <div className="authorAndData">
            <p className="author">{props.user}</p>
            <p className="data">{props.datetime}</p>
        </div>
        <p className="text">{props.message}</p>
    </div>
);

export default Message;