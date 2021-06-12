import { Button} from 'reactstrap';
import {useHistory} from "react-router-dom";
import "./HomePage.css"

const HomePage = ({username}) => {
    
    const history = useHistory();
    const goToPage = (e) => {
        const page = e.target.id;
        history.push(page);
    }
    
    
    if(username) {
        //add logic for when signed in
    }

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

export default HomePage;