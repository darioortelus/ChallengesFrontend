document.addEventListener('DOMContentLoaded', () => {

    //Obtener tablero
    const board = document.getElementById('game-board');
    const newGameButton = document.getElementById('new-game');
    const timerElement = document.getElementById('timer');
    const clicksElement = document.getElementById('clicks');
    const pauseResumeButton = document.getElementById('pause-resume');

    const emojis = ['🥰', '😋', '🤗', '🤐', '😌', '😷', '🤠', '😤'];
    let cards = [];
    let cardsRevelados = [];
    let aciertosCard = 0;
    let clicks = 0;
    let timer;
    let seconds = 0;
    let gamePaused = false;
  
    //Las cartas se barajan.
    const randomArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };
  
    //Inicar el juego
    const startGame = () => {
      //Limpiar el contador de tiempo
      clearInterval(timer);
      cards = emojis.concat(emojis);
      randomArray(cards);
      aciertosCard = 0;
      cardsRevelados = [];
      clicks = 0;
      seconds = 0;
  
      renderBoard();
      startTimer();
      updateClicks();
  
      // Mostrar emojis
      setTimeout(() => {
        revealCards();
      }, 1000);
  
      // Ocultar emojis después de 3 segundos
      setTimeout(() => {
        hideCards();
      }, 4000);
    };
  
    const renderBoard = () => {
      board.innerHTML = '';
  
      cards.forEach((emoji, index) => {
        const card = createCard(index, emoji);
        board.appendChild(card);
      });
    };
  
    //Crear card con los emojis
    const createCard = (index, emoji) => {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card');
        cardContainer.dataset.index = index;
    
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
    
        const frontFace = document.createElement('div');
        frontFace.classList.add('face', 'front', 'face-down');
        frontFace.innerHTML = '<div class="card-inner">' + emoji + '</div>';
    
        const backFace = document.createElement('div');
        backFace.classList.add('face', 'back');
        backFace.innerHTML = '<div class="card-inner"></div>';
    
        cardInner.appendChild(frontFace);
        cardInner.appendChild(backFace);
        cardContainer.appendChild(cardInner);
    
        cardContainer.addEventListener('click', cardClick);
        return cardContainer;
      };
  
      //Detectar click sobre los card
      const cardClick = (event) => {
        const clickedCard = event.currentTarget;
      
        // Verifica si el card ya ha sido volteada o si ya hay dos cartas volteadas
        if (!clickedCard.classList.contains('face-down') || cardsRevelados.length === 2) {
          return;
        }
      
        clickedCard.classList.remove('face-down');
        clickedCard.querySelector('.card-inner').style.transform = 'rotateY(0deg)'; // Girar hacia adelante
        
        // Almacena la carta clicada en el array de cartas volteadas
        cardsRevelados.push(clickedCard);
      
        if (cardsRevelados.length === 2) {
          clicks++;
          updateClicks();
          setTimeout(checkSuccess, 1000);
        }
      };

      //Permite pausar el tiempo del juego
      pauseResumeButton.addEventListener('click', () => {
        gamePaused = !gamePaused;
    
        if (gamePaused) {
          clearInterval(timer);
          pauseResumeButton.textContent = 'Resume';
        } else {
          startTimer();
          pauseResumeButton.textContent = 'Strop';
        }
      });
  
      //Comprueba si los card son iguales
      const checkSuccess = () => {
        const [card1, card2] = cardsRevelados;
        const index1 = card1.dataset.index;
        const index2 = card2.dataset.index;
    
        if (cards[index1] === cards[index2]) {
          // Los cards son iguales
          aciertosCard++;
          if (aciertosCard === cards.length / 2) {
            clearInterval(timer);
            setTimeout(() => {
              alert(`¡Felicidades, has ganado!\nTiempo: ${seconds} segundos\nClicks: ${clicks}`);
              startGame();
            }, 500);
          }
        } else {
        // Los cards no son iguales
          setTimeout(() => {
            // Voltea los card nuevamente
            card1.classList.add('face-down');
            card2.classList.add('face-down');
            card1.querySelector('.card-inner').style.transform = 'rotateY(180deg)';
            card2.querySelector('.card-inner').style.transform = 'rotateY(180deg)';
          }, 500);
        }
    
        cardsRevelados = [];
      };
  
    const startTimer = () => {
      timer = setInterval(() => {
        seconds++;
        timerElement.textContent = seconds;
      }, 1000);
    };
  
    const updateClicks = () => {
      clicksElement.textContent = clicks;
    };
  
    const revealCards = () => {
      // Mostrar todas las cartas después de 1 segundo
      const allCards = document.querySelectorAll('.card');
      allCards.forEach(card => card.classList.remove('face-down'));
    };
  
    const hideCards = () => {
      // Ocultar todas las cartas después de 3 segundos
      const allCards = document.querySelectorAll('.card');
      allCards.forEach(card => card.classList.add('face-down'));
    };
  
    startGame();
  
    newGameButton.addEventListener('click', startGame);
  });
  