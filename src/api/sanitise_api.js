const axios = require('axios');

function sanitise(text, questions) {
    return axios.post(process.env.NODE_ENV + '/document', {
        document: text,
        questions: questions
    });
}

export default sanitise