// store high scores

// high scores & timer in flexbox?


const startQuiz = document.querySelector('#start');
const introBlurb = document.querySelector('#intro');
const timer = document.querySelector('#counter');
const question = document.querySelector('#question');
const optionsElement = document.querySelector('#options-container');
const correctAnswer = document.querySelector('answer');
const quizContent = document.querySelector('#quiz-content');
const scoreboardElement = document.querySelector('#scoreboard');
const submitButton = document.querySelector('#submit-initials');
const viewHighScores = document.querySelector('#highscores');
let scores = JSON.parse(localStorage.getItem('scores')) || [];
let answerOptions;
let currentIndex = 0;
let intervalCount = 30;
let score = 0;
let interval;



const questionList = [
    {
        question: 'What creates the structure of your website?',
        options: ['CSS', 'HTML', 'arrays', 'strings'],
        answer: 1,
    },
    {
        question: 'Which of the following is NOT a keyword for storing values?',
        options: ['let', 'var', 'for', 'const'],
        answer: 2,
    },
    {
        question: 'What allows you to store key value pairs?',
        options: ['functions', 'arrays', 'for loops', 'objects'],
        answer: 3,
    },
    {
        question: 'Which HTML tag is used for JavaScript?',
        options: ['<script>', '<style>', '<src>', '<scripting>'],
        answer: 0,
    },
    {
        question: 'When a value is true or false, what type of data is it?',
        options: ['truthean', 'number', 'boolean', 'string'],
        answer: 2,
    },
    {
        question: 'Which of the following is an ID?',
        options: ['.quiz', '.id', '/container', '#quiz'],
        answer: 3,
    }
]


const takeQuiz = () => {
    startQuiz.remove();
    introBlurb.remove();
    countdown();
    appendQuizContent();
    optionsElement.addEventListener('click', submit);
    submitButton.addEventListener('click', calculateScore);
}

const clearContent = () => {
    optionsElement.innerHTML = ''
    quizContent.innerHTML = ''
}

const appendQuizContent = () => {
    let question = document.createElement('h2')
    question.textContent = questionList[currentIndex].question;

    let currentList = questionList[currentIndex]

    for (i = 0; i < currentList.options.length; i++) {
        let selectEl = document.createElement('div');
        optionsElement.appendChild(selectEl);
        let text = document.createTextNode(currentList.options[i]);
        selectEl.appendChild(text);
        selectEl.setAttribute('class', 'option');
        selectEl.setAttribute('value', i);
    }

    quizContent.appendChild(question)
    quizContent.appendChild(optionsElement)

    answerOptions = document.querySelectorAll('.option');
}

const submit = (event) => {
    checkAnswer(event);
    setTimeout(nextQuestion, 1000);
}

const nextQuestion = () => {
    currentIndex++;
    clearContent();
    if (currentIndex + 1 > questionList.length || intervalCount <= 0) {
        gameOver();
        scoreboardElement.style.display = 'block';
    } else {
        appendQuizContent();
    }
}

const checkAnswer = (event) => {
    let currentList = questionList[currentIndex];
    let clickedOption = event.target;
    let answerValue = parseInt(clickedOption.getAttribute('value'));
    let answer = parseInt(currentList.answer);
    let correctAnswer = answerOptions[answer];
    let color;
    if (answerValue === answer) {
        correctAnswer.setAttribute('class', 'green');
    } else {
        clickedOption.setAttribute('class', 'red');
        intervalCount -= 10;
        if (intervalCount <= 0) {
            intervalCount = 0;
        }
        timer.textContent = intervalCount;
    }
    correctAnswer.setAttribute('class', 'green');
    clickedOption.style.backgroundColor = color;
}

const calculateScore = () => {
    score = intervalCount + 1;
    updateScores();
}

const countdown = () => {
    interval = setInterval(() => {
        timer.textContent = intervalCount;
        if (intervalCount <= 0) {
            clearContent();
            clearInterval(interval);
        }
        intervalCount -= 1;
    }, 1000)
}

const gameOver = () => {
    clearInterval(interval);
    if (currentIndex + 1 > questionList.length) {
        const youWin = document.createElement('h2');
        youWin.textContent = 'Congratulations! You finished in time!';
        scoreboardElement.appendChild(youWin);
        const youWinP = document.createElement('p');
        youWinP.textContent = 'Enter your initials to save your score.';
        scoreboardElement.appendChild(youWinP);
    } else if (intervalCount <= 0) {
        const timesUp = document.createElement('h2');
        timesUp.textContent = "Time's up!!";
        scoreboardElement.appendChild(timesUp);
        const timesUpP = document.createElement('p');
        timesUpP.textContent = "Enter your initials to save your score or hit refresh to try again.";
        scoreboardElement.appendChild(timesUpP);
    }
}

const updateScores = () => {
    const initials = document.getElementById('initials').value.trim();
    if (initials !== '') {
        const newScore = {
            initials: initials,
            score: score,
        }
        scores.push(newScore);
        scores.sort((a, b) => b.score - a.score);
        localStorage.setItem('scores', JSON.stringify(scores));
        displayHighScores();
    } else {
        alert('Please enter your initials.');
    }
}

const displayHighScores = () => {
    scoreboardElement.innerHTML = '';
    const highScoresHeading = document.createElement('h2');
    highScoresHeading.textContent = 'High Scores';
    scoreboardElement.appendChild(highScoresHeading);
    const scoresList = document.createElement('ul');
    scores.forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${score.initials}: ${score.score}`;
        scoresList.appendChild(listItem);
    })
    scoreboardElement.appendChild(scoresList);
}

viewHighScores.addEventListener('click', () => {
    clearContent();
    scoreboardElement.style.display = 'block';
    displayHighScores();
})

startQuiz.addEventListener('click', takeQuiz)