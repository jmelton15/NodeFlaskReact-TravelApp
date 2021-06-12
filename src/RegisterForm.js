import {useState} from "react";
import {Form,FormGroup,Input,Card,CardBody,CardImg,Label,Button} from "reactstrap";

const RegisterForm = ({registerUser}) => {
    const initialState = {
        username:"",
        email:"",
        password:""
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
        registerUser({...formData});
        setFormData(initialState);
    }

    return (
        <Form onSubmit={handleSubmit} className="mt-3">
            <FormGroup>
            <Card className="route-form-container">
                <CardImg top width="100%" src="" />
                <CardBody className="d-flex align-items-center justify-content-center">
                    <div className="d-flex flex-column align-items-start">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                        key="1"
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Enter Username"
                        value={formData.username}
                        onChange={handleChange}
                    >
                    </Input>
                    </div>
                    <div className="d-flex flex-column align-items-start">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                        key="2"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                    >
                    </Input>
                    </div>
                    <div className="d-flex flex-column align-items-start">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                        key="3"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                    >
                    </Input>
                    </div>
                </CardBody>  
            </Card> 
            <Button className="mt-2 btn-lg" style={{"background-color":"#21ADA8"}}>Register!</Button>
            </FormGroup>
        </Form>
    )
}

export default RegisterForm;