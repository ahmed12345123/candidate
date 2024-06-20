const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());
const db = require('./services/database');

app.get('/', (req, res) => {
   res.send('hello')
});

require('./controllers/candidateControllers');
require('./routes/candidateRoute')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listining on ${port}`));