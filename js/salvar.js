var pontos = document.querySelector('#pontos')
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('pontos');
const dificuldade = urlParams.get('dificuldade');
pontos.textContent = `${myParam}`;


document.getElementById('confirmar').addEventListener('click', function() {
    let easy = new Array();
    let medium = new Array();
    let hard = new Array();

    //Verifica se existe
    if (localStorage.hasOwnProperty("easy")) {
        easy = JSON.parse(localStorage.getItem("easy"))
    }
    if (localStorage.hasOwnProperty("medium")) {
        medium = JSON.parse(localStorage.getItem("medium"))
    }
    if (localStorage.hasOwnProperty("hard")) {
        hard = JSON.parse(localStorage.getItem("hard"))
    }

    //Adiciona e salva no storage
    if(dificuldade == "easy"){
        easy.push([nomes.value, myParam]);
        localStorage.setItem("easy", JSON.stringify(easy));
    }else if(dificuldade == "medium"){
        medium.push([nomes.value, myParam]);
        localStorage.setItem("medium", JSON.stringify(medium));
    }else if(dificuldade == "hard"){
        hard.push([nomes.value, myParam]);
        localStorage.setItem("hard", JSON.stringify(hard));
    }
       
    //Redireciona
    window.location.href = "Ranking.html";
  
});