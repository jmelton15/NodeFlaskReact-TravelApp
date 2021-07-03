import {useEffect, useState} from "react";
import {Form,FormGroup,Input,Button,Collapse,Tooltip} from "reactstrap";
import Picker from "emoji-picker-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSmile} from "@fortawesome/free-solid-svg-icons";

const MessageForm = ({sendMsg}) => {

    const initialState = {
        message:""
    }

    const [formData,setFormData] = useState(initialState);
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggleEmojis = () => setIsOpen(!isOpen);
    const toggleEmojiTooltip = () => setTooltipOpen(!tooltipOpen);
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

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        const emoji = emojiObject.emoji;
        formData.message += emoji;
    };

    return (
        <>
        <div className="MessagePage-EmojiCollapse mx-3">
            <FontAwesomeIcon icon={faSmile} onClick={toggleEmojis} id="messagepage-emojiToggler"/>
            <Tooltip toggle={toggleEmojiTooltip} isOpen={tooltipOpen} target="messagepage-emojiToggler">Click To Add Emojis!</Tooltip>
            <Collapse isOpen={isOpen}>
                <div className="h-100 w-100">
                    {isOpen &&<Picker onEmojiClick={onEmojiClick} />}
                </div>
            </Collapse>
        </div>
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
        
        </>
    )
}

export default MessageForm;