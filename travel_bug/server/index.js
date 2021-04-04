const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlendcoded({extended: true}));

app.use(morgan('dev'));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});

module.exports = app;
