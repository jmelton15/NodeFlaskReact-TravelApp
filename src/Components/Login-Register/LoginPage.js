import LoginForm from "./LoginForm";
import { FlaskApi } from "../../APIRequests/flask_api";
import { Redirect } from "react-router-dom";

const LoginPage = ({setUser,user,setToken}) => {
    const loginUser = async (userData) => {
        const res = await FlaskApi.loginUser(userData.username,userData.password);
        console.log(res.user_data)
        setUser(res.user_data);
        setToken(res.token);
    }
        if(!user.username) {
            return (
                <div className="text-center" id="HomePage-ButtonGroup">
                    <LoginForm loginUser={loginUser}/>
                </div>
            )
        }
        else {
            return (
                <Redirect to={`/`}/>
            )
        }
}

export default LoginPage;