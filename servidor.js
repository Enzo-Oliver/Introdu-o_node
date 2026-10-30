const express = require("express");
const app = express();
const path = require("path")
const fs = require("fs");
const db = require('./database')
app.use(express.json())

const eu = {
  nome: "Enzo de Oliveira Azevedo",
  curso: "Fullstack",
  cursotec: "Redes de Computadores",
  cursosup: "ADS",
  contato: "(85) 98542-6804",
};

let produtos = []
//ALL, GET(X), RUN

const listarProdutos = db.prepare(`
    SELECT * FROM produtos
`)
const listarUmProduto = db.prepare(`
    SELECT * FROM produtos
    WHERE id = ?
`)
const criarProduto = db.prepare(`
    INSERT INTO produtos(nome, preco, desc)
    VALUES(?, ?, ?)
    `)

function salvar(){
    const dadosjson = JSON.stringify(produtos, null, 2)
    fs.writeFile("usuario.json",dadosjson,'utf8',(err) => {
        if (err){
            console.error('Error writing to file', err);
        } else {
            console.log("Arquivo salvo!")
        }
    })
}
function ler(){
    // fs.readFileSync("Usuario.json", (erro, dados) => {
    //     if(erro) throw erro;
    //     produtos = JSON.parse(dados)
    //     console.log("Arquivo lido com sucesso");
    // })
    let dados = fs.readFileSync("Usuario.json")
    produtos = JSON.parse(dados)
    }

app.get("/", (req, res) => {
  res.send(`
    <div style='background-color: Black;padding:2px;text-align: center'>
    <div style='border: 2px solid red;'>
        <h1 style='color: White'>${eu.nome}</h1>
            <p style='color: White'>Curso${eu.curso}</p>
            <p style='color: White'>Técnico${eu.cursotec}</p>
            <p style='color: White'>Faculdade${eu.cursosup}</p>
            <p style='color: White'>contato${eu.contato}</p>
        </div>
    </div>
    <div>
        <h1>Objetivo</h1>
          <p>Busco uma oportunidade na área de TI, com ênfase em suporte e manutenção de Redes de Computadores, e através disso, crescer pessoal e profissionalmente contribuindo para o crescimento da empresa.</p>
        <h1>Experiência</h1>
        <p>
            2023 - Pericia Forense do Estado do Ceará – PEFOCE
            <hr></hr>
            Estagiário profissional de redes de computadores<br></br>
            • Formatação e limpeza de desktops e notebooks;<br></br>
            • Instalação de Sistemas Operacionais Windows e Linux;<br></br>
            • Estruturação de cabeamentos de rede;<br></br>
            • Instalação e manutenção em sistemas de câmeras.<br></br>
        </p>
    </div>
        `);
});

app.get("/sobre", (req, res) => {
    let caminho = path.join(__dirname, "curriculo.html")
    res.sendFile(caminho)
})

app.get("/usuario", (req, res) => {
    res.json(eu)
})

app.get("/produtos", (req, res) => {
    ler()
    const produtosdobanco = listarProdutos.all()
    res.json(produtosdobanco)
})
// res.json(produtos[req.params.id-1][req.query.e])
// app.get("/produtos/:id", (req, res) => {
//     ler()
//     if (req.query.e)(res.json(produtos[req.params.id-1][req.query.e]))
//         else res.json(produtos[req.params.id-1])
// })

app.get("/produtos/:id", (req, res) => {
    ler()
    encontrado = listarUmProduto.get(req.params.id)
    if (encontrado)(res.json(encontrado))
        else res.send("Não encontrado")
})

// app.post("/produtos",(req,res)=>{
//     res.send("Funciona!")
// })

// app.post("/produtos", (req, res) => {
//     const novoProduto = req.body;

//     produtos.push(novoProduto);

//     res.json({
//         mensagem: "Produto cadastrado com sucesso!",
//         produto: novoProduto
//     });
// });

app.post("/produtos", (req, res) => {
    // produtos.push(req.body)
    if(req.body.nome && req.body.preco && req.body.desc){
    //     produtos.push({
    //     id: produtos.length+1,
    //     nome: req.body.nome,
    //     preco: req.body.preco,
    //     desc: req.body.desc
    // })
    const produtocriado = criarProduto.run(req.body.nome, req.body.preco,req.body.desc)
    salvar()
    res.status(201).send(req.body)
} else {
    res.status(400).send("Digite todas os campos")
}})

app.delete("/produtos/:id", (req, res) => {
    existe = produtos.filter((produto) => produto.id == req.params.id)
    if (existe.length > 0) {
        let listanova = produtos.filter((produto) => produto.id != req.params.id)
        produtos = listanova
        salvar()
    } else {
        res.status(404).send("Não achei!")
    }
    res.send("Apaguei!") 
})

app.patch("/produtos/:id", (req,res) => {
    let encontrado = produtos.find((produto)=> produto.id == req.params.id)
    
    if(encontrado){
        let novoproduto ={}
        if(req.query.nome) novoproduto.nome = req.query.nome
        if(req.query.preco) novoproduto.preco = Number(req.query.preco)
        if(req.query.desc) novoproduto.desc = req.query.desc
        Object.assign(encontrado, novoproduto)
        salvar()
        res.json(encontrado)
    } else {
        res.status(400).send("Não encontrei")
    }
})

app.listen(3000, () => {
  console.log("Servidor iniciado em http://localhost:3000");
});

// atividade: salvar a lista de produtos num arquivos chamado produtos.json e ler a lista sempre que fizer um get e atribuir á variavel produtos.