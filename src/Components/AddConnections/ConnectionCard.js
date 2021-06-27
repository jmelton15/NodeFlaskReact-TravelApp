import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import {useState, useEffect} from "react";
import "./ConnectionCard.css";


const ConnectionCard = ({user,connection,followUser,unfollowUser}) => {
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
        
    return (
        <>
        <Card className="ConnectionCard-Card">
        <CardImg id="connectioncard-avatarimg" src={connection.avatar_pic_url} alt="Avatar Profile Pic" />
        <CardBody>
          <CardTitle tag="h5" id="connectioncard-username">{connection.username}</CardTitle>
          <CardSubtitle>{connection.bio}</CardSubtitle>
        </CardBody>
        <div className="ConnectionCard-ButtonContainer">
            {followStatus ? <Button id="connectioncard-followbtn" onClick={() => unfollowUser(connection.user_id)}>UnFollow</Button> : <Button id="connectioncard-findbtn" onClick={()=>followUser(connection.user_id)}>Follow</Button>}
        </div>
        </Card>
        </>
    )
}

export default ConnectionCard;