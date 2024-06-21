//data access layer

const db = require('../services/database');

async function alreadyExist(email) {
    try {
        const [rows, fields] = await db.execute(
            'SELECT * FROM candidates WHERE email = ?',
            [email]
        );
        return rows.length > 0;
    } catch (error) {
        console.error('Error in alreadyExist', error);
        throw error;
    }
}

async function createCandidate(email, first_name, last_name, time_interval, linkedin, github, text) {
    try {
        const exists = await alreadyExist(email);

        if (exists) {
            // Update the existing candidate record
            const result = await db.execute(
                'UPDATE candidates SET first_name = ?, last_name = ?, time_interval = ?, linkedin = ?, github = ?, text = ? WHERE email = ?',
                [first_name, last_name, time_interval, linkedin, github, text, email]
            );
            console.log('Candidate updated', result);
        } else {
            // Insert a new candidate record
            const result = await db.execute(
                'INSERT INTO candidates (email, first_name, last_name, time_interval, linkedin, github, text) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [email, first_name, last_name, time_interval, linkedin, github, text]
            );
            console.log('Candidate created', result);
        }

        return true; // Return success if no errors occurred
    } catch (error) {
        console.error('Error creating or updating candidate', error);
        throw error;
    }
}

module.exports = {createCandidate};




