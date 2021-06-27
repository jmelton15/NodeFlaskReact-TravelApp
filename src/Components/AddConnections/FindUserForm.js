import {useState} from "react";
import {Form,FormGroup,Input,Button} from "reactstrap";
import "./FindUserForm.css";

const FindUserForm = ({findUser}) => {
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
                <Button id="findUserBtn" className="mt-2 btn-lg">Find</Button>
            </FormGroup>
        </Form>
    )
}

export default FindUserForm;