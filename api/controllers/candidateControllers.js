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

async function createCandidate(email, first_name, last_name, time_interval, linkedin, github, text, phone_number) {
    try {
        const exists = await alreadyExist(email);

        if (exists) {
            // Update the existing candidate record
            const result = await db.execute(
                'UPDATE candidates SET first_name = ?, last_name = ?, time_interval = ?, linkedin = ?, github = ?, text = ?, phone_number = ? WHERE email = ?',
                [first_name, last_name, time_interval, linkedin, github, text, phone_number , email]
            );
            console.log('Candidate updated', result);
        } else {
            // Insert a new candidate record
            const result = await db.execute(
                'INSERT INTO candidates (email, first_name, last_name, time_interval, linkedin, github, text, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [email, first_name, last_name, , time_interval, linkedin, github, text, phone_number]
            );
           console.log('Candidate created', result);
        }

        return true; // Return success if no errors
    } catch (error) {
          console.error('Error creating or updating candidate', error);
        throw error;
    }
}

module.exports = {alreadyExist,createCandidate};




