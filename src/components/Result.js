import React from "react";

function Result(props) {
    if (props.response) {
        return(
            <>
                {props.response}
            </>
        )
    } else if (props.error) {
        return(
            <>
                Error!
                {props.error}
            </>
        )
    }

}

export default Result;