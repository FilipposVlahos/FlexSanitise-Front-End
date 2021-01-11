import React from "react";
import { Button } from 'reactstrap';


const FORM = "form";

function Result(props) {
    let result;
    if (props.response) {
        result = 
        <>
            {props.response}
        </>;
    } else if (props.error) {
        result =  
        <>
            Error!
            {props.error}
        </>;
    }

    return(
        <>
            {result}
            <br /><br />
            <div>
                <Button
                    onClick={() => props.setPage(FORM)}
                >
                Main Page
                </Button>
            </div>
        </>
    );

}

export default Result;