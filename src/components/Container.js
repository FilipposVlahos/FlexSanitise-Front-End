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
    const [error, setError] = useState();

    let view = page;

    switch (page) {
        case FORM:
            view = <Form setPage={setPage} setResponse={setResponse} setError={setError} />
            break;

        case RESULT:
            view = <Result response={response} error={error} />
            break;
        case LOADING:
            view = <BoxLoading />;
            break;
        default:
            view = "This should not have happened"
    }

    return(
        <>{view}</>
    );
}

export default Container;