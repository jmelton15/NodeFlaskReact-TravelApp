import sampleImg from "../../Images/fernTable.jpg";
import "./Conversation.css";
import GetScreenSize from '../../helpers/GetScreenSize';

const Conversation = ({connection,getMessages}) => {
    const [screenWidth] = GetScreenSize();

    return (
        <div className="Conversation" onClick={() => getMessages(connection.user_id,connection.username.toUpperCase())}>
            <img className="Conversation-AvatarPic" src={connection.avatar_pic_url} alt="Avatar Pic"/>
            <div id="message-body">
                {screenWidth > 600 ? <h5>{connection.username.toUpperCase()}</h5> : <h6>{connection.username.toUpperCase()}</h6>}
            </div>
        </div>
    )
}

export default Conversation;