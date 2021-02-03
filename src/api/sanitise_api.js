const axios = require('axios');

function sanitise(text, questions, regex) {
    return axios.post("http://127.0.0.1:5000/document", {
        document: text,
        questions: questions,
        regex: regex
    });
}

export default sanitise