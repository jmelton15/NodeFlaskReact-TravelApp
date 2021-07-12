import "./CreateTripPage.css";
import TripOptionsForm from "./TripOptionsForm";
import { Redirect } from "react-router-dom";
import MapContainer from "./MapComp";
import { Button } from 'reactstrap';
import { FlaskApi } from "../../APIRequests/flask_api";
import LocalStorageState from "../../helpers/LocalStorageState";
import { Container, Row, Col, Spinner} from 'reactstrap';
import {useState, useEffect } from "react";
import GetScreenWidth from '../../helpers/GetScreenWidth';
import { iterateOverPlaces } from "../../helpers/helpers";

const CreateTripPage = ({setMarkers,markers,user,token}) => {
    let initialCenter = {
        lat:37.0902 ,lng:-95.7129
      }
    const [screenWidth] = GetScreenWidth();
    const [showHelp,setShowHelp] = useState(false);
    const [startAndEnd,setStartAndEnd] = LocalStorageState("startAndEnd",{})
    const [hasCreated,setHasCreated] = useState(false)
    const [defaultCenter,setDefaultCenter] = useState(initialCenter);
    const [showSpinner,setShowSpinner] = useState(false);
    const [defaultZoom,setDefaultZoom] = useState(4);
    const [tripObject,setTripObject] = useState(null);

    if(!token || !user) {
        return <Redirect to="/"></Redirect>
    }

    const toggleHelp = () => {
        setShowHelp(!showHelp);
    }


    const createTrip = async (tripFormData) => {
        if(user.trip_count >= 4) {
            alert("Currently, Users Are Only Allowed To Create 4 Trips. Go To The 'About Page' To Learn More");
            return;
        }
        setShowSpinner(true);
        const start = tripFormData.startLocation;
        const end = tripFormData.endLocation;
        setStartAndEnd({start,end})
        const waypoints = tripFormData.waypoints.split(/\r\n|\r|\n|,/g);
        const region = tripFormData.region;
        let userTripData = await FlaskApi.createTrip(start,end,waypoints,region,user.user_id)
        console.log(userTripData.marker_data)
        setMarkers(iterateOverPlaces(userTripData.marker_data));
        setTripObject(userTripData.marker_data)
        setShowSpinner(false);
    }

    const resetMap = () => {
        setMarkers([]);
        setStartAndEnd({});
        setHasCreated(false)
        setDefaultCenter(initialCenter);
        setDefaultZoom(4);
    }


    const saveTrip = async () => {
        let savedResp = await FlaskApi.saveTrip(startAndEnd.start,startAndEnd.end,tripObject,user.user_id);
        alert(savedResp.Message);
        resetMap();
    }
    if(screenWidth <= 420) {
        return (
            <Container fluid>
                <Row>
                    <Col className="CreateTripPage-FormContainer">
                        <TripOptionsForm createTrip={createTrip} 
                            startAndEnd={startAndEnd}
                            saveTrip={saveTrip}
                            hasCreated={hasCreated}
                            setHasCreated={setHasCreated}
                            resetMap={resetMap}
                            toggleHelp={toggleHelp}
                            setShowHelp={setShowHelp}
                        />
                        <div>
                            {hasCreated && <Button className="text-center mt-3 mx-3" color="primary" id="save" onClick={saveTrip}>Save Trip</Button>}
                        </div>
                        {showHelp && <div className="CreateTripPage-HelpContainer">
                            <ol id="how-to">
                                <li>
                                    Input Start Point, Stop Point, and Points of Interest
                                </li>
                                <li>
                                    Points of Interest Can Be Anything From Food (i.e. ice cream) to Rest Stops, to Waterparks, You
                                    Name It!
                                </li>
                                <li>
                                    Click "Create Trip" To Generate Top Rated Locations In Each Point of Interest Category
                                </li>
                                <li>
                                    Once Your Results Are Generated, Click "Save Trip" To Save The Trip Data To Your Travel Journal
                                </li>
                                <li>
                                    Click The "Travel Journal" Tab In The Navigation Bar Above To View All Your Saved Trips!
                                </li>
                                <li>
                                    Want To Read More About How The App Works? - <a href="/about">Click Here To Learn More!</a>
                                </li>
                            </ol>
                        </div>}
                    </Col>
                </Row>
                <Row>
                    <Col className="CreateTripPage-MapContainer">
                    {showSpinner && <>
                        <h2 id="createtrippage-loadingText">Putting Your Trip Together! Depending On How Many Places You Entered, It Can Take A Minute...</h2>
                            <div className="CreateTripPage-SpinnerContainer">
                                <Spinner color="primary" style={{ width: '10rem', height: '10rem' }}/>{''}
                            </div>
                        </>}
                        <MapContainer markers={markers} tripObject={tripObject} defaultCenter={defaultCenter} setDefaultCenter={setDefaultCenter} defaultZoom={defaultZoom}/>
                    </Col>
                </Row>
            </Container>
        )
    }
    else {
        return (
            <Container fluid>
                <Row>
                    <Col xs="3" className="CreateTripPage-FormContainer">
                        <TripOptionsForm createTrip={createTrip} 
                            startAndEnd={startAndEnd}
                            saveTrip={saveTrip}
                            hasCreated={hasCreated}
                            setHasCreated={setHasCreated}
                            resetMap={resetMap}
                            toggleHelp={toggleHelp}
                            setShowHelp={setShowHelp}
                        />
                        <div>
                            {hasCreated && <Button className="text-center mt-3 mx-3" color="primary" id="save" onClick={saveTrip}>Save Trip</Button>}
                        </div>
                        {showHelp && <div className="CreateTripPage-HelpContainer">
                            <ol id="how-to">
                                <li>
                                    Input Start Point, Stop Point, and Points of Interest
                                </li>
                                <li>
                                    Points of Interest Can Be Anything From Food (i.e. ice cream) to Rest Stops, to Waterparks, You
                                    Name It!
                                </li>
                                <li>
                                    Click "Create Trip" To Generate Top Rated Locations In Each Point of Interest Category
                                </li>
                                <li>
                                    Once Your Results Are Generated, Click "Save Trip" To Save The Trip Data To Your Travel Journal
                                </li>
                                <li>
                                    Click The "Travel Journal" Tab In The Navigation Bar Above To View All Your Saved Trips!
                                </li>
                                <li>
                                    Want To Read More About How The App Works? - <a href="/about">Click Here To Learn More!</a>
                                </li>
                            </ol>
                        </div>}
                    </Col>
                    <Col xs="9" className="CreateTripPage-MapContainer">
                        {showSpinner && <>
                            <h2 id="createtrippage-loadingText">Putting Your Trip Together! Depending On How Many Places You Entered, It Can Take A Minute...</h2>
                            <div className="CreateTripPage-SpinnerContainer">
                                <Spinner color="primary" style={{ width: '10rem', height: '10rem' }}/>{''}
                            </div>
                        </>}
                        
                        <MapContainer markers={markers} tripObject={tripObject} defaultCenter={defaultCenter} setDefaultCenter={setDefaultCenter} defaultZoom={defaultZoom}/>
                    </Col>
                </Row>
            </Container>
            
        )
    }
    
}   

export default CreateTripPage;
