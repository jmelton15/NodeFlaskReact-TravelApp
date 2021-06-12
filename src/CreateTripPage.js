import TripOptionsForm from "./TripOptionsForm";
import MapContainer from "./MapComp";
import { UncontrolledCollapse, Button } from 'reactstrap';

const CreateTripPage = ({changeLocations,locations}) => {

    return (
        <div>
            <div className="d-flex mt-3 align-items-center">
            <Button className="mx-4" color="success" id="toggler">Trip Options</Button>
            <UncontrolledCollapse  toggler="#toggler">
                <TripOptionsForm />
                <div className="d-flex justify-content-center">
                <Button className="text-center mt-3 mx-3" color="primary">Create Trip</Button>
                <Button className="text-center mt-3" color="danger">Reset Map</Button>
                </div>
            </UncontrolledCollapse>
            </div>
            <MapContainer changeLocations={changeLocations} locations={locations} />
        </div>
        
    )
}   

export default CreateTripPage;