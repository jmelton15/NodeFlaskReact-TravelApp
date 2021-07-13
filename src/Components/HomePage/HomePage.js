import { Button} from 'reactstrap';
import {useHistory} from "react-router-dom";
import "./HomePage.css"

const HomePage = ({user,token}) => {
    
    const history = useHistory();
    const goToPage = (e) => {
        const page = e.target.id;
        history.push(page);
    }
    
    
    if(token) {
        return (
            <div className="HomePage-HeaderContainer">
                <h1 className="HomePage-LoggedInHeader" id="HomePage-ButtonGroup">Welcome, {user.username.toUpperCase()}</h1>
            </div>
        )
    }
    else {
        return (
            <>
            <div className="HomePage-Container container">
                <div className="text-center btn-group-lg" id="HomePage-ButtonGroup">
                    <Button className="HomePage-Button" id="/register" onClick={goToPage}>Register</Button>
                    <Button className="HomePage-Button" id="/login" onClick={goToPage}>Login</Button>
                </div>
            </div>
            </>
        )
    }
}

export default HomePage;