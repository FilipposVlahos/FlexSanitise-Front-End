import React, { useState } from "react";
import { ner } from "../api/sanitise_api"
import { Button, ToggleButton, Modal, Alert } from 'react-bootstrap';
import { BoxLoading } from 'react-loadingg';
import errorHandling from "../api/error_handling_api"

function NamedEntitiesModal(props) {
    const [show, setShow] = useState(false);
    const [responseReceived, setResponseReceived] = useState(false);
    const [namedEntities, setNamedEntities] = useState([]);
    const [values, setValues] = useState({ checked: [] });

    const handleShow = () => {
        setShow(true);
        setResponseReceived(false);
        ner(props.text)
            .then(response => {
                setNamedEntities(response.data.ner);
                var temp = []
                for (var i = 0; i < response.data.ner.length; i++) {
                    temp.push(false);
                }
                setValues({ checked: temp })
                setResponseReceived(true);
            })
            .catch((err) => {
                console.log(errorHandling(err))
            })
    }

    function createCheckboxes() {
        return values.checked.map((el, i) =>
            <div key={i} >
                    <ToggleButton
                        type="checkbox"
                        variant="outline-secondary"
                        checked={el}
                        onChange={handleChange.bind(i)}
                        block
                    >
                        {namedEntities[i][0]} - {namedEntities[i][1]}
                   </ToggleButton>
            </div>
        );
    }

    function handleChange(event) {
        let vals = [...values.checked];
        vals[this] = event.currentTarget.checked;
        setValues({ checked: vals });
    }

    function handleSubmit() {
        let selected = []
        values.checked.forEach(function (value, i) {
            if (value) {
                selected.push(namedEntities[i]);
            }
        });
        props.setSelectedNE(selected)
        setShow(false)
    }
    
    const ModalBody = () => {
        if (responseReceived && namedEntities.length > 0) {
            return (
                <div>
                    {createCheckboxes()}
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Button variant="primary" onClick={handleSubmit}> Submit </Button>
                    </div>
                </div>);
        } else if (responseReceived && namedEntities.length === 0) {
            return (
                <Alert variant="warning">
                    No Named Entities Found in Text
                </Alert>);
        } else {
            return (
                <div>
                    <br /><BoxLoading size="medium" /><br />
                </div>);
        }
    }

    return(
        <div>
            <Button variant="secondary" onClick={handleShow}>
                Find Named Entities
            </Button>
            <Modal centered show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title >Select Named Entities to Sanitise</Modal.Title>
                </Modal.Header>
                <Modal.Body><ModalBody /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"  onClick={() => setShow(false)}> Cancel </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default NamedEntitiesModal;