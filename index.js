const express = require('express');
const kisilerRouter = require('./controllers/kisilerController');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/kisiler', kisilerRouter);

app.get('/', (req, res) => {
  res.send('API çalışıyor 🚀');
});

app.listen(port, () => {
  console.log(`API şu adreste çalışıyor: http://localhost:${port}`);
});
