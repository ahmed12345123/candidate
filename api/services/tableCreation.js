async function createCandidateTable(connection) {
    const [rows, fields] = await connection.execute("SHOW TABLES LIKE 'candidate' ");
    if (rows.length === 0) {
      await connection.execute(`
        CREATE TABLE candidate (
          email VARCHAR(255) PRIMARY KEY,
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255) NOT NULL,
          time_interval VARCHAR(255) DEFAULT '1 hour',
          linkedin VARCHAR(255) DEFAULT NULL,
          github VARCHAR(255) NOT NULL,
          text TEXT,
          phone_number VARCHAR(255) DEFAULT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
    }
  }
  
  module.exports = { createCandidateTable };


// async function createCandidateTable(connection) {
//   try {
//     const [rows, fields] = await connection.execute(
//       "SHOW TABLES LIKE 'candidate'"
//     );
//     if (rows.length === 0) {
//       await connection.execute(`
//         CREATE TABLE candidate (
//           email VARCHAR(255) PRIMARY KEY,
//           first_name VARCHAR(255) NOT NULL,
//           last_name VARCHAR(255) NOT NULL,
//           time_interval VARCHAR(255) DEFAULT '1 hour',
//           linkedin VARCHAR(255) DEFAULT NULL,
//           github VARCHAR(255) DEFAULT NULL,
//           text TEXT,
//           phone_number VARCHAR(255) DEFAULT NULL,
//           created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//         )
//       `);
//       console.log('Candidate table created successfully.');
//     } else {
//       console.log('Candidate table already exists.');
//     }
//   } catch (error) {
//     console.error('Error creating candidate table:', error.message);
//   }
// }

// module.exports = { createCandidateTable };
