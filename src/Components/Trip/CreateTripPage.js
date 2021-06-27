import TripOptionsForm from "./TripOptionsForm";
import MapContainer from "./MapComp";
import { UncontrolledCollapse, Button } from 'reactstrap';
import { FlaskApi } from "../../APIRequests/flask_api";
import LocalStorageState from "../../helpers/LocalStorageState";
import { useState } from "react";

const CreateTripPage = ({setMarkers,markers,user,tripData,setTripData}) => {
    const [startAndEnd,setStartAndEnd] = LocalStorageState("startAndEnd",{})
    const [hasCreated,setHasCreated] = useState(false)

    const toggleHasCreated = () => {
        setHasCreated(!hasCreated)
    }

    const createTrip = async (tripFormData) => {
        const start = tripFormData.startLocation;
        const end = tripFormData.endLocation;
        setStartAndEnd({start,end})
        const waypoints = tripFormData.waypoints.split(/\r\n|\r|\n|,/g);
        const region = tripFormData.region;
        let userTripData = await FlaskApi.createTrip(start,end,waypoints,region,user.user_id)
        setMarkers(userTripData.marker_data)
    }

    const resetMap = () => {
        setMarkers([]);
        setStartAndEnd({});
        // toggleHasCreated();
    }

    const saveTrip = async () => {
        let savedResp = await FlaskApi.saveTrip(startAndEnd.start,startAndEnd.end,markers,user.user_id);
        console.log(savedResp);
    }
    return (
        <div>
            <div className="d-flex mt-3 align-items-center">
            <Button className="mx-4" color="success" id="toggler">Trip Options</Button>
            <UncontrolledCollapse  toggler="#toggler" className="d-flex flex-column align-items-start">
                <TripOptionsForm createTrip={createTrip} 
                            startAndEnd={startAndEnd}
                            saveTrip={saveTrip}
                            hasCreated={hasCreated}
                            toggleHasCreated={toggleHasCreated}
                />
                <Button className="text-center mt-3" color="danger" onClick={resetMap}>Reset Map</Button>
            </UncontrolledCollapse>
            </div>
            <MapContainer markers={markers} />
        </div>
        
    )
}   

export default CreateTripPage;