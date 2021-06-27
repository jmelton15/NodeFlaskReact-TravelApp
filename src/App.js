import { BrowserRouter } from "react-router-dom";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import Routes from "./Routes";
import UserContext from "./helpers/UserContext";
import LocalStorageState from "./helpers/LocalStorageState";

function App() {

  const [user,setUser] = LocalStorageState("currentUser",{});
  const [token,setToken] = LocalStorageState("token",null);
 
  const [markers,setMarkers] = LocalStorageState("markers",[]);

  const [tripData,setTripData] = LocalStorageState("tripData",[])


  return (
      <div className="App">
        <BrowserRouter>
        <main>
          <Navbar user={user}/>
          <UserContext.Provider value={{user,setUser,
                                        token,setToken,
                                        markers,setMarkers,
                                        tripData,setTripData}}
          >
            <Routes />
          </UserContext.Provider>
        </main>
        </BrowserRouter>
      </div>
    
    
  );
}

export default App;
