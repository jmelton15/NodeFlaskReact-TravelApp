import axios from "axios";
import { GetFromLocalStorage } from "../helpers/helpers";
import {v4 as uuid} from "uuid";
import defaultImg from "../Images/default_trip.jpg";

const NODE_BASE_URL = process.env.REACT_APP_NODE_API || "http://127.0.0.1:3001"

class NodeApi {
    
    static async findUser(username,jwt,cancelToken="") {
        let foundUser = await axios.get(`${NODE_BASE_URL}/users/${username}`,{ 
            cancelToken:cancelToken,
            headers:{
                Authorization:jwt 
            }
        });
        return foundUser.data.foundUser;
    }

    static async getUsersConnections(userId,cancelToken,jwt) {
        let userData = await axios.get(`${NODE_BASE_URL}/users/${userId}/connections`,{
            cancelToken:cancelToken,
            headers:{
                Authorization:jwt
            }
        })
        return userData.data.userData;
    }

    static async getUserConnectionsTrips(userId,cancelToken,jwt) {
        let tripData = await axios.get(`${NODE_BASE_URL}/users/${userId}/connections/trips`,{
            cancelToken:cancelToken,
            headers:{
                Authorization:jwt 
            }
        })
        return tripData.data.followingTrips  
    }
 
    static async likeTrip(userId,tripId,jwt) {
        let likedTrip = await axios.post(`${NODE_BASE_URL}/users/${userId}/like/${tripId}`,{},{
            headers:{
                Authorization:jwt
            }
        })
        return likedTrip.data.likedRes;
    }  

    static async unlikeTrip(userId,tripId,jwt) {
        let unlikedTrip = await axios.delete(`${NODE_BASE_URL}/users/${userId}/unlike/${tripId}`,{
            headers:{
                Authorization:jwt
            }
        })
        return unlikedTrip.data.unlikedRes;
    }
    
    /**
     * 
     * returns {id,msgTxt,toUserId,fromUserId}
     */
    static async sendMessage(msgTxt,toUserId,fromUserId,jwt) {
        let sentMessage = await axios.post(`${NODE_BASE_URL}/messages/create`,{
            msgTxt,
            toUserId,
            fromUserId
        },{
            headers:{
                Authorization:jwt
            }
        });
        return sentMessage.data.createdMessage;
    }

    /**
     * returns {id,msgTxt,toUserId,fromUserId,conversationId}
     */
    static async getConversation(fromUserId,toUserId,jwt,cancelToken="") {
        let messages = await axios.get(`${NODE_BASE_URL}/messages/${toUserId}/${fromUserId}`,{
            cancelToken:cancelToken,
            headers:{
                Authorization:jwt 
            }
        });
        return messages.data.messages;
    }
}


export {NodeApi};