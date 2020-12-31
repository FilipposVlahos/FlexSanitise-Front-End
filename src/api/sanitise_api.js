const axios = require('axios');

function sanitise(text, questions) {
    return axios.post('/document', {
        document: text,
        questions: questions
    });
}

export default sanitise