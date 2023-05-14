(function(){
	const staringMinutes = 2;
	let time = Math.floor(staringMinutes * 60) + 3;
	const countdownEl = document.getElementById('countdown');
	const scoreEl = document.getElementById('score');
	const finalScreen = document.getElementById("modalGameoverHard");
	const finalScoreEl = document.getElementById('finalScore');
	const countdownStart = document.getElementById('contagem');
	const initialScreen = document.getElementById('modalInicioHard');
	const btnBonus = document.getElementById('btnBonus');

	setInterval(updateCountdown, 1000);
	
	function updateCountdown(){
		let minutes = Math.floor(time/60);
		let seconds = time % 60;

		
		if(seconds < 10){
			seconds = '0' + seconds;
		}
		if(minutes < 10){
			minutes = '0'+ minutes;
		}
		
		if(time > 120){
			countdownStart.innerHTML = time - 120;
		}else{
			countdownEl.innerHTML = minutes +":" +seconds;
			initialScreen.style.zIndex = -5;
		}
		
		scoreEl.innerHTML = pontuacao;
		if(time > 0){
			time--;		
		}else{
			finalScoreEl.innerHTML = pontuacao;
			finalScreen.style.zIndex = 10;
		}
	}

	const pontos = 40;

	var pontuacao = 0;

	var matches = 0;

	var images = [];

	var flippedCards = [];

	var paresNecessarios = 0;
	var qtdErros = 0;
	var cartaRuim = 9;

	//laço que adiciona o endereço da imagem e um ID para as cartas (0 e 1 para o modo fácil)

	for (var i = 0; i < 20; i++) {
		var img = {
				src: "img/"+ i % 10 +".png",
				id: i % 10
		};
		images.push(img);
	}

	startGame();

	
	const btn = document.getElementById("btnDesistirHard");
	btn.addEventListener("click",fim, false);


	function startGame(){
		matches = 0;
		flippedCards = [];
		images = randomSort(images);

		var frontFaces = document.getElementsByClassName("front");
		var backFaces = document.getElementsByClassName("back");

		for (var i = 0; i < 20; i++) {
			frontFaces[i]. classList.remove("flipped","match");
			backFaces[i]. classList.remove("flipped","match");

			var card = document.getElementById("card"+i);
			card.style.left = i % 5 === 0 ? 110 + "px" : i % 5 * 165 + 110 + "px";
			if(i<5){
				card.style.top = 180 + "px";
			}else if(i>4 && i<10){
				card.style.top = 425 + "px";
			}else if(i>9 && i<15){
				card.style.top = 670 + "px";
			}else if(i>14){
				card.style.top = 915 + "px";
			}

			card.addEventListener("click", flipCard, false);

			frontFaces[i].style.background = "url('"+ images[i].src +"')";
			frontFaces[i].setAttribute("id", images[i].id);

		}
		
		
	}


	function resetarGame(){
		startGame();
		qtdErros=0;
		matches=0;
	}

	//função que vira as cartas

	function flipCard(){
		if(matches !== 10){
		if(flippedCards.length < 2){
			var faces = this.getElementsByClassName("face");

			if(faces[0].classList.length > 2){
				return;
			}

			faces[0].classList.toggle("flipped");
			faces[1].classList.toggle("flipped");	

			flippedCards.push(this);	

			/*if(flippedCards[0].childNodes[3].id === '5'){
				console.log(`Entrei Aqui,vou resetar`);
				resetarGame();
			}*/

			if(flippedCards.length === 2){
				
				if(flippedCards[0].childNodes[3].id === '7' && flippedCards[1].childNodes[3].id === '7' && matches < 9){
					console.log("carta ruim");
					paresNecessarios--;
					time = time-30;
					/*btnBonus.style.zIndex = 10;*/
				}

				if(flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id){
					flippedCards[0].childNodes[1].classList.toggle("match");
					flippedCards[0].childNodes[3].classList.toggle("match");
					flippedCards[1].childNodes[1].classList.toggle("match");
					flippedCards[1].childNodes[3].classList.toggle("match");

					matches ++;
					pontuacao += pontos;

					flippedCards = [];
					console.log(`Acertos:`+matches);
					console.log(`Pontuação Atual:`+pontuacao);
					
				}
			}
		}else{
			flippedCards[0].childNodes[1].classList.toggle("flipped");
			flippedCards[0].childNodes[3].classList.toggle("flipped");
			flippedCards[1].childNodes[1].classList.toggle("flipped");
			flippedCards[1].childNodes[3].classList.toggle("flipped");
			flippedCards = [];
			qtdErros = qtdErros+1;
			console.log(`Erros:`+qtdErros);
		}
		}else{
			console.log(`Parabéns, Você Completou todas as combinações`);
			pontuacao+=100;
			startGame();	
			qtdErros=0;
		}
	}

	//função de ordenamento aleatório

	function randomSort(oldArray){

		var newArray = [];

		while(newArray.length !== oldArray.length){
			var i = Math.floor(Math.random()*oldArray.length);

			if(newArray.indexOf(oldArray[i]) < 0){
				newArray.push(oldArray[i]);
			}

		}
		return newArray;
	}
	
	function fim(){
		time = 0;
	}

}());

'use restrict';

let bancod = [
    //{'nome':'Naruto', 'pontos': '10'},
];


const getBancod = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const  setBancod = (bancod) => localStorage.setItem("todoList", JSON.stringify(bancod));

function Crianome(nome, pontos, dificuldade, indice){
    const item = document.createElement('label');    
    item.classList.add('todo__item');
    //<input type="checkbox" ${pontos} data-indice= ${indice}></input>
    item.innerHTML= `
        <div>${nome}</div>
        <div>${pontos}</div>
        <div>${dificuldade}</div>
    `
    document.getElementById('todoList').appendChild(item);
}

function limparUsuarios(){
    const todoList= document.getElementById('todoList');
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}

function atualizarTela() {
    limparUsuarios();
    const bancod = getBancod();
    bancod.forEach( (item, indice) => Crianome (item.nome, item.pontos, item.dificuldade, indice));
}

const inserirItem = (evento) =>{
    const tecla = evento.key;
    if(tecla === 'Enter'){
        const bancod = getBancod();
        bancod.push ({'nome': evento.target.value, 'pontos': ''})
        setBancod(bancod);
        atualizarTela();
        evento.target.value='';
    }
}


function clickItem (evento){
    const elemento = evento.target;
    if(elemento.type === 'button'){
        const indice = elemento.dataset.indice;
        removerItem(indice);
    }else if (elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
    }
}

function removerItem (indice){
    const bancod = getBancod();
    bancod.splice (indice, 1 );
    setBancod(bancod);
    atualizarTela();
}

/*function atualizarItem (indice){
   const bancod = getBancod();
    bancod[indice].pontos = bancod[indice].pontos === '' ? 'checked' : '';
    setBancod(bancod);
    atualizarTela();
}*/
document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();
