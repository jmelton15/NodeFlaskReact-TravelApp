import "./FollowerPage.css";
import ConnectionCard from "../AddConnections/ConnectionCard";
import { Redirect } from "react-router-dom";

const FollowerPage = ({user,connection,token}) => {
    if(!token || !user) {
        return <Redirect to="/"></Redirect>
    }
    return (
        <div className="FollowerPage-ConnectionsListContainer container">
            {user.followers.map((connection) => {
                return <ConnectionCard connection={connection} user={user} token={token} />
            })}
        </div>
    )
}

export default FollowerPage;