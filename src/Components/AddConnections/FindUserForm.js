import {useState} from "react";
import {Form,FormGroup,Input,Button} from "reactstrap";
import "./FindUserForm.css";
import GetScreenSize from '../../helpers/GetScreenSize';

const FindUserForm = ({findUser,user}) => {
    const [screenWidth] = GetScreenSize();

    const initialState = {
        username:""
    }

    const [formData,setFormData] = useState(initialState);

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData(formData => ({
            ...formData,[name]:value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.username === user.username) {
            setFormData(initialState)
            return;
        }
        findUser({...formData});
        setFormData(initialState);
    }

    return (
        <Form className="FindUserForm" onSubmit={handleSubmit}>
            <FormGroup className="FindUserForm-FindUserFormGroup">
                <Input 
                    type="text" 
                    id="username-searchbox"
                    name="username" 
                    placeholder="Type Username To Find User..."
                    value={formData.username}
                    onChange={handleChange}
                ></Input>
                <Button id="findUserBtn" className={screenWidth > 600 ? "mt-2 btn-lg" : "mt-2"}>Find</Button>
            </FormGroup>
        </Form>
    )
}

export default FindUserForm;