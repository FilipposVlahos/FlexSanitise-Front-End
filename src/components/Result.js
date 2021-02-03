import React from "react";
import { Alert, Button, InputGroup, FormControl } from 'react-bootstrap';
import useWindowDimensions from "../useWindowDimension";
import "./Result.css"

const FORM = "form";

function Result(props) {
    const { height } = useWindowDimensions();

    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([document.getElementById('sanitisedText').value], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    let result;
    if (props.response) {
        result = 
        <div>
            <InputGroup>
                <FormControl as="textarea" aria-label="With textarea" defaultValue={props.response} rows={height/35} id="sanitisedText"/>
            </InputGroup>
            <br/>
            <Button variant="secondary" onClick={downloadTxtFile}>Download</Button>
        </div>;
        
    } else if (props.error) {
        result =  
        <Alert variant="danger" >
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
                Error code: {props.error}
            </p>
        </Alert>
    }

    return(
        <>
            <div className="result">
                {result}
            </div>
            <div className="result">
                <Button onClick={() => props.setPage(FORM)} >
                    Main Page
                </Button>
            </div>
        </>
    );

}

export default Result;