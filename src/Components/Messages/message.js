import sampleImg from "../../Images/fernTable.jpg";
import "./message.css";

const Message = ({message,currentUser}) => {
    let msgTxtOwnership = "Message-Text-Other";
    let msgOwnership = "Message other";
    if(message.fromUserId === currentUser) {
        msgTxtOwnership = "Message-Text-Own";
        msgOwnership = "Message own";
    }
    
    return (
        <div className={msgOwnership}>
            <img className="Message-AvatarPic" src={sampleImg} alt="Avatar Pic"/>
            <div id="message-body">
                <p className={msgTxtOwnership} id="message-text">{message.msgTxt}</p>
            </div>
        </div>
    )
}

export default Message;

