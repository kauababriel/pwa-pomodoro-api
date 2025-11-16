if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service worker registrado:', reg))
      .catch(err => console.log('Erro ao registrar service worker:', err));
  });
}

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const quoteArea = document.getElementById('quote-area');
const quoteContent = document.getElementById('quote-content');
const quoteAuthor = document.getElementById('quote-author');

let timeLeft = 25 * 60; 
let timerInterval = null;
let isRunning = false;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
}

function startTimer() {
    if (isRunning) { 
        clearInterval(timerInterval);
        startBtn.textContent = 'Continuar';
        isRunning = false;
    } else { 
        isRunning = true;
        startBtn.textContent = 'Pausar';
        quoteArea.classList.add('hidden'); 
        
        timerInterval = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert('Pomodoro completo! Hora da pausa.');
                fetchAndShowQuote(); 
                resetTimer();
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 25 * 60;
    isRunning = false;
    startBtn.textContent = 'Iniciar';
    updateDisplay();
}


async function fetchAndShowQuote() {
    try {
        
        const response = await fetch('http://localhost:3001/api/get-quote');
        const data = await response.json();
        
        quoteContent.textContent = `"${data.content}"`;
        quoteAuthor.textContent = `— ${data.author}`;
        quoteArea.classList.remove('hidden');

    } catch (error) {
        console.error('Erro ao buscar citação:', error);
        quoteContent.textContent = "Não foi possível carregar a citação.";
        quoteAuthor.textContent = "";
        quoteArea.classList.remove('hidden');
    }
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
updateDisplay();