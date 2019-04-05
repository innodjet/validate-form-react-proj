import React from 'react';

const Message = (props) => {
    return (
        <div>
            <h3 className="text-center message">{props.message}</h3>
        </div>
    )
}

export default Message;
