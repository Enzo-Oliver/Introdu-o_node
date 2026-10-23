// function somar(a, b) {
//     return a + b;
// }
// console.log(somar(2, 5));
// console.log(process.argv[2]);
// console.log(somar(Number(process.argv[2]),(Number(process.argv[3]))));

let calcularmedia = require("./calculo")

let notas = [
    Number(process.argv[2]),
    Number(process.argv[3]),
    Number(process.argv[4]),
    Number(process.argv[5]),
    Number(process.argv[6]),
]
let resultado = calcularmedia.calcularmedia(notas);
// console.log(`Média final: ${resultado}`);
// calcularmedia.aprovacao(resultado);

console.log(calcularmedia.enzo.nome)