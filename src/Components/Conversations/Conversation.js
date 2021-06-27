import sampleImg from "../../Images/fernTable.jpg";
import "./Conversation.css";

const Conversation = ({connection,getMessages}) => {
    return (
        <div className="Conversation" onClick={() => getMessages(connection.user_id)}>
            <img className="Conversation-AvatarPic" src={sampleImg} alt="Avatar Pic"/>
            <div id="message-body">
                <h5>{connection.username}</h5>
            </div>
        </div>
    )
}

export default Conversation;