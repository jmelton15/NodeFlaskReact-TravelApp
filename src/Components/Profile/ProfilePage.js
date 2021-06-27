import EditProfileForm from "../../EditProfileForm"
import { Container, Row, Col } from 'reactstrap';
import "./ProfilePage.css";
import TripCard from "../Trip/TripCard";
import {useEffect,useState} from "react";
import {NodeApi} from "../../APIRequests/nodeApi";
import axios from "axios";
import NotificationBar from "./NotificationBar";
import { useHistory } from "react-router-dom";


const ProfilePage = ({user,setUser,token}) => {
    const [connectionsTrips,setConnectionsTrips] = useState([]);
    const history = useHistory();
    useEffect(() => {
        async function getConnectionsTrips() {
            const cancelAxios = axios.CancelToken.source();
            let trips = await NodeApi.getUserConnectionsTrips(user.user_id,cancelAxios.CancelToken,token);
            if(trips !== []) setConnectionsTrips(trips);
        }
        async function getConnections() {
            const cancelAxios = axios.CancelToken.source();
            let connections = await NodeApi.getUsersConnections(user.user_id,cancelAxios.CancelToken,token);
            setUser(connections);
        }
        getConnectionsTrips();
        getConnections();
    },[token,setUser,user.user_id])

    const goToPage = (path) => {
        history.push(`/${path}`);
    }
    
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
                    </div>
                </Col>
                <Col xs="4" className="ProfilePage-NotificationContainer">
                    <div className="mt-4" id="notificationbar-container">
                        <NotificationBar goToPage={goToPage} user={user}/>
                    </div>
                </Col>
            </Row>
        </Container>
        </>
    )

}

export default ProfilePage;