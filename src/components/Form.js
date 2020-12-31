import React, { useState } from "react";
import sanitise from "../api/sanitise_api"

const LOADING = "loading";
const RESULT = "result";

function Form (props) {
    const [text, setText] = useState("");
    const [questions, setQuestions] = useState("");

    async function handleSubmit() {
        props.setPage(LOADING);
        sanitise(text, questions)
            .then(function (response) {
                props.setResponse(response);
                props.setPage(RESULT);
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                props.setError(error);
                props.setPage(RESULT)
            });
    }


    return(
    <form onSubmit={handleSubmit}>
        <label>
            Document:
            <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
            />
            Questions:
            <input
                type="text"
                value={questions}
                onChange={e => setQuestions(e.target.value)}
            />
        </label>
        <input type="submit" value="Submit" />
    </form>    
    );
}

export default Form;