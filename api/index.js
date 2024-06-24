const express = require('express');
const app = express();
const cors = require('cors');
const createPool = require('./services/database');
const tableCreation = require('./services/tableCreation');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
   res.send('hello')
});

async function initialize() {
   try {
     await tableCreation.createCandidateTable(createPool); // Assuming connection pool is available
     console.log('Database connection and table initialized');
   } catch (error) {
     console.error('Error during database initialization', error);
     process.exit(1); // Exit the application on error
   }
 };
 
 initialize();
 

require('./routes/candidateRoute')(app);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listining on ${port}`));