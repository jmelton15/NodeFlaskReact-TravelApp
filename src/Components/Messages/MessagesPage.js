import "./MessagesPage.css";
import { Container, Row, Col } from 'reactstrap';
import {io} from "socket.io-client";
import { Redirect } from "react-router-dom";
import { useState,useEffect,useRef } from "react";
import Message from "./message";
import MessageForm from "./MessageForm";
import { NodeApi } from "../../APIRequests/nodeApi";
import Conversation from "../Conversations/Conversation";

const MessagesPage = ({user,token}) => { 
    const socket = useRef();
    const scrollRef = useRef();
    const [messages,setMessages] = useState(null);
    const [toUser,setToUser] = useState(null);
    const [socketMessage,setSocketMessage] = useState(null);
    
/******************************************************************************* */
    /**** WebSocket useEffect Code  ****/
    useEffect(() => {
        socket.current = io("ws://localhost:8001");
        socket.current.on("getMessage",msgData => {
            setSocketMessage({
                fromUserId:msgData.fromUserId,
                toUserId:msgData.toUserId,
                msgTxt:msgData.msgTxt
            })
        })
    },[])

    useEffect(() => {
        if(socketMessage && user.user_id === socketMessage.toUserId) {
            setMessages(prevMsg =>[...prevMsg,socketMessage])
        } 
    },[socketMessage,user.user_id]) 
 
    useEffect(() => {
        socket.current.emit("addUser",user.user_id);
        socket.current.on("getConnectedUsers",users => {
            console.log(users);
        })
    },[user,user.user_id]);
  
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior:"smooth"});
    },[messages])

/******************************************************************************* */
    /**** Message Handling Code  ****/

    const sendMsg = (msgData) => {
        let sentMessage = NodeApi.sendMessage(msgData.message,toUser,user.user_id,user.avatar_pic_url,token)
        if(sentMessage) {
            socket.current.emit("sendMessage",{
                fromUserId:user.user_id,
                toUserId:toUser,
                msgTxt:msgData.message,
                fromUserAvatar:user.avatar_pic_url
            })
            setMessages(prevMsg =>[...prevMsg,{
                toUserId:toUser,
                fromUserId:user.user_id,
                msgTxt:msgData.message,
                fromUserAvatar:user.avatar_pic_url
            }])
        }
    }
    const getMessages = async (toUserId) => {
        let conversation = await NodeApi.getConversation(user.user_id,toUserId,token)
        setMessages(conversation);
        setToUser(toUserId);
    };

/******************************************************************************* */

    if(!token || !user) {
        return <Redirect to="/"></Redirect>
    }
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col xs="8" className="MessagesPage-MessageCol">
                        <div className="MessagesPage-MessageContainer">
                            {!messages && 
                                <div className="MessagePage-StartMessageContainer"> 
                                    <blockquote>Click On A Connection To Open Up A Conversation...</blockquote>
                                </div>
                            }
                            <div id="message-wrapper">
                                {messages && messages.map((message) => {
                                return <div ref={scrollRef}>
                                            <Message message={message} currentUser={user.user_id}/>
                                        </div>
                                })}
                            </div>
                            {messages && <MessageForm sendMsg={sendMsg}/>}
                        </div>
                    </Col>
                    <Col xs="4" className="MessagesPage-ConversationsCol">
                        <div className="MessagesPage-ConverstaionContainer" onClick={() => setMessages(null)}>
                            <div id="conversations-header">
                                <h2 className="mt-1">Connections</h2>
                            </div>
                            {user.following.map((connection) => {
                                return <Conversation connection={connection} getMessages={getMessages}/>
                            })}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MessagesPage;