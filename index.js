require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./controllers/productsController/router');
const salesRouter = require('./controllers/salesController/router');
const error = require('./middlewares/error');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});
// não remova esse endpoint, e para o avaliador funcionar
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', productsRouter);
app.use('/', salesRouter);

app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
