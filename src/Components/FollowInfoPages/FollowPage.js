import "./FollowPage.css";
import ConnectionCard from "../AddConnections/ConnectionCard";
import { Redirect } from "react-router-dom";
import GetScreenSize from '../../helpers/GetScreenSize';

const FollowPage = ({user,token}) => {
    if(!token || !user) {
        return <Redirect to="/"></Redirect>
    }

    const [screenWidth] = GetScreenSize();
    return (
        <div className={screenWidth > 600 ? "FollowPage-ConnectionsListContainer container" : "FollowPage-ConnectionsListContainer px-3"}>
            {user.following.map((connection) => {
                return <ConnectionCard connection={connection} user={user} token={token} />
            })}
        </div>
    )
}

export default FollowPage;