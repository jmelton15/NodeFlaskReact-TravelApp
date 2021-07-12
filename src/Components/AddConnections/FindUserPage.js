import "./FindUserPage.css";
import FindUserForm from "./FindUserForm";
import { NodeApi } from "../../APIRequests/nodeApi";
import { useState } from "react";
import ConnectionCard from "./ConnectionCard";
import { Redirect } from "react-router-dom";
import GetScreenWidth from '../../helpers/GetScreenWidth';


const FindUserPage = ({user,token}) => {
    const [screenWidth] = GetScreenWidth();
    const [foundUsers,setFoundUsers] = useState();

    if(!token || !user) {
        return <Redirect to="/"></Redirect>
    }
    
    const findUser = async (formData) => {
        let foundUsersData = await NodeApi.findUser(formData.username,token);
        console.log(foundUsersData)
        if(foundUsersData) setFoundUsers(foundUsersData);
    }
    if(screenWidth <= 600) {
        return (
            <div className="FindUserPage-MainContainer">
            <div>
                <FindUserForm findUser={findUser} user={user}/>
            </div>
            <div className="d-flex justify-content-center mx-3 mt-3">
            {foundUsers && foundUsers.map((connection) => {
                return <ConnectionCard connection={connection} user={user} token={token}/>
            })}
            </div>
        </div>
        )
    }
    else {
        return (
            <div className="container FindUserPage-MainContainer d-flex flex-column">
                <div>
                    <FindUserForm findUser={findUser} user={user}/>
                </div>
                <div className="container-sm w-50">
                {foundUsers && foundUsers.map((connection) => {
                    return <ConnectionCard connection={connection} user={user} token={token}/>
                })}
                </div>
            </div>
        )
    }
}

export default FindUserPage;