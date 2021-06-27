import ScriptTag from 'react-script-tag';
import {GoogleMap, LoadScript, Marker, InfoWindow,MarkerClusterer} from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import {Button} from "reactstrap";

const MapContainer = ({markers}) => {

    let initialCenter = {
      lat:37.0902 ,lng:-95.7129
    }
    const [selected,setSelected] = useState({});
    const [defaultCenter,setDefaultCenter] = useState(initialCenter);
    const [defaultZoom,setDefaultZoom] = useState(4);

    const onSelect = (item) => {
        setSelected(item);
    }

    const clustererOptions = {
      imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      // zoomOnClick:false // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
    }
    const mapStyles = {        
      height: "800px",
      width: "100%"}
    
    
    let markerCenter = markers !== [] ? 4 : markers[0].position;


    return (
        <div className="mt-4">
       <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={defaultZoom}
            center={defaultCenter}>
            <MarkerClusterer options={clustererOptions} onLoad={() => setDefaultZoom(markerCenter)}>
              {(clusterer) => markers !== [] &&
                markers.map((item) => {
                  return <Marker 
                        onClick={() => onSelect(item)}
                        key={item.place_id} 
                        position={item.position} 
                        clusterer={clusterer}
                  />
                  
                })}
            </MarkerClusterer>
         {selected.position && 
            (
              <InfoWindow
              position={selected.position}
              clickable={true}
              onCloseClick={() => {
                setSelected({})
                setDefaultCenter(markerCenter);
                setDefaultZoom(4);
              }}
            >
              <div className="d-flex flex-column"> 
                <h1>{selected.name}</h1>
                <blockquote>{selected.address}</blockquote>
                <a href={selected.web_url} target="_blank" rel="noopener noreferrer">Find It On The Web!</a>
              </div>
            </InfoWindow>
            )}
          </GoogleMap>
       </LoadScript>
       </div>
    )
  }


  export default MapContainer;
