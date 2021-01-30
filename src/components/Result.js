import React from "react";
import { Alert, Button, InputGroup, FormControl } from 'react-bootstrap';

const FORM = "form";

function Result(props) {
    let result;
    if (props.response) {
        result = 
        <InputGroup>
            <InputGroup.Prepend>
                </InputGroup.Prepend>
                <FormControl as="textarea" aria-label="With textarea" 
                defaultValue={props.response}
                rows={21}/>
        </InputGroup>;
        
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
            {result}
            <br />
            <Button onClick={() => props.setPage(FORM)} >
                Main Page
            </Button>
        </>
    );

}

export default Result;