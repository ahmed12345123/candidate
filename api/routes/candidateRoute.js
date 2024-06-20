const candidate = require('../models/candidate');
const db = require('../services/database');
const {createCandidate, alreadyExist} = require('../controllers/candidateControllers');

module.exports = app => {
//     app.post('/api/add' , async (req,res) => {
//         const {email, first_name, last_name, time_interval, linkedin , github, text} = req.body;
//         const exist = alreadyExist(email);
//         if(!exist){
//          try{
//            const candidate = new Candidate(email, first_name, last_name, time_interval, linkedin, github, text);
//            await candidate.createCandidate();
//            res.status(201);
//           }catch(error){
//             console.error(error);
//             res.status(500).json({message:'error creating candidate'});
//          }
//          }else{
//             res.status(500).json({message:'error email already exist'});
//          }
// })
app.post('/api/add', async (req, res) => {
    const { email, first_name, last_name, time_interval, linkedin, github, text } = req.body;

    try {
        const exists = await alreadyExist(email);

        if (exists) {
            return res.status(400).json({ message: 'Error: Email already exists' });
        }
        const candidate = new Candidate(email, first_name, last_name, time_interval, linkedin, github, text);
           await candidate.createCandidate();
        // await createCandidate(email, first_name, last_name, time_interval, linkedin, github, text);
        return res.status(201).json({ message: 'Candidate created successfully' });
    } catch (error) {
        console.error('Error adding candidate', error);
        return res.status(500).json({ message: 'Error adding candidate' });
    }
});

};