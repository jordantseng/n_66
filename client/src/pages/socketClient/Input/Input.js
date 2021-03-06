import React from 'react';

import './Input.scss';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form22">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}>送出</button>
  </form>
)

export default Input;