const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const db = require('./db/connection');

app.listen(port, function() {
    console.log(`Rodando no porta: ${port}`);
})

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));

// Handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// Static folder
app.use(express.static(path.join(__dirname, 'public')));


// DB connection
db
    .authenticate()
    .then(() => {
        console.log("Conectado ao banco de dados.");
    })
    .catch( err => {
        console.log("Ocorreu um erro ao conectar o banco de dados.");
    });

// Routes
app.get('/', (req, res) => {

    // Busca
    let search = req.query.job;
    let query = '%' + search + '%';
    if(!search){
        // Exibe as vagas
        Job.findAll({order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs =>{
            res.render('index', {
                jobs
            });
        })
        .catch(err => console.log(err));
    } else{
        // Busca de vagas
        Job.findAll({
            where: {title: {[Op.like]: query}},
            order: [
                ['createdAt', 'DESC']
        ]})
        .then(jobs => {
         res.render('index', {
             jobs, search
            })
        })
        .catch(err => console.log(err));
    }})

// Jobs routes
app.use('/jobs', require('./routes/jobs'));