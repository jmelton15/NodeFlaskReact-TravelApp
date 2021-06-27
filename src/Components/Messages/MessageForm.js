import {useState} from "react";
import {Form,FormGroup,Input,Button} from "reactstrap";

const MessageForm = ({sendMsg}) => {
    const initialState = {
        message:""
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
        sendMsg({...formData});
        setFormData(initialState);
    }

    return (
        <Form className="MessagePage-ChatForm" onSubmit={handleSubmit}>
            <FormGroup className="MessagePage-ChatBox">
                <Input 
                    type="textarea" 
                    id="messageInput"
                    name="message" 
                    placeholder="Write Message Here..."
                    value={formData.message}
                    onChange={handleChange}
                ></Input>
                <Button className="btn-lg" id="messageSubmitBtn">Send</Button>
            </FormGroup>
        </Form>
    )
}

export default MessageForm;