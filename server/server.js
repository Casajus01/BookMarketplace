require('dotenv').config();
const express = require('express');
const mysql   = require('mysql2');
const cors    = require('cors');

const app  = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log('CONNECTED TO DB');
});

const authRoutes = require('./routes/auth')(db);
app.use('/auth', authRoutes);
const listingRoutes = require('./routes/listings')(db);
app.use('/listings', listingRoutes);
const bookRoutes = require('./routes/books')(db);
app.use('/books', bookRoutes);
const wishlistRoutes = require('./routes/wishlist')(db);
app.use('/wishlist', wishlistRoutes);
const reviewRoutes = require('./routes/reviews')(db);
app.use('/reviews', reviewRoutes);




app.get('/', (_, res) => res.send('ready'));
app.listen(PORT, () => console.log(`listening`));
