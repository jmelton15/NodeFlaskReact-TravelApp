import {useState} from "react";
import {Form,FormGroup,Input,Card,CardBody,CardImg,Label,Button} from "reactstrap";

const EditProfileForm = ({commitEdits}) => {
    const initialState = {
        email:"",
        password:"",
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
        commitEdits({...formData});
        setFormData(initialState);
    }


    return (
        <Form onSubmit={handleSubmit} className="mt-3 EditProfileForm">
            <FormGroup>
            <Card className="route-form-container">
                <CardImg top width="100%" src="" />
                <CardBody className="d-flex flex-column">
                    <Label htmlFor="email">Change Email Address</Label>
                    <Input 
                        key="1"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter New Email"
                        value={formData.email}
                        onChange={handleChange}
                    >
                    </Input>
                    <Label htmlFor="password" className="mt-3">Update Password</Label>
                    <Input 
                        key="2"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter New Password"
                        value={formData.password}
                        onChange={handleChange}
                    >
                    </Input>
                    <Button className="mt-3" onClick={handleSubmit}>Edit</Button>
                </CardBody>  
            </Card> 
            </FormGroup>
        </Form>
    )
}

export default EditProfileForm;