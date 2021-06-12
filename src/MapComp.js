import ScriptTag from 'react-script-tag';
import {GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import {Button} from "reactstrap";

const MapContainer = ({changeLocations,locations}) => {
    const [selected,setSelected] = useState({});

    const onSelect = (item) => {
        setSelected(item);
    }

    const mapStyles = {        
      height: "800px",
      width: "100%"}
    
    const defaultCenter = {
        lat:37.0902 ,lng:-95.7129
    }
    
    return (
        <div className="mt-4">
        <Button onClick={changeLocations}>Add Location</Button>
       <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={4}
            center={defaultCenter}>
                {locations.map(item => {
                    return (
                        <Marker 
                        onClick={() => onSelect(item)}
                        key={item.name} 
                        position={item.location} />
                    )
                })}
                {
            selected.location && 
            (
              <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <p>{selected.name}</p>
            </InfoWindow>
            )
         }
          </GoogleMap>
       </LoadScript>
       </div>
    )
  }


  export default MapContainer;

  {/* <ScriptTag src="https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js" />
        <ScriptTag src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjXBkeGKHmGE6k4iXPddI-2ye-OXZ8k30&libraries=localContext&v=beta&callback=initMap" /> */}