import "./MapComp.css";
import ScriptTag from 'react-script-tag';
import {GoogleMap, LoadScript, Marker, InfoWindow,MarkerClusterer} from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import {Button} from "reactstrap";
import {v4 as uuid} from "uuid";
import GetScreenSize from '../../helpers/GetScreenSize';

const MapContainer = ({markers,defaultCenter,setDefaultCenter}) => {
    const [screenWidth] = GetScreenSize();

    const [selected,setSelected] = useState({});
   
    const [defaultZoom,setDefaultZoom] = useState(4);

    const onSelect = (item) => {
        setSelected(item);
    }

    const clustererOptions = {
      imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      // zoomOnClick:false // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder

    }

    const mapStyles = screenWidth > 420 ? {        
      height: "90vh",
      width: "100%",
      borderTopRightRadius: "23px 130px",
      borderTopLeftRadius: "37px 140px",
      borderBottomLeftRadius: "110px 19px",
      borderBottomRightRadius: "120px 24px",
    } :
    {
      height: "90vh",
      width: "100%",
      borderRadius:"30px"
    }
    
    
    let markerCenter = markers !== [] ? 4 : markers[0].position;


    return (
        <div className="mt-4 MapComp-MapContainer">
       <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
          <GoogleMap 
            mapContainerStyle={mapStyles}
            zoom={defaultZoom}
            center={defaultCenter}>
            <MarkerClusterer options={clustererOptions} >
              {(clusterer) => markers !== [] &&
                markers.map((item) => {
                  return <Marker 
                        onClick={() => onSelect(item)}
                        key={uuid()} 
                        position={item.position} 
                        clusterer={clusterer}
                        onLoad={setDefaultCenter(item.position)}
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
              }}
            >
              <div className="d-flex flex-column align-items-center"> 
                <img id="mapcomp-infowindowPic" src={selected.photo.img_url} alt="Place"></img>
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
