import React, { useState } from "react";
import sanitise from "../api/sanitise_api"
import {Form as BootstrapForm, Button} from 'react-bootstrap';
import useWindowDimensions from "../useWindowDimension";
import "./Form.css"

const LOADING = "loading";
const RESULT = "result";

function Form (props) {
    const [text, setText] = useState("");
    const [values, setValues] = useState({ questions: []});
    const { height } = useWindowDimensions();
    const [dates, setDates] = useState(false);
    const [days, setDays] = useState(false);
    const [months, setMonths] = useState(false);
    const [emails, setEmails] = useState(false);

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

    const populateRegex = () => {
        let regex = [];
        if (dates) {
            regex.push("dates");
        }
        if (days) {
            regex.push("days");
        }
        if (months) {
            regex.push("months");
        }
        if (emails) {
            regex.push("emails")
        } 
        return regex;
    }

    async function handleSubmit() {
        props.setPage(LOADING);
        let questions = JSON.stringify(values);
        let regex = populateRegex();
        sanitise(text, questions, regex)
            .then(response => {
                props.setResponse(response.data);
                console.log(response.data.sanitisedDocument + " " + response.data.highlightedDocument);
                props.setPage(RESULT);
            })
            .catch(error => {
                let showError;
                if (error.response) {
                    console.log(error.response.Headers)
                }
                if (error.message) {
                    console.log('Error', error.message);
                    showError = error.message;
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request)
                    showError = error.request;
                } 

                props.setError(showError);
                props.setPage(RESULT);
            });
    }

    return(
    <BootstrapForm onSubmit={handleSubmit}>
        <div className= "row">
            <div className = "column left">
                <BootstrapForm.Group controlId="exampleForm.ControlTextarea1">
                    <h4>Text to be Sanitised</h4>
                    <BootstrapForm.Control as="textarea" rows={height/35} onChange={e => setText(e.target.value)} required/>
                </BootstrapForm.Group>
            </ div>

            <div className = "column">
                <div>
                    <h4>Sanitisations by category</h4>
                    {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                            <BootstrapForm.Check inline label="Dates" type={type} id={`inline-${type}-1`} onChange={e => setDates(!dates)} />
                            <BootstrapForm.Check inline label="Days" type={type} id={`inline-${type}-3`} onChange={e => setDays(!days)}/>
                            <BootstrapForm.Check inline label="Months" type={type} id={`inline-${type}-4`} onChange={e => setMonths(!months)}/>
                            <BootstrapForm.Check inline label="Emails" type={type} id={`inline-${type}-2`} onChange={e => setEmails(!emails)} />
                        </div>
                    ))}
                </div>
                <hr/>
                <h4>QA sanitisations</h4>
                {createInputs()}
                <div className="padding">
                    <Button variant="secondary" onClick={addClick} >
                        Add Question
                    </Button>
                </div>
            </div>
        </div>
        <Button variant="primary" type="submit">
                Submit
        </Button>
    </BootstrapForm>    
    );
}

export default Form;