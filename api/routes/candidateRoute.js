const Candidate = require('../models/candidate');
const db = require('../services/database');
const {createCandidate} = require('../controllers/candidateControllers');

module.exports = app => {

app.post('/api/add', async (req, res) => {


const { email, first_name, last_name, time_interval, linkedin, github, text } = req.body;

if (!email) {
    return res.status(400).json({ message: 'Error: Email should be entered' });
}

try {
    const candidate = new Candidate(email, first_name, last_name, time_interval, linkedin, github, text);
    await createCandidate(candidate.email, candidate.first_name, candidate.last_name, candidate.time_interval, candidate.linkedin, candidate.github, candidate.text);

    return res.status(201).json({ message: 'Candidate created or updated successfully' });
} catch (error) {
    console.error('Error adding or updating candidate', error);
    return res.status(500).json({ message: 'Error adding or updating candidate' });
}
   });

};