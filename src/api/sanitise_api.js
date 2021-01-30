const axios = require('axios');

function sanitise(text, questions) {
    return axios.post("http://127.0.0.1:5000/document", {
        document: text,
        questions: questions
    });
}

export default sanitise