import RegisterForm from "./RegisterForm";
import { FlaskApi } from "../../APIRequests/flask_api";
import { Redirect } from "react-router-dom";

const RegisterPage = ({user,setUser,setToken}) => {
    const registerUser = async (formData) => {
        let res = await FlaskApi.registerUser(formData.username,formData.email,formData.password);
        setUser(res.user_data)
        setToken(res.token);
    }

    if(user.username) {
        return ( <Redirect to="/" />)
    }
    else{
        return (
            <>
            <div className="text-center" id="HomePage-ButtonGroup">
                <RegisterForm registerUser={registerUser}/>
            </div>
            </>
        )
    }
}

export default RegisterPage;