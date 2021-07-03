import axios from "axios";
const FormData = require('form-data');

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
    static async sendMessage(msgTxt,toUserId,fromUserId,fromUserAvatar,jwt) {
        let sentMessage = await axios.post(`${NODE_BASE_URL}/messages/create`,{
            msgTxt,
            toUserId,
            fromUserId,
            fromUserAvatar
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

    /**
     * returns {}
     */
    static async followUser(userFollowingId,userBeingFollowedId,jwt) {
        let followResp = await axios.post(`${NODE_BASE_URL}/users/${userFollowingId}/follow/${userBeingFollowedId}`,{},{
            headers:{
                Authorization:jwt 
            }
        })
        return followResp.data.followedRes;
    }

    /**
     * returns {Success: message string}
     */
    static async unfollowUser(userFollowingId,userBeingFollowedId,jwt) {
        let followResp = await axios.delete(`${NODE_BASE_URL}/users/${userFollowingId}/unfollow/${userBeingFollowedId}`,{
            headers:{
                Authorization:jwt 
            }
        })
        return followResp.data.Success;
    }

    static async editBio(userId,bioTxt,jwt) {
        let newBio = await axios.patch(`${NODE_BASE_URL}/users/${userId}/bio`,{
            bioTxt
        },{
            headers:{
                Authorization:jwt 
            }
        });
        return newBio.data.newBio;
    }
    
    static async uploadPicture(userId,file,jwt) {
        const formData = new FormData();
        let avatarPicUrl = file;
        formData.append('avatarPicUrl',avatarPicUrl)
        let uploaded = await axios.post(`${NODE_BASE_URL}/users/${userId}/upload`,
            formData
        ,{
            headers:{
                'Authorization':jwt,
                'Content-Type':'multipart/form-data'
            }
        });
        return uploaded.data.newAvatar.avatar_pic_url;
    }

    static async getAvatar(userId,filename,jwt,cancelToken="") {
        let avatar = await axios.get(`${NODE_BASE_URL}/users/${userId}/uploads/${filename}`,{
            cancelToken:cancelToken,
            headers:{
                Authorization:jwt 
            }
        });
        console.log(avatar)
        return avatar.data;
    }
} 


export {NodeApi};