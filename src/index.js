const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();
mongoose.connect('mongodb+srv://matcarmac:Matheus0109@cluster0.0fmgm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(3333);

//Tiipos de parametros
//query -> request.query (filtro, ordenação, páginação)
//Route -> request.params (identificarr recurso na edição ou deletar)
//body -> request.body (dados para criação ou alteração)


