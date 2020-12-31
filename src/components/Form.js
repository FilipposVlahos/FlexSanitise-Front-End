import React, { useState } from "react";
import sanitise from "../api/sanitise_api"


const Form = (page) => {
    let re;

    function handleSubmit(text, questions) {
        sanitise(text, questions)
            .then(function (response) {
                re = response;
            })
            .catch(function (error) {
                re = error;
            });
    }



    return(<h>Form</h>);
}

export default Form;