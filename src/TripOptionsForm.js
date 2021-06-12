import {useState} from "react";
import {Form,FormGroup,Label,Input,Card,CardBody,CardTitle,CardImg,CardText,CardSubtitle} from "reactstrap";


const TripOptionsForm = ({createTrip}) => {
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
        createTrip({...formData});
        setFormData(initialState);
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
            </Card> 
            </FormGroup>
        </Form>
    )
}

export default TripOptionsForm;