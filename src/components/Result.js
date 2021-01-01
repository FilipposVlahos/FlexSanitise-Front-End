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
                {props.error.response ? props.error.response.status : ""}
                {props.error.response ? props.error.response.headers : ""}

                {props.error.request ? props.error.request : ""}

                {props.error.message ? props.error.message : ""}
            </>
        )
    }

}

export default Result;