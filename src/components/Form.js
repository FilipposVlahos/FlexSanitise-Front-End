import React, { useState } from "react";
import sanitise from "../api/sanitise_api"
import {Form as BootstrapForm, Button} from 'react-bootstrap';
import "./Form.css"
import useWindowDimensions from "../useWindowDimension";

const LOADING = "loading";
const RESULT = "result";

function Form (props) {
    const [text, setText] = useState("");
    const [values, setValues] = useState({ questions: []});
    const { height } = useWindowDimensions();

    function createInputs() {
        return values.questions.map((el, i) =>
            <div key={i} >
                <BootstrapForm.Group controlId="exampleForm.ControlTextarea1">
                    <BootstrapForm.Label>Question {i + 1} </BootstrapForm.Label>
                    <BootstrapForm.Control as="textarea" rows={1} onChange={handleChange.bind(i)} required />
                </BootstrapForm.Group>
                <Button variant="danger" onClick={removeClick.bind(i)} >
                    Remove Question {i + 1}
                </Button>
            </div>
        );
    }

    function handleChange(event) {
        let vals = [...values.questions];
        vals[this] = event.target.value;
        setValues({ questions: vals });
    }

    const addClick = () => {
        setValues({ questions: [...values.questions, ''] })
    }

    const removeClick = () => {
        let vals = [...values.questions];
        vals.splice(this, 1);
        setValues({ questions: vals });
    }

    async function handleSubmit() {
        props.setPage(LOADING);
        var questions = JSON.stringify(values);
        console.log(questions)
        sanitise(text, questions)
            .then(response => {
                props.setResponse(response.data.sanitisedDocument);
                console.log(response.data.sanitisedDocument)
                props.setPage(RESULT);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.status);
                    props.setError(error.response.status);
                } else if (error.request) {
                    console.log(error.request);
                    props.setError(error.request);
                } else {
                    console.log('Error', error.message);
                    props.setError(error.message);
                }
                props.setPage(RESULT);
            });
    }

    return(
    <BootstrapForm onSubmit={handleSubmit}>
        <div className= "row">
            <div className = "column left">
                <BootstrapForm.Group controlId="exampleForm.ControlTextarea1">
                    <BootstrapForm.Label>Text to be Sanitised</BootstrapForm.Label>
                    <BootstrapForm.Control as="textarea" rows={height/35} onChange={e => setText(e.target.value)} required/>
                </BootstrapForm.Group>
            </ div>

            <div className = "column right">
                {createInputs()}
                <br />
                <Button variant="secondary" onClick={addClick} >
                    Add Question
                </Button>
            </div>
        </div>
        <br />
        <Button variant="primary" type="submit">
                Submit
        </Button>
    </BootstrapForm>    
    );
}

export default Form;