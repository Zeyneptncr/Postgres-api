const express = require('express');
const controller = require('./controllers/kisilerController');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API çalışıyor');
});

app.get('/kisiler', controller.listAll);
app.get('/kisiler/:id', controller.getById);
app.post('/kisiler', controller.createKisi);
app.put('/kisiler/:id', controller.updateKisi);
app.delete('/kisiler/:id', controller.deleteKisi);

app.listen(port, () => {
  console.log(`API şu adreste çalışıyor: http://localhost:${port}`);
});
