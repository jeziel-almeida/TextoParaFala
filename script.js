//seleção dos elementos
const selecaoVoz = document.querySelector("#selecao-voz");
const botaoOuvir = document.querySelector("#ouvir-btn");
const botaoBaixarTexto = document.querySelector("#baixar-texto-btn");
const entradaDeTexto = document.querySelector("#entrada-de-texto");
const botaoEnviarArquivo = document.querySelector("#upload-arquivo");

//iniciar a API de vozes
const fala = new SpeechSynthesisUtterance();

let vozesDisponiveis = [];

//preencher o select
const atualizarValores = () => {
    vozesDisponiveis = window.speechSynthesis.getVoices();

    fala.voice = vozesDisponiveis[0];

    vozesDisponiveis.forEach((voz, idx) => {
        const opcao = document.createElement("option");
        opcao.value = idx;
        opcao.textContent = voz.name
        selecaoVoz.appendChild(opcao)
    });

}

window.speechSynthesis.onvoiceschanged = atualizarValores;

//Executar o texto como voz
selecaoVoz.addEventListener("change", () => {
    fala.voice = vozesDisponiveis[selecaoVoz.value];
})

botaoOuvir.addEventListener("click", () => {
    fala.text = entradaDeTexto.value;
    window.speechSynthesis.speak(fala)
})

//baixar texto em arquivo
botaoBaixarTexto.addEventListener("click", () => {
    const text = entradaDeTexto.value;

    const blob = new Blob([text], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "texto.txt";

    a.click();

    URL.revokeObjectURL(url);
})

//Enviando o arquivo para ser lido
botaoEnviarArquivo.addEventListener("change", (event) => {

    const arquivo = event.target.files[0];

    if(arquivo) {
        const leitor = new FileReader();

        leitor.onload = (e) => {
            entradaDeTexto.value = e.target.result;
        };

        leitor.readAsText(arquivo)
    }
})