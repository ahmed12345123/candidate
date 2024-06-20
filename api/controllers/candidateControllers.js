 const db = require('../services/database');

//data access layer

 async function alreadyExist(email) {
    try {
      const  [rows, fields] = await db.execute(
        'SELECT * FROM candidates WHERE email = ?',
        [email]
      );
        // console.log(result);
        return rows.length > 0;
     return true;
    } catch (error) {
      console.error('Error alreadyExist', error);
    // return false;
    }
  };




 async function createCandidate(email, first_name, last_name, time_interval, linkedin, github, text) {
   try {
     const result = await db.execute(
       'INSERT INTO candidates (email, first_name, last_name, time_interval, linkedin, github, text) VALUES (?, ?, ?, ?, ?, ?, ?)',
       [email, first_name, last_name, time_interval, linkedin, github, text]
     );
     console.log(result);
   } catch (error) {
     console.error('Error creating candidate', error);
   }
 }
 
 module.exports = {alreadyExist,createCandidate};






 // async function alreadyExist(email) {
//     try {
//         const [rows, fields] = await db.execute(
//             'SELECT * FROM candidates WHERE email = ?',
//             [email]
//         );
//         return rows.length > 0; // Return true if email exists
//     } catch (error) {
//         console.error('Error in alreadyExist function', error);
//         throw error; // Propagate the error to handle it elsewhere if needed
//     }
// }