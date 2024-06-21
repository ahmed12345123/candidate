const Candidate = require('../models/candidate');
const db = require('../services/database');
const {createCandidate} = require('../controllers/candidateControllers');


module.exports = app => {

app.post('/api/add', async (req, res) => {


const { email, first_name, last_name, time_interval, linkedin, github, text, phone_number} = req.body;

if (!email || !first_name || !last_name || !github) {
    return res.status(400).json({ message: 'Error: missing mandatory feild' });
}

try {
    const candidate = new Candidate(email, first_name, last_name, time_interval, linkedin, github, text, phone_number);
    await createCandidate(candidate.email, candidate.first_name, candidate.last_name,  candidate.time_interval, candidate.linkedin, candidate.github, candidate.text, candidate.phone_number);

   return res.status(201).json({ message: 'Candidate created or updated successfully'});

} catch (error) {
    console.error('Error adding or updating candidate', error);
    return res.status(500).json({ message: 'Error adding or updating candidate' });
}
   });

};