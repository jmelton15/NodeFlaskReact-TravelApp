import "./FindUserPage.css";
import FindUserForm from "./FindUserForm";
import { NodeApi } from "../../APIRequests/nodeApi";
import { useState } from "react";
import ConnectionCard from "./ConnectionCard";

const FindUserPage = ({user,token}) => {
    const [foundUser,setFoundUser] = useState(null);

    const findUser = async (formData) => {
        let foundUserData = await NodeApi.findUser(formData.username,token);
        console.log(foundUserData)
        if(foundUserData) setFoundUser(foundUserData);
    }

    return (
        <div className="container FindUserPage-MainContainer d-flex flex-column">
            <div>
                <FindUserForm findUser={findUser}/>
            </div>
            {foundUser && <ConnectionCard connection={foundUser} user={user}/>}
        </div>
    )
}

export default FindUserPage;