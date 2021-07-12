import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row,Col, Container, Badge
  } from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp as tuSolid,faThumbsDown as tdSolid} from "@fortawesome/free-solid-svg-icons";
import {faThumbsUp as tuReg,faThumbsDown as tdReg} from "@fortawesome/free-regular-svg-icons";
import {useState,useEffect} from "react";
import {NodeApi} from "../../APIRequests/nodeApi";
import {hasValue} from "../../helpers/helpers";
import "./TripCard.css";
import GetScreenWidth from '../../helpers/GetScreenWidth';
import {v4 as uuid} from "uuid";
import testAvatar from "../../Images/default_avatar.jpg"

function TripCard({user,trip,token}) {
    const [screenWidth] = GetScreenWidth();
    const [hasLiked,setHasLiked] = useState(false);
    const [likes,setLikes] = useState(trip.like_count);
    
    const toggleHasLiked = () => {
        setHasLiked(!hasLiked);
    }
    
    const likeTrip = async (tripId) => {
        const likedTrip = await NodeApi.likeTrip(user.user_id,tripId,token);
        toggleHasLiked();
        setLikes(like => like = like + 1)
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
        setLikes(like => like = like - 1)
    }


    console.log(JSON.parse(trip.marker_data));
    return (
        <div>
            <Card className="TripCard-Card">
            <div className="d-flex align-items-center">
                <CardImg  id="tripcard-useravatar" src={testAvatar} alt="Profile Avatar" />
                <CardTitle tag="h2" className="text-center" id="tripcard-username">{trip.username.toUpperCase()}</CardTitle>
            </div>
            <CardBody className="TripCard-CardBody">
                <Container fluid className="TripCard-AllRowsContainer">
                {screenWidth <= 420 && 
                    <>
                    <Row>
                        <Col>
                            <div className="TripCard-TripDetails">
                                <CardSubtitle tag="h6" className="mb-2" id="tripcard-startAndStopHeader">
                                    Trip From {trip.start_point.toUpperCase()} To {trip.end_point.toUpperCase()}
                                </CardSubtitle>
                                {trip.marker_data && Object.keys(JSON.parse(trip.marker_data)).map((place) => {
                                    return(<div>
                                        <div><h6 key={uuid()}><u>{place}</u></h6></div>
                                            {JSON.parse(trip.marker_data)[place].map((location) => {
                                            return <div><ul>
                                                    <li key={uuid()} id="traveljournal-waypointlist">
                                                        <a key={uuid()} href={location.web_url}target="_blank" rel="noopener noreferrer" id="travlejournal-placelink">{location.name}</a>
                                                    </li>
                                                </ul> </div>
                                            })}
                                        </div>
                                    )}
                                )} 
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="TripCard-TripImageContainer">
                                <img id="tripcard-tripimg" width="100%" src={trip.photo.img_url} alt="Trip" />
                            </div> 
                        </Col>
                    </Row>
                    </>
                }
                   {screenWidth > 420 && <Row>
                        <Col >
                            <div className="TripCard-TripDetails">
                                <CardSubtitle tag="h6" className="mb-2 text-muted">
                                    Trip From {trip.start_point.toUpperCase()} To {trip.end_point.toUpperCase()}
                                </CardSubtitle>
                                {trip.marker_data && Object.keys(JSON.parse(trip.marker_data)).map((place) => {
                                    return(<div>
                                        <div><h6><u>{place}</u></h6></div>
                                            {JSON.parse(trip.marker_data)[place].map((location) => {
                                            return <div><ul>
                                                    <li key={uuid()} id="traveljournal-waypointlist">
                                                        <a href={location.web_url}target="_blank" rel="noopener noreferrer" id="travlejournal-placelink">{location.name}</a>
                                                    </li>
                                                </ul> </div>
                                            })}
                                        </div>
                                    )}
                                )} 
                            </div>
                        </Col>
                        <Col className="d-flex align-items-center">
                            <div className="TripCard-TripImageContainer">
                                <img id="tripcard-tripimg" width="100%" src={trip.photo.img_url} alt="Trip" />
                            </div> 
                        </Col>
                    </Row> }   
                </Container>
                <div className="TripCard-LikeContainer mt-3">
                    <FontAwesomeIcon 
                        data-testid="likeBtn"
                        icon={hasLiked ? tuSolid : tuReg}
                        size="lg" 
                        className="me-3"
                        onClick={() => {
                            hasLiked ? unlikeTrip(trip.trip_id) : likeTrip(trip.trip_id)
                        }
                        }
                    />
                    <Badge id="tripcard-likecountbadge" data-testid="likeCount">{likes}</Badge>
                </div>
            </CardBody>
            
            </Card>
        </div>
    )
}


export default TripCard;
