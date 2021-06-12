import {Route,Switch, Redirect} from "react-router-dom";
import {useContext} from "react";
import HomePage from "./HomePage"
import CreateTripPage from "./CreateTripPage";
import ProfilePage from "./ProfilePage";
import TravelJournal from "./TravelJournal";
import LoginPage from "./LoginPage";
import SiteTitleComponent from "./SiteTitleComp";
import RegisterPage from "./RegisterPage";
import titleImg from "./Images/RibbonWithText.png";

const titleData = {
    source:titleImg,
    height:"850px",
    width:"100%"
}

const Routes = ({changeLocations,locations,csrfToken}) => {
    return (
        <Switch>
            <Route exact path="/">
                <SiteTitleComponent imgSourceData={titleData} />
                <HomePage />
            </Route>
            <Route exact path="/users/:userId/profile">
                <ProfilePage username="Test Username"/>
            </Route>
            <Route exact path="/users/:userId/traveljournal">
                <TravelJournal />
            </Route>
            <Route path="/trip/create">
                <CreateTripPage changeLocations={changeLocations} locations={locations}/>
            </Route>
            <Route exact path="/login">
                <SiteTitleComponent imgSourceData={titleData}/>
                <LoginPage csrfToken={csrfToken}/>
            </Route>
            <Route exact path="/register">
                <SiteTitleComponent imgSourceData={titleData} />
                <RegisterPage />
            </Route>
            <Redirect to="/"></Redirect>
        </Switch>
    )
}

export default Routes;