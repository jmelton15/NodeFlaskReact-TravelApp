import {Route,Switch, Redirect} from "react-router-dom";
import {useContext} from "react";
import HomePage from "./Components/HomePage/HomePage"
import CreateTripPage from "./Components/Trip/CreateTripPage";
import ProfilePage from "./Components/Profile/ProfilePage";
import TravelJournal from "./Components/TravelJournal/TravelJournal";
import LoginPage from "./Components/Login-Register/LoginPage";
import SiteTitleComponent from "./Components/TitlePicture/SiteTitleComp";
import RegisterPage from "./Components/Login-Register/RegisterPage";
import titleImg from "./Images/RibbonWithText.png";
import UserContext from "./helpers/UserContext";
import Logout from "./Components/Login-Register/Logout";
import MessagesPage from "./Components/Messages/MessagesPage";
import FindUserPage from "./Components/AddConnections/FindUserPage";


const titleData = {
    source:titleImg,
    height:"850px",
    width:"100%"
}

const Routes = () => {
    const {user,setUser,token,setToken,markers,setMarkers,tripData,setTripData} = useContext(UserContext)

    return (
        <Switch>
            <Route exact path="/">
                <SiteTitleComponent imgSourceData={titleData} />
                <HomePage user={user} token={token}/>
            </Route>
            <Route exact path="/users/:userId/profile">
                <ProfilePage user={user} setUser={setUser} token={token}/>
            </Route>
            <Route exact path="/users/:userId/traveljournal">
                <TravelJournal markers={markers} 
                               user={user} 
                               tripData={tripData} 
                               setTripData={setTripData}
                               token={token}
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
                <MessagesPage user={user} token={token}/>
            </Route>
            <Route exact path="/users/find">
                <FindUserPage user={user} token={token}/>
            </Route>
            <Route exact path="/login">
                <SiteTitleComponent imgSourceData={titleData}/>
                <LoginPage setUser={setUser} 
                           user={user} 
                           setToken={setToken}
                /> 
            </Route>
            <Route exact path="/register">
                <SiteTitleComponent imgSourceData={titleData} />
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