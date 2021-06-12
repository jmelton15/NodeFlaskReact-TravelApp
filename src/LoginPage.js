import LoginForm from "./LoginForm";
import { FlaskApi } from "./APIRequests/flask_api";

const LoginPage = ({csrfToken}) => {
    const loginUser = async (userData) => {
        const res = await FlaskApi.loginUser(userData.username,userData.password,csrfToken);
    }

    return (
        <>
        <div className="text-center" id="HomePage-ButtonGroup">
            <LoginForm loginUser={loginUser}/>
        </div>
        </>
    )
}

export default LoginPage;