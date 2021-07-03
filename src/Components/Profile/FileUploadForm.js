import {useState} from "react";
import {Form,FormGroup,Input,Label,Button} from "reactstrap";

const FileUploadForm = ({uploadPicture}) => {
    const [selectedFile,setSelectedFile] = useState(null);
    const [inputShownValue,setInputShownValue] = useState(null);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if(!file) {
            alert("Please select a picture to upload!");
            return;
        }
        const fileSize = Math.round(file.size/1024); //in megabytes
        if(fileSize >= 5500) {
            alert("File is Too Big, Please Upload A Smaller Picture");
            return;
        }
        if(fileSize < 1024) {
            alert("File is Too Small, Please Upload A Larger Picture");
            return;
        }
        setInputShownValue(null);
        setSelectedFile(file);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!selectedFile) {
            alert("Please select a picture to upload!");
            setSelectedFile(null);
            return;
        }
        console.log(selectedFile)
        uploadPicture(selectedFile);
        setSelectedFile(null);
        setInputShownValue("")
    }

    return (
        <Form onSubmit={handleSubmit} className="mt-3">
            <FormGroup className="d-flex flex-column">
                <Label htmlFor="fileInput">Change Profile Picture</Label> 
                <Input  
                    key="1"
                    id="fileInput"
                    type="file"
                    name="fileInput"
                    defaultValue={selectedFile}
                    value = {inputShownValue && inputShownValue}
                    onChange={handleFileSelect}
                >
                </Input>
            <Button className="mt-2 btn-sm">Submit Picture Upload</Button>
            </FormGroup>
        </Form>
    )
}

export default FileUploadForm;