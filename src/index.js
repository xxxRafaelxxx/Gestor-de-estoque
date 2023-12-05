const express = require('express');
const cors = require('cors');
const app = express();
const rotas = require('./rotas');
const porta = 3000;
app.use(express.json());
app.use(cors());

app.use(rotas);

app.listen(porta, () => {
    console.log(`Servidor: http://localhost:${porta}`);
});