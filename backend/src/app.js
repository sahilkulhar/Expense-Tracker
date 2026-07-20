const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const expensesRouter = require('./routes/expenses');
app.use('/api/expenses', expensesRouter);

app.get('/api/health', (req, res) => {
  res.json({status: 'ok'});
});

module.exports = app;
