import HTMLFlipBook from "react-pageflip";
import {useRef,forwardRef, useEffect} from "react";
import "./TravelJournal.css"
import { FlaskApi } from "../../APIRequests/flask_api";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import defaultImg from "../../Images/default_trip.jpg"
import axios from "axios";

const Page = forwardRef((props, ref) => {
    if(props.isCover) {
        return (
            <div className="demoPage cover-page" ref={ref}></div>
        )
    }
    else {
        return (
            <div className="demoPage" ref={ref}> 
                <Card>
                <CardImg top width="100%" src={defaultImg} alt="Card image cap" />
                <CardBody>
                    {props.trip &&
                        <CardTitle tag="h5">Trip From {props.trip.start_point} To {props.trip.end_point}</CardTitle>
                    }
                    <ul>
                    {props.trip && props.names.map((name) => {
                       return <li>{name}</li>
                    })} 
                    </ul>
                    <p>Page number: {props.number}</p>
              {props.trip !== [] && <h1>{props.children}</h1>}
                </CardBody>
                </Card>
            </div>
        )
    }
});



//******************************************************************************* */
/// TODO ---> ADD map() to dynamically create Page components for each saved trip 
//******************************************************************************* */
const TravelJournal = ({markers,tripData,setTripData,user}) => {
    const book = useRef();

    useEffect(() => {
        const cancelAxios = axios.CancelToken.source();
        async function loadSavedTrips() {
            let savedTrips = await FlaskApi.getTrips(user.user_id,cancelAxios.token);
            setTripData(savedTrips);
        }
        loadSavedTrips();

        return () => {
            cancelAxios.cancel();
        }
    },[])

    return (
        <div className="container-fluid d-flex justify-content-center mt-4">
            <HTMLFlipBook 
                width={500} 
                height={800} 
                ref={book}
                showCover={true}
            >
            <Page number="1" isCover={true}>Page text</Page>
            {tripData !== [] && tripData.map((trip,i) => {
                return <Page number={i+2} 
                            trip={trip}
                            addresses={trip.addresses}
                            names={trip.waypoint_names}
                >
                </Page>
            })}
            <Page number="3"></Page>
            <Page >Last Page</Page>
            </HTMLFlipBook>
        </div>
       
      );
}

export default TravelJournal;