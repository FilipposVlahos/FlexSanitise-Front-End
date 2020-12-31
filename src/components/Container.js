import React, { useState } from "react";
import { BoxLoading } from 'react-loadingg';

import Form from "./Form"

const FORM = "form";
const RESULT = "result";
const LOADING = "loading";

const Container = () => {
    const [page, setPage] = useState(FORM);
    let view = page;

    switch (page) {
        case FORM:
            view = <Form page />;
            break;

        case RESULT:
            view = <h1></h1>
            break;
        case LOADING:
            view = <BoxLoading />;
        default:
            view = <Form />
    }

    return(
        <h1>{view}</h1>
    );
}

export default Container;