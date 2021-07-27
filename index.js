const express = require('express');
const app = express();

const connection  = require('./database/database')
const Pergunta = require('./database/Pergunta')

connection.authenticate()
.then(()=>{
    console.log("Conexão realizada")
})
.catch((e)=>{
    console.log('Erro: ' + e)
})

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req,res) =>{
    res.render('index')
});


app.get("/perguntar", (req,res)=>{
    res.render('perguntar');
})

app.post("/salvarpergunta", (req, res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/")
    }).catch(()=>{
        res.send(`Falha ao cadastrar pergunta!`)
    })

    
})
app.listen(8081, ()=>{console.log('App rodando!')})