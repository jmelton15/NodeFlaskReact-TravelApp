import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import {useState, useEffect} from "react";
import "./ConnectionCard.css";
import { NodeApi } from '../../APIRequests/nodeApi';


const ConnectionCard = ({user,connection,token}) => {
    const [followStatus,setFollowStatus] = useState(false);

    useEffect(() => {
        user.following.every((friend) => {
            if(friend.user_id === connection.user_id) {
                setFollowStatus(true);
                return false;
            }
            return true;
        })
    },[user.following,connection.user_id])
        
    const followUser = async (userBeingFollowedId) => {
        await NodeApi.followUser(user.user_id,userBeingFollowedId,token);
        setFollowStatus(true);
    }
    const unfollowUser = async (userBeingFollowedId) => {
        await NodeApi.unfollowUser(user.user_id,userBeingFollowedId,token);
        setFollowStatus(false);
    }


    return (
        <>
        <Card className="ConnectionCard-Card">
        <CardImg id="connectioncard-avatarimg" src={connection.avatar_pic_url} alt="Avatar Profile Pic" />
        <CardBody>
            <div id="connectioncard-usernameBio">
                <CardTitle className="text-center" tag="h1" id="userinfocard-username">{connection.username.toUpperCase()}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{connection.bio}</CardSubtitle>
            </div>
          <CardText id="connectioncard-followingInfo">
                        <p id="connectioncard-followers"><span>Followers:</span> {connection.follower_count}</p>
                        <p id="connectioncard-following"><span>Following:</span> {connection.follow_count}</p>
          </CardText>
        </CardBody>
            <div className="ConnectionCard-ButtonContainer">
                {followStatus && <blockquote id="alreadyFollowing">(Already Following)</blockquote>}
                {followStatus ? <Button id="connectioncard-followbtn" onClick={() => unfollowUser(connection.user_id)}>UnFollow</Button> : 
                                <Button id="connectioncard-findbtn" onClick={()=>followUser(connection.user_id)}>Follow</Button>}
            </div>
        </Card>
        </>
    )
}

export default ConnectionCard;