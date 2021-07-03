import "./UserInfoCard.css";
import FileUploadForm from "./FileUploadForm";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Tooltip
  } from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook,faEdit} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import BioUpdateForm from "./BioUpdateForm";
import {NodeApi} from "../../APIRequests/nodeApi";

const UserInfoCard = ({user,goToPage,profilePic,uploadPicture,getConnections,token}) => {
    const [bio,setBio] = useState(user.bio);

    const [journalTTOpen, setJournalTTOpen] = useState(false);
    const toggleJournalToolTip = () => setJournalTTOpen(!journalTTOpen);

    const [bioTTOpen, setBioTTOpen] = useState(false);
    const toggleBioToolTip = () => setBioTTOpen(!bioTTOpen);

    const [showEditBio,setShowEditBio] = useState(false);
    const toggleBioForm = () => setShowEditBio(!showEditBio);


    const updateBio = async (bioTxt) => {
        let newBio = await NodeApi.editBio(user.user_id,bioTxt.bioTxt,token);
        setBio(newBio.bio)
        toggleBioForm();
        getConnections();
    }
    
    return (
        <div className="UserInfoCard-CardContainer">
            <Card className="UserInfoCard-Card">
                <CardImg top width="100%" src={profilePic} alt="Profile" />
                <CardBody>
                    <div id="userinfocard-usernameBio">
                        <div className="d-flex justify-content-center">
                            <CardTitle className="text-center me-3" tag="h1" id="userinfocard-username">{user.username.toUpperCase()}</CardTitle>
                            <FontAwesomeIcon icon={faBook} 
                                            size="2x" 
                                            color="#E97451" 
                                            id="userinfocard-journalIcon" 
                                            onClick={() => goToPage(`users/${user.user_id}/traveljournal`)}
                            />
                            <Tooltip toggle={toggleJournalToolTip} isOpen={journalTTOpen} target="userinfocard-journalIcon">Open Travel Journal!</Tooltip>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            {showEditBio && <BioUpdateForm updateBio={updateBio}/>}
                            {!showEditBio && <CardSubtitle tag="h6" className="mb-2 text-muted w-100">{bio}</CardSubtitle>}
                            <FontAwesomeIcon id="userinfocard-editBioIcon" icon={faEdit} onClick={toggleBioForm}/>
                            <Tooltip toggle={toggleBioToolTip} isOpen={bioTTOpen} target="userinfocard-editBioIcon">Edit Bio</Tooltip>
                        </div>
                    </div>
                    <CardText id="userinfocard-followingInfo">
                        <p id="userinfocard-followers" onClick={() => goToPage(`users/${user.user_id}/followers`)}><span>Followers:</span> {user.follower_count}</p>
                        <p id="userinfocard-following" onClick={() => goToPage(`users/${user.user_id}/following`)}><span>Following:</span> {user.follow_count}</p>
                    </CardText>
                    <FileUploadForm uploadPicture={uploadPicture}/>
                </CardBody>
            </Card>
        </div>
    )
}

export default UserInfoCard;