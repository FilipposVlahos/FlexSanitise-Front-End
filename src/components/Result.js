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
        element.download = "sanitised_document.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    let result;
    if (props.response != null && props.response.sanitisedDocument != null && props.response.highlightedDocument != null) {
    let highlightedDocument = props.response.highlightedDocument.replace(/(?:\r\n|\r|\n)/g, '<br />');
        const html = '<div style="text-align:left;">' + highlightedDocument + '</div>';
        result = 
        <div>
            <div className="row">
                <div className="column left">
                    <h4>Sanitised Document</h4>
                    <InputGroup>
                        <FormControl as="textarea" aria-label="With textarea" defaultValue={props.response.sanitisedDocument} rows={height/35} id="sanitisedText"/>
                    </InputGroup>
                </div>
                <div className="column right">
                    <h4>Highlighted Document</h4>
                    <div>
                        <div dangerouslySetInnerHTML={{__html: html}}></div>
                    </div>
                </div>
            </div>
            <Button variant="secondary" onClick={downloadTxtFile}>Download Sanitised Document</Button>
        </div>;
    } else if (props.error) {
        result =  
        <Alert variant="danger" >
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
                {props.error}
            </p>
        </Alert>;
    }

    return(
        <>
            <div className="padding">
                {result}
            </div>
            <div className="padding">
                <Button onClick={() => props.setPage(FORM)} >
                    Main Page
                </Button>
            </div>
        </>
    );

}

export default Result;