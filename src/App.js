import { BrowserRouter } from "react-router-dom";
import './App.css';
import Navbar from "./Navbar"
import Routes from "./Routes";
import { useEffect, useState } from 'react';



function App({csrfToken}) {
  //TODO - ADD useContext() for Map component to use
  
  const [locations,setLocations] = useState([]);

  const changeLocations = () => {
    setLocations([{
      name:"Location 1",
      location: {
        lat:42.9634,
        lng:-85.6681
      }
    }])
  } 
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes changeLocations={changeLocations} locations={locations} csrfToken={csrfToken}/>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
