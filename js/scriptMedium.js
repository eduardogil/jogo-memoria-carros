(function(){
	const staringMinutes = 2;
	let time = Math.floor(staringMinutes * 60) + 3;
	const countdownEl = document.getElementById('countdown');
	const scoreEl = document.getElementById('score');
	const finalScreen = document.getElementById("modalGameover");
	const finalScoreEl = document.getElementById('finalScore');
	const countdownStart = document.getElementById('contagem');
	const initialScreen = document.getElementById('modalInicio');
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

	const pontos = 30;

	var pontuacao = 0;

	var matches = 0;

	var images = [];

	var flippedCards = [];

	var paresNecessarios = 0;
	//laço que adiciona o endereço da imagem e um ID para as cartas (0 e 1 para o modo fácil)

	for (var i = 0; i < 16; i++) {
		var img = {
				src: "img/"+ i % 8 +".png",
				id: i % 8
		};
		images.push(img);
	}

	startGame();

	const btn = document.getElementById("btnDesistir");
	btn.addEventListener("click",fim, false);


	function startGame(){
		matches = 0;
		flippedCards = [];
		images = randomSort(images);
		paresNecessarios = 8;

		btnBonus.style.zIndex = -2;

		var frontFaces = document.getElementsByClassName("front");
		var backFaces = document.getElementsByClassName("back");

		//laço para posicionar as cartas (i < 4 no modo fácil)

		for (var i = 0; i < 16; i++) {
			frontFaces[i]. classList.remove("flipped","match");
			backFaces[i]. classList.remove("flipped","match");

			var card = document.getElementById("card"+i);
			if(i % 2 === 1){
				card.style.left = (85 * i) + "px";
			}else if(i % 2 === 0){
				card.style.left = (85 * i) + 85 + "px";
			}else{
				card.style.left = 20 + "px";
			}
			if(i % 2 === 0){
				card.style.top = (250+200) + "px";
			}else{
				card.style.top = 200 + "px";
			}

			card.addEventListener("click", flipCard, false);

			frontFaces[i].style.background = "url('"+ images[i].src +"')";
			frontFaces[i].setAttribute("id", images[i].id);
		}	
	}

	//função que vira as cartas

	function flipCard(){
		if(matches !== paresNecessarios){
		if(flippedCards.length < 2){
			var faces = this.getElementsByClassName("face");

			if(faces[0].classList.length > 2){
				return;
			}

			faces[0].classList.toggle("flipped");
			faces[1].classList.toggle("flipped");	

			flippedCards.push(this);	

			if(flippedCards.length === 2){
				if(flippedCards[0].childNodes[3].id === '3' && flippedCards[1].childNodes[3].id === '3' && matches < 8){
					console.log("carta boa");
					paresNecessarios--;
					btnBonus.style.zIndex = 10;
				}

				if(flippedCards[0].childNodes[3].id === '7' && flippedCards[1].childNodes[3].id === '7' && matches < 8){
					console.log("carta ruim");
					paresNecessarios--;
					time = time - 30;
				}

				if(flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id){
					flippedCards[0].childNodes[1].classList.toggle("match");
					flippedCards[0].childNodes[3].classList.toggle("match");
					flippedCards[1].childNodes[1].classList.toggle("match");
					flippedCards[1].childNodes[3].classList.toggle("match");

					matches ++;
					pontuacao += pontos;

					flippedCards = [];
				}
			}
		}else{
			flippedCards[0].childNodes[1].classList.toggle("flipped");
			flippedCards[0].childNodes[3].classList.toggle("flipped");
			flippedCards[1].childNodes[1].classList.toggle("flipped");
			flippedCards[1].childNodes[3].classList.toggle("flipped");
			flippedCards = [];
		}
		}else{
			pontuacao+=100;
				startGame();
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