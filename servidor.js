const express = require("express");
const app = express();
const path = require("path")
app.use(express.json())

const eu = {
  nome: "Enzo de Oliveira Azevedo",
  curso: "Fullstack",
  cursotec: "Redes de Computadores",
  cursosup: "ADS",
  contato: "(85) 98542-6804",
};
let produtos = [
    {
        id: 1,
        nome: "Mouse",
        preco: 120,
        desc: "Mouse caro dms"
    },
    {
        id: 2,
        nome: "Teclado",
        preco: 20,
        desc: "Presta não"
    },
    {
        id: 3,
        nome: "Fone de ouvido",
        preco: 100,
        desc: "TWS Headphone frush frush"
    },
    {
        id: 4,
        nome: "Mousepad",
        preco: 12,
        desc: "Bem finin"
    },
    {
        id: 5,
        nome: "Tela Arzopa",
        preco: 600,
        desc: "Full HD"
    },
]

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
    res.json(produtos)
})
// res.json(produtos[req.params.id-1][req.query.e])
app.get("/produtos/:id", (req, res) => {
    if (req.query.e)(res.json(produtos[req.params.id-1][req.query.e]))
        else res.json(produtos[req.params.id-1])
})

app.post("/produtos",(req,res)=>{
    res.send("Funciona!")
})

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
        produtos.push({
        id: produtos.length+1,
        nome: req.body.nome,
        preco: req.body.preco,
        desc: req.body.desc
    })
    res.status(201).send(req.body)
} else {
    res.status(400).send("Digite todas os campos")
}})

app.delete("/produtos/:id", (req, res) => {
    existe = produtos.filter((produto) => produto.id == req.params.id)
    if (existe.length > 0) {
        let listanova = produtos.filter((produto) => produto.id != req.params.id)
        produtos = listanova
    } else {
        res.status(404).send("Não achei!") 
    }
    res.send("Apaguei!") 
})

app.patch("/produtos/:id", (req,res) => {
    let encontrado = produtos.find((produto)=> produto.id == req.params.id)
    if(encontrado){
           encontrado.nome = req.query.nome
           encontrado.preco = Number(req.query.preco)
           encontrado.desc = req.query.desc
           res.json(encontrado)
    } else {
        res.status(400).send("Não encontrei")
    }
})

app.listen(3000, () => {
  console.log("Servidor iniciado em http://localhost:3000");
});
