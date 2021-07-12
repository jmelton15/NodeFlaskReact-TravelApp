import { Container, Row, Col } from 'reactstrap';
import "./ProfilePage.css";
import TripCard from "../ActivityFeed/TripCard";
import {useEffect,useState} from "react";
import {NodeApi} from "../../APIRequests/nodeApi";
import axios from "axios";
import NotificationBar from "./NotificationBar";
import { Redirect, useHistory } from "react-router-dom";
import UserInfoCard from "./UserInfoCard";
import GetScreenWidth from '../../helpers/GetScreenWidth';


const ProfilePage = ({user,setUser,token}) => {
    const [screenWidth] = GetScreenWidth();

    const [connectionsTrips,setConnectionsTrips] = useState([]);
    const history = useHistory();
    const [profilePic,setProfilePic] = useState(user.avatar_pic_url);

    async function getConnectionsTrips() {
        let cancelAxios = axios.CancelToken.source();
        let trips = await NodeApi.getUserConnectionsTrips(user.user_id,cancelAxios.CancelToken,token);
        if(trips !== []) setConnectionsTrips(trips);
        return cancelAxios
    }
    async function getConnections() {
        let cancelAxios = axios.CancelToken.source();
        let connections = await NodeApi.getUsersConnections(user.user_id,cancelAxios.CancelToken,token);
        setUser(connections);
        return cancelAxios.cancel();
    }

    useEffect(() => {
        if(user.follow_count > 0) getConnectionsTrips();
        getConnections();
    },[])


    const uploadPicture = async (file) => {
        let newAvatar = await NodeApi.uploadPicture(user.user_id,file,token);
        setProfilePic(newAvatar);
        getConnections()
        alert("Profile Avatar Has Been Changed!");
    }


    const goToPage = (path) => {
        history.push(`/${path}`);
    }

    if(!token || !user) {
        return <Redirect to="/"></Redirect>
    }

    if(screenWidth <= 420) {
        return (
            <>
            <Container fluid>
                <Row className="ProfilePage-MobileUserInfoRow">
                    <div className="mt-4" id="notificationbar-container">
                            <NotificationBar goToPage={goToPage} user={user}/>
                            <UserInfoCard 
                                user={user} 
                                goToPage={goToPage} 
                                token={token} 
                                uploadPicture={uploadPicture} 
                                profilePic={profilePic}
                                setProfilePic={setProfilePic}
                                getConnections={getConnections}
                            />
                    </div>
                </Row>
                <Row className="ProfilePage-MobileActivityFeedRow">
                    <Col>
                        <div className="activityFeedContainer">
                            <div className="ActivityFeed-HeaderContainer">
                                <h2 className="text-center" id="activityFeedHeader">Activity Feed</h2>
                            </div>
                                {connectionsTrips !== [] && connectionsTrips.map((trip) => {
                                   return (
                                    <div className="activityFeedCard">
                                        <TripCard user={user} trip={trip} token={token}/>
                                    </div>
                                   )
                                })}
                                <div className="d-flex justify-content-center">
                                    {connectionsTrips && <blockquote className="text-muted">No Recent Trips From Your Connections</blockquote>}
                                </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            </>
        )
    }
    else {
        return (
            <>
            <Container fluid>
                <Row>
                    <Col xs="8" className="activityFeedCol">
                        <div className="activityFeedContainer">
                            <div className="ActivityFeed-HeaderContainer">
                                <h2 className="text-center" id="activityFeedHeader">Activity Feed</h2>
                            </div>
                                {connectionsTrips !== [] && connectionsTrips.map((trip) => {
                                   return (
                                    <div className="activityFeedCard">
                                        <TripCard user={user} trip={trip} token={token}/>
                                    </div>
                                   )
                                })}
                                {connectionsTrips === [] && <blockquote className="text-muted">No Recent Trips From Your Connections</blockquote>}
                        </div>
                    </Col>
                    <Col xs="4" className="ProfilePage-NotificationContainer">
                        <div className="mt-4" id="notificationbar-container">
                            <NotificationBar goToPage={goToPage} user={user}/>
                            <UserInfoCard 
                                user={user} 
                                goToPage={goToPage} 
                                token={token} 
                                uploadPicture={uploadPicture} 
                                profilePic={profilePic}
                                setProfilePic={setProfilePic}
                                getConnections={getConnections}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
            </>
        )
    }
}

export default ProfilePage;