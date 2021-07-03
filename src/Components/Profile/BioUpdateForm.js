import "./BioUpdateForm.css";
import {useState} from "react";
import {Form,FormGroup,Input} from "reactstrap";

const BioUpdateForm = ({updateBio}) => {
    const initialState = {
        bioTxt:"",
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
        updateBio({...formData});
        setFormData(initialState);
    }

    return (
        <Form onSubmit={handleSubmit} className="mt-3 w-100">
            <FormGroup>
                <Input  
                    key="1"
                    id="bioTxt"
                    type="textarea"
                    name="bioTxt"
                    placeholder="Type Your Bio Here... (300 character Max)"
                    value={formData.bioTxt}
                    onChange={handleChange}
                >
                </Input>
                <div className="d-flex justify-content-end">
                    <button className="BioUpdateForm-CheckMarkIconContainer d-flex justify-content-center me-3">✔️</button>
                </div>
            </FormGroup>
        </Form>
    )
}

export default BioUpdateForm;