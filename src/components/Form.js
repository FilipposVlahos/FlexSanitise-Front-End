import React, { useState } from "react";
import NamedEntitiesModal from "./NamedEntitiesModal"
import { sanitise } from "../api/sanitise_api"
import { Form as BootstrapForm, Button, Badge  } from 'react-bootstrap';
import useWindowDimensions from "../useWindowDimension";
import "./Form.css"
import errorHandling from "../api/error_handling_api"

const LOADING = "loading";
const RESULT = "result";

function Form (props) {
    const [text, setText] = useState(props.config.text);
    const [values, setValues] = useState(props.config.values);
    const [dates, setDates] = useState(props.config.dates);
    const [days, setDays] = useState(props.config.days);
    const [months, setMonths] = useState(props.config.months);
    const [emails, setEmails] = useState(props.config.emails);
    const [selectedNE, setSelectedNE] = useState(props.config.selectedNE);
    const { height } = useWindowDimensions();

    function createInputs() {
        return values.questions.map((el, i) =>
            <div key={i} >
                <BootstrapForm.Group controlId="exampleForm.ControlTextarea1">
                    <BootstrapForm.Label>Question {i + 1} </BootstrapForm.Label>
                    <BootstrapForm.Control defaultValue={values.questions[i]} as="textarea" rows={1} onChange={handleChange.bind(i)} required />
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
        vals.pop();
        // vals.splice(this, 1);
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
        props.setConfig({"text": text, "values": values, "dates": dates, "days": days, "months": months, "emails": emails, "selectedNE": selectedNE});
        let questions = JSON.stringify(values);
        let regex = populateRegex();
        sanitise(text, questions, regex, selectedNE)
            .then(response => {
                props.setResponse(response.data);
                props.setPage(RESULT);
            })
            .catch(error => {
                props.setError(errorHandling(error));
                props.setPage(RESULT);
            });
    }

    function createBadges() {
        return selectedNE.map((el, i) =>
            <div key={i} >
                <Badge pill variant="secondary">{el[0]} - {el[1]}</Badge>
            </div>
        );
    }

    return(
    <BootstrapForm onSubmit={handleSubmit}>
        <div className= "row">
            <div className = "column left">
                <BootstrapForm.Group controlId="exampleForm.ControlTextarea1">
                    <h4>Text to be Sanitised</h4>
                    <BootstrapForm.Control as="textarea" defaultValue={text} rows={height/35} onChange={e => setText(e.target.value)} required/>
                </BootstrapForm.Group>
            </ div>

            <div className = "column">
                <div>
                    <h4>Sanitisations by category</h4>
                    {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                            <BootstrapForm.Check inline label="Dates" defaultChecked={dates} type={type} id={`inline-${type}-1`} onChange={e => setDates(!dates)} />
                            <BootstrapForm.Check inline label="Days" defaultChecked={days} type={type} id={`inline-${type}-3`} onChange={e => setDays(!days)}/>
                            <BootstrapForm.Check inline label="Months" defaultChecked={months} type={type} id={`inline-${type}-4`} onChange={e => setMonths(!months)}/>
                            <BootstrapForm.Check inline label="Emails" defaultChecked={emails} type={type} id={`inline-${type}-2`} onChange={e => setEmails(!emails)} />
                        </div>
                    ))}
                </div>
                <hr/>
                <h4>Named Entity Recognition</h4>
                <div>
                    <NamedEntitiesModal text={text} setSelectedNE={setSelectedNE}/>
                    {createBadges()}
                </div>
                <hr />
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