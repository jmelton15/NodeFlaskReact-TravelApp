import "./FollowerPage.css";
import ConnectionCard from "../AddConnections/ConnectionCard";
import { Redirect } from "react-router-dom";
import GetScreenSize from '../../helpers/GetScreenSize';

const FollowerPage = ({user,token}) => {
    if(!token || !user) {
        return <Redirect to="/"></Redirect>
    }
    const [screenWidth] = GetScreenSize();
    
    return (
        <div className={screenWidth > 600 ? "FollowerPage-ConnectionsListContainer container" : "FollowerPage-ConnectionsListContainer px-3"}>
            {user.followers.map((connection) => {
                return <ConnectionCard connection={connection} user={user} token={token} />
            })}
        </div>
    )
}

export default FollowerPage;