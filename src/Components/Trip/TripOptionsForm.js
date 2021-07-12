import {useEffect, useState} from "react";
import {Form,FormGroup,Button,Input,Card,CardBody,CardImg,Tooltip} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/free-regular-svg-icons";

const TripOptionsForm = ({createTrip,hasCreated,setHasCreated,resetMap,toggleHelp}) => {
    const [helpTTOpen, setHelpTTOpen] = useState(false);
    const toggleHelpToolTip = () => setHelpTTOpen(!helpTTOpen);
    
    const regionCodes = {
        "US":"United States",
        "AQ":"Antarctica",
        "AR":"Argentina",
        "AU":"Australia",
        "BR":"Brazil",
        "CA":"Canada",
        "CF":"Central African Republic",
        "CN": "China",
        "EU":"European Union",
        "EZ":"Eurozone",
        "IN":"India", 
        "ID":"Indonesia",
        "JP": "Japan",
        "MX":"Mexico",
        "ZA":"South Africa",
        "TH":"Thailand",
        "none":"Any (must specify city, state, or country in your search)"
    };

    const initialState = {
        startLocation:"",
        endLocation:"",
        waypoints:"",
        region:""
    }

    const [formData,setFormData] = useState(initialState);

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData(formData => ({
            ...formData,[name]:value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData && formData.startLocation !== "") {
            createTrip({...formData});
            setFormData(initialState);
            setHasCreated(true);
            return;
        }
        alert("Please Fill Out Form Information Before Submitting");
        return;
    }

    return (
        <Form onSubmit={handleSubmit} className="mt-3">
            <FormGroup>
            <Card className="route-form-container">
                <CardImg top width="100%" src="" />
                <CardBody>
                    <Input 
                        key="1"
                        id="startLocation"
                        type="text"
                        name="startLocation"
                        placeholder="Enter Starting Location"
                        value={formData.startLocation}
                        onChange={handleChange}

                    >
                    </Input>
                    <Input 
                        key="2"
                        id="endLocation"
                        type="text"
                        name="endLocation"
                        placeholder="Enter Destination"
                        value={formData.endLocation}
                        onChange={handleChange}
                        className="mt-2"
                    >
                    </Input>
                    <Input 
                        key="3"
                        id="waypoints"
                        type="textarea"
                        name="waypoints"
                        placeholder="Enter Places You Want To Stop (i.e. Park, Museum, Burger Place, Waterpark, Gas Stations,etc)"
                        value={formData.waypoints}
                        onChange={handleChange}
                        className="mt-2"
                    >
                    </Input>
                    <Input 
                        key="4"
                        id="region"
                        type="select"
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        className="mt-2"
                    >
                        <option value="">Select Your Region</option>
                        {Object.keys(regionCodes).map((region) => {
                            return (
                                <option value={region}>{regionCodes[region]}</option>
                            )
                        })}
                    </Input>
                </CardBody> 
                <FontAwesomeIcon icon={faQuestionCircle} size="lg" className="mx-3" id="createtrippage-helpIcon" onClick={toggleHelp}/>
                <Tooltip toggle={toggleHelpToolTip} isOpen={helpTTOpen} target="createtrippage-helpIcon">Click For Help</Tooltip>
                <div className="d-flex justify-content-end mb-3 me-4">
                {!hasCreated && <Button className="text-center mt-3 mx-3" color="primary" id="create">Create Trip</Button>}
                <Button className="text-center mt-3" color="danger" onClick={resetMap}>Reset Map</Button>
                </div> 
            </Card> 
            </FormGroup>
        </Form>
    )
}

export default TripOptionsForm;