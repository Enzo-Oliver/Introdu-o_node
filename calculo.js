function calcularmedia(listaDeNotas) {
    let mediaCalculada = (listaDeNotas[0] + listaDeNotas[1] + listaDeNotas[2] + listaDeNotas[3] + listaDeNotas[4]) / 5;
    return mediaCalculada; 
}
function aprovacao(media){
    if (media >= 7){
        console.log("Aprovado");
    } 
    else if (media <= 6){
        console.log("Reprovado");
    }
    else{
        console.log("Recuperação")
    }
}
const enzo ={
    nome: "Enzo Oliveira",
    idade: 23,
    esporte: "academia",
    altura: 999,
    profissao: "ads"
}
module.exports = {
    aprovacao, calcularmedia, enzo
}