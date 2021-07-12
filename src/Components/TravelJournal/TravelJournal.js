import HTMLFlipBook from "react-pageflip";
import { Redirect } from "react-router-dom";
import {useRef,forwardRef, useEffect} from "react";
import "./TravelJournal.css"
import { FlaskApi } from "../../APIRequests/flask_api";
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, 
    Button,Tooltip
  } from "reactstrap";
import defaultImg from "../../Images/default_trip.jpg"
import axios from "axios";
import { useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash,faMap,faMapMarkedAlt} from "@fortawesome/free-solid-svg-icons";
import { ErrorBoundary } from "../Errors/ErrorBoundary";
import {v4 as uuid} from "uuid";
import GetScreenWidth from "../../helpers/GetScreenWidth";
import GetScreenHeight from "../../helpers/GetScreenHeight";
//******************************************************************************* */
/// INDIVIDUAL PAGE CODE
// props.trip = {id,start_point,end_point,waypoint_names,waypoint_addresses,waypoint_coords,photo,user_id}
//******************************************************************************* */
const Page = forwardRef((props, ref) => {
    const [trashTTOpen, setTrashTTOpen] = useState(false);
    const [mapTTOpen, setMapTTOpen] = useState(false);
    const toggleTrashToolTip = () => setTrashTTOpen(!trashTTOpen);
    const toggleMapToolTip = () => setMapTTOpen(!mapTTOpen);

    const deleteTrip = async () => {
        const cancelAxios = axios.CancelToken.source();
        let deleted = await FlaskApi.deleteTrip(props.user.user_id,props.trip.id)
        props.loadSavedTrips(cancelAxios.token)
    }

    
    if(props.isCover) {
        return (
            <div className="cover-page" ref={ref}></div>
        )
    }
    else {
        return (
            <div className="non-coverpage" ref={ref}> 
                <Card className="TravelJournal-TripCard">
                {props.trip && <CardImg id="page-tripPic"
                    width="100%" 
                    src={JSON.parse(props.trip.photo).img_url} 
                    alt="Trip" 
                />}
                <div className="TravelJournal-AttributionContainer">
                    {props.trip && 
                    <CardSubtitle className="text-muted" id="picAttribution">
                        <a className="text-muted" id="picAttribution" href={JSON.parse(props.trip.photo).attribution}>Link To Photo Credit</a>
                    </CardSubtitle>}
                </div>
                {props.trip && <CardBody className="TravelJournal-TripDetailsContainer">
                    <div className="TravelJournal-TripTitleContainer">
                        {props.trip && <CardTitle tag="h5" id="traveljournal-triptitle">Trip From {props.trip.start_point} To {props.trip.end_point}</CardTitle>}
                        {props.trip && <FontAwesomeIcon icon={faTrash} id="traveljournal-trashIcon" onClick={deleteTrip} size="lg" color="grey"/>}
                        {props.trip && <Tooltip toggle={toggleTrashToolTip} isOpen={trashTTOpen} target="traveljournal-trashIcon">Delete Trip?</Tooltip>}
                    </div>
                    <div className="TravelJournal-TripWaypointsContainer">
                        {props.trip && Object.keys(JSON.parse(props.trip.marker_data)).map((place) => {
                           return(<div>
                                   <div><h6><u>{place}</u></h6></div>
                                    {JSON.parse(props.trip.marker_data)[place].map((location) => {
                                       return <div><ul>
                                            <li key={uuid()} id="traveljournal-waypointlist">
                                                <a href={location.web_url}target="_blank" rel="noopener noreferrer" id="travlejournal-placelink">{location.name}</a>
                                            </li>
                                        </ul> </div>
                                    })}
                                  </div>
                            ) 
                        })
                        
                        }
                        {/* <ul>
                        {props.trip && props.names.map((name,i) => { 
                            return <li key={uuid()} id="traveljournal-waypointlist">
                                      <a href={JSON.parse(props.trip.marker_data)[i].web_url} 
                                         target="_blank" rel="noopener noreferrer" 
                                         id="travlejournal-placelink">
                                         {name}
                                      </a>
                                   </li>
                        })} 
                        </ul> */}
                    </div>
                </CardBody>}
                </Card>
                <div className="d-flex align-items-center justify-content-center">
                    <div className="TravelJournal-PageNumberContainer">
                        {props.trip && <FontAwesomeIcon 
                                            icon={faMapMarkedAlt} 
                                            className="mb-3" 
                                            size={props.screenWidth > 600 ? "4x" : "2x"} 
                                            id="traveljournal-remakeTripBtn" 
                                            color="#5F9EA0"
                                            onClick={() => props.remakeTripOnMap(props.trip)}
                        />}
                        {props.trip && <Tooltip toggle={toggleMapToolTip} isOpen={mapTTOpen} target="traveljournal-remakeTripBtn">Remake Trip On Map!</Tooltip>}
                        <p id="page-pageNumber">Page number: {props.number}</p>
                        {/* {props.trip !== [] && <h1>{props.children}</h1>} */}
                    </div>
                </div>
            </div>
        )
    }
});



//******************************************************************************* */
/// TRAVELJOURNAL CODE
//******************************************************************************* */
const TravelJournal = ({markers,tripData,setTripData,user,token,remakeTripOnMap}) => {
    const book = useRef();
    const [screenWidth] = GetScreenWidth();
    const [screenHeight] = GetScreenHeight();

    let bookHeight = 800;
    let bookWidth = 500;

    if(screenHeight < 800) bookHeight = 630;
    if(screenHeight > 1100) bookHeight = 1000;
    if(screenHeight > 800 && screenHeight < 1100) bookHeight = 800;

    if(screenWidth < 420) bookWidth = 400;
    if(screenWidth > 2000) bookWidth = 800;

    async function loadSavedTrips(cancelAxiosToken) {
        let savedTrips = await FlaskApi.getTrips(user.user_id,cancelAxiosToken);
        setTripData(savedTrips);
    }
    useEffect(() => {
        const cancelAxios = axios.CancelToken.source();
       
        loadSavedTrips(cancelAxios.token);

        return () => {
            cancelAxios.cancel();
        }
    },[])

    if(!token || !user) {
        return <Redirect to="/"></Redirect>
    }

    return (
        <div className="container-fluid d-flex justify-content-center mt-4">
            <ErrorBoundary>
                <HTMLFlipBook 
                    width={bookWidth} 
                    height={bookHeight} 
                    ref={book}
                    showCover={true}
                >

                <Page number="1" isCover={true}>Page text</Page>
                {tripData !== [] && tripData.map((trip,i) => {
                    return <Page number={i+2} 
                                trip={trip}
                                addresses={trip.addresses}
                                names={trip.waypoint_names}
                                user={user}
                                loadSavedTrips={loadSavedTrips}
                                remakeTripOnMap={remakeTripOnMap}
                                screenWidth={screenWidth}
                    >
                    </Page>
                })}
                <Page></Page>
                <Page >Last Page</Page>
                </HTMLFlipBook>
            </ErrorBoundary>
        </div>
       
      );
}

export default TravelJournal;