import React from "react";
import './EnteringMessage.css';

const EnteringMessage = props => (
    <form onSubmit={props.addMessage} className="form">
        <div className="form-group">
            <div className="column-2">
                <textarea name="text" className="form-control message-form message-input" placeholder="Текст сообщения"
                          id="message-form" onChange={props.changeMessage}/>
            </div>
        </div>
        <button type="submit" className="btn-send" id="button">Send</button>
    </form>
);

export default EnteringMessage;