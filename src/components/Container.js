import React, { useState } from "react";
import { BoxLoading } from 'react-loadingg';

import Form from "./Form"
import Result from "./Result"

const FORM = "form";
const RESULT = "result";
const LOADING = "loading";

const Container = () => {
    const [page, setPage] = useState(FORM);
    const [response, setResponse] = useState();
    const [error, setError] = useState("");
    const [config, setConfig] = useState({ "text": "", "values": { questions: [] }, "dates": false, "days": false, "months": false, "emails": false, "selectedNE": [] });

    function pageToDisplay() {
        switch (page) {
            case FORM:
                console.log("Config: " + config +  " Config text: " +  config.text);
                return (<Form setPage={setPage} setResponse={setResponse} setError={setError} setConfig={setConfig} config={config} />);
            case RESULT:
                return (<Result response={response} error={error} setPage={setPage} setConfig={setConfig} />)
            case LOADING:
                return(<BoxLoading size="large"/>);
            default:
                return("This should not have happened");
        }
    }

    return(
        <div>
            {pageToDisplay()}
        </div>
    );
}

export default Container;