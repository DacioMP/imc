const peso = document.querySelector('#input-peso');
const altura = document.querySelector('#input-altura');
const formulario = document.querySelector('form');
const elementoResultado = document.querySelector('#resultado');

const calculaIMC = (pesoEmKg, alturaEmMetros) => {
    return pesoEmKg / (alturaEmMetros ** 2);
}

const geraResultadoNaTela = (resultadoIMC, situacao) => {
    if (elementoResultado.classList.contains("erro-valor")) {
        elementoResultado.classList.remove("erro-valor");
    }
    elementoResultado.innerHTML = `
        <p>Seu IMC é ${resultadoIMC} (${situacao})</p>
    `
}

const mostraErroDeValorNegativoOUInvalido = () => {
    elementoResultado.classList.add("erro-valor");
    elementoResultado.innerHTML = ` 
        <p>
            Valores menores que zero ou com vírgula e 
            outros caracteres diferente de ponto não são permitidos.
        </p>
    `
}

const mostraErroDeCampoVazio = () => {
    elementoResultado.classList.add("erro-valor");
    elementoResultado.innerHTML = `
        <p>Nenhum campo pode estar vazio.</p>
    `
}

const verificaSituacao = (imc) => {
    if (imc < 18.5) {
        return'Abaixo do peso';
    } else if (imc >= 18.5 && imc <= 24.9) {
        return'Peso normal';
    } else if (imc >= 25 && imc <= 29.9) {
        return'Sobrepeso';
    } else if (imc >= 30 && imc <= 34.9) {
        return'Obesidade grau 1';
    } else if (imc >= 35 && imc <= 39.9) {
        return'Obesidade grau 2';
    } else if (imc >= 40) {
        return'Obesidade grau 3';
    } else {
        return'IMC fora do intervalo válido. Verifique os dados inseridos.';
    }
}

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let valorPeso = Number(peso.value);
    let valorAltura = Number(altura.value);
    let imc = 0;

    if (peso.value !== "" || altura.value !== "") {
        if (valorPeso > 0 && valorAltura > 0) {
            imc = calculaIMC(valorPeso, valorAltura).toFixed(2);
            let situacao = verificaSituacao(imc);

            geraResultadoNaTela(imc, situacao);

            peso.value = '';
            altura.value = '';
            
        } else {
            mostraErroDeValorNegativoOUInvalido();
        }
    } else {
        mostraErroDeCampoVazio();
    }
})