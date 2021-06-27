import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row,Col, Container
  } from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp as tuSolid,faThumbsDown as tdSolid} from "@fortawesome/free-solid-svg-icons";
import {faThumbsUp as tuReg,faThumbsDown as tdReg} from "@fortawesome/free-regular-svg-icons";
import {useState,useEffect} from "react";
import {NodeApi} from "../../APIRequests/nodeApi";
import {hasValue} from "../../helpers/helpers";
import "./TripCard.css";


function TripCard({user,trip,token}) {
    const [hasLiked,setHasLiked] = useState(false);
    
    const toggleHasLiked = () => {
        setHasLiked(!hasLiked);
    }
    
    const likeTrip = async (tripId) => {
        const likedTrip = await NodeApi.likeTrip(user.user_id,tripId,token);
        toggleHasLiked();
    }
    let hasLikes = user.liked_trips !== [] ? true : false;

    useEffect(() => {
        const checkIfHasLiked = () => {
            if(hasValue(user.liked_trips,"trip_id",trip.trip_id)) return true;
            else {
                return false;
            }
        }
        if(hasLikes) {
            let liked = checkIfHasLiked();
            setHasLiked(liked);
        }
    },[hasLikes,trip.trip_id,user.liked_trips]);
    
    
    const unlikeTrip = async (tripId) => {
        const unlikedTrip = await NodeApi.unlikeTrip(user.user_id,tripId,token);
        toggleHasLiked();
    }

    return (
        <div>
            <Card className="TripCard-Card">
            <CardImg  id="tripcard-useravatar" src={trip.avatar_pic_url} alt="Profile Avatar" />
            <CardBody className="TripCard-CardBody">
                <Container fluid>
                    <Row>
                        <Col>
                            <CardTitle tag="h5" className="text-center" id="tripcard-username">{trip.username.toUpperCase()}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">
                                Trip From {trip.start_point.toUpperCase()} To {trip.end_point.toUpperCase()}
                            </CardSubtitle>
                            {trip.waypoint_names && 
                            <ul className="TripCard-WaypointsList">
                                {trip.waypoint_names.map((name) => {
                                    return <li>{name}</li>
                                })}
                            </ul>
                            }
                        </Col>
                        <Col className="d-flex align-items-center">
                            <div className="TripCard-TripImageContainer">
                                <img id="tripcard-tripimg" width="100%" src={trip.photo} alt="Trip" />
                            </div> 
                        </Col>
                    </Row>    
                </Container>
                <div className="TripCard-LikeContainer mt-3">
                    <FontAwesomeIcon 
                        icon={hasLiked ? tuSolid : tuReg}
                        size="lg" 
                        className="me-3"
                        onClick={() => {
                            hasLiked ? unlikeTrip(trip.trip_id) : likeTrip(trip.trip_id)
                        }
                        }
                    />
                </div>
            </CardBody>
            
            </Card>
        </div>
    )
}


export default TripCard;
