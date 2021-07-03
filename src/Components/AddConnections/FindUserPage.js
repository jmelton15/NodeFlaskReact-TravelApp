import "./FindUserPage.css";
import FindUserForm from "./FindUserForm";
import { NodeApi } from "../../APIRequests/nodeApi";
import { useState } from "react";
import ConnectionCard from "./ConnectionCard";
import { Redirect } from "react-router-dom";

const FindUserPage = ({user,token}) => {
    const [foundUser,setFoundUser] = useState(null);

    if(!token || !user) {
        return <Redirect to="/"></Redirect>
    }
    
    const findUser = async (formData) => {
        let foundUserData = await NodeApi.findUser(formData.username,token);
        console.log(foundUserData)
        if(foundUserData) setFoundUser(foundUserData);
    }

    return (
        <div className="container FindUserPage-MainContainer d-flex flex-column">
            <div>
                <FindUserForm findUser={findUser} user={user}/>
            </div>
            <div className="container-sm w-50">
            {foundUser && <ConnectionCard connection={foundUser} user={user} token={token}/>}
            </div>
        </div>
    )
}

export default FindUserPage;