const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
   res.send('hello')
});

require('./routes/candidateRoute')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listining on ${port}`));