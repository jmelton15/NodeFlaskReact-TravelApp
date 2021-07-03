import "./FollowPage.css";
import ConnectionCard from "../AddConnections/ConnectionCard";
import { Redirect } from "react-router-dom";

const FollowPage = ({user,token}) => {
    if(!token || !user) {
        return <Redirect to="/"></Redirect>
    }
    return (
        <div className="FollowPage-ConnectionsListContainer container">
            {user.following.map((connection) => {
                return <ConnectionCard connection={connection} user={user} token={token} />
            })}
        </div>
    )
}

export default FollowPage;