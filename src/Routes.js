import {Route,Switch, Redirect, useHistory} from "react-router-dom";
import {useContext} from "react";
import HomePage from "./Components/HomePage/HomePage"
import CreateTripPage from "./Components/Trip/CreateTripPage";
import ProfilePage from "./Components/Profile/ProfilePage";
import TravelJournal from "./Components/TravelJournal/TravelJournal";
import LoginPage from "./Components/Login-Register/LoginPage";
import SiteTitleComponent from "./Components/TitlePicture/SiteTitleComp";
import RegisterPage from "./Components/Login-Register/RegisterPage";
import UserContext from "./helpers/UserContext";
import Logout from "./Components/Login-Register/Logout";
import MessagesPage from "./Components/Messages/MessagesPage";
import FindUserPage from "./Components/AddConnections/FindUserPage";
import FollowPage from "./Components/FollowInfoPages/FollowPage";
import FollowerPage from "./Components/FollowInfoPages/FollowerPage";



const Routes = () => {
    const history = useHistory();
    const {user,setUser,token,setToken,markers,setMarkers,tripData,setTripData} = useContext(UserContext)
    
    const GoToPage = (path) => {
        history.push(`/${path}`);
    }

    // Handles showing a saved trip on the map again
    const remakeTripOnMap = (tripData) => {
        const markerData = JSON.parse(tripData.marker_data);
        console.log(markerData);
        setMarkers(markerData);
        GoToPage(`users/${user.user_id}/trip`);
    }

    return (
        <Switch>
                <Route exact path="/">
                    <SiteTitleComponent />
                    <HomePage user={user} token={token} />
                </Route>
                <Route exact path="/users/:userId/profile">
                    <ProfilePage user={user} setUser={setUser} token={token}  />
                </Route>
                <Route exact path="/users/:userId/traveljournal">
                    <TravelJournal markers={markers} 
                                user={user} 
                                tripData={tripData} 
                                setTripData={setTripData}
                                token={token} 
                                remakeTripOnMap={remakeTripOnMap}
                    />
                </Route>
                <Route path="/users/:userId/trip">
                    <CreateTripPage 
                                    markers={markers} 
                                    setMarkers={setMarkers} 
                                    user={user}
                                    tripData={tripData}
                                    setTripData={setTripData}
                                    token={token}       
                    />
                </Route>
                <Route exact path="/users/:userId/messages">
                    <MessagesPage user={user} token={token}  />
                </Route>
                <Route exact path="/users/:userId/following">
                    <FollowPage user={user} token={token}  />
                </Route>
                <Route exact path="/users/:userId/followers">
                    <FollowerPage user={user} token={token}   />
                </Route>
                <Route exact path="/users/find">
                    <FindUserPage user={user} token={token}  />
                </Route>
                <Route exact path="/login">
                    <SiteTitleComponent />
                    <LoginPage setUser={setUser} 
                            user={user} 
                            setToken={setToken}
                    /> 
                </Route>
                <Route exact path="/register">
                    <SiteTitleComponent />
                    <RegisterPage user={user} setUser={setUser} setToken={setToken}/>
                </Route>
                <Route exact path="/logout">
                    <Logout setUser={setUser} 
                            setMarkers={setMarkers} 
                            setTripData={setTripData}
                            setToken={setToken}
                            
                    />
                </Route>
                <Redirect to="/"></Redirect>
           
        </Switch>
    )
}

export default Routes;