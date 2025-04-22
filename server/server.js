const express = require('express');
const mysql   = require('mysql2');
const cors    = require('cors');

const app  = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host    : 'localhost',
  user    : 'root',
  password: '471pass',
  database: 'book_marketplace'
});

db.connect((err) => {
  if (err) throw err;
  console.log('CONNECTED TO DB');
});

const authRoutes = require('./routes/auth')(db);
app.use('/auth', authRoutes);

app.get('/', (_, res) => res.send('ready'));
app.listen(PORT, () => console.log(`listening`));
