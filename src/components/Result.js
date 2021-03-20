import React from "react";
import { Alert, Button } from 'react-bootstrap';
import "./Result.css"

const FORM = "form";

function Result(props) {

    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([props.response.sanitisedDocument], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "sanitised_document.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    let Result;
    if (props.response != null && props.response.sanitisedDocument != null && props.response.highlightedDocument != null) {
        const highlightedDocument = props.response.highlightedDocument.replace(/(?:\r\n|\r|\n)/g, '<br />');
        const html_highlighted = '<div style="text-align:left;">' + highlightedDocument + '</div>';
        const sanitisedDocument = props.response.sanitisedDocument.replace(/(?:\r\n|\r|\n)/g, '<br />')
        const html_sanitised = '<div style="text-align:left;">' + sanitisedDocument + '</div>';
        Result = 
        <div>
            <div className="row">
                <div className="column left verticalLine">
                    <h4>Sanitised Document</h4>
                    <div dangerouslySetInnerHTML={{__html: html_sanitised}}></div>
                </div>
                <div className="column right">
                    <h4>Highlighted Document</h4>
                    <div>
                        <div dangerouslySetInnerHTML={{__html: html_highlighted}}></div>
                    </div>
                </div>
            </div>
            <br />
            <Button variant="secondary" onClick={downloadTxtFile}>Download Sanitised Document</Button>
        </div>;
    } else if (props.error) {
        Result =  
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
                {Result}
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