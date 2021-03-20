const axios = require('axios');

function sanitise(text, questions, regex, selectedNE) {
    return axios.post("http://127.0.0.1:5000/document", {
        document: text,
        questions: questions,
        regex: regex,
        ner:selectedNE
    });
}

function ner(document) {
    return axios.post("http://127.0.0.1:5000/ner", {
        document: document
    });
}

export { sanitise, ner }