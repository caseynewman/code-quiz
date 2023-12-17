// store high scores

// high scores & timer in flexbox?


const startQuiz = document.querySelector('#start');
const timer = document.querySelector('#counter');
const question = document.querySelector('#question');
const optionsElement = document.querySelector('#options-container');
const correctAnswer = document.querySelector('answer');
const quizContent = document.querySelector('#quiz-content');
const scoreboardElement = document.querySelector('#scoreboard');
const submitButton = document.querySelector('#submit-initials')
let answerOptions;
let currentIndex = 0;
let score = 0;
let intervalCount = 15;



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
        question: 'What allows you to store key value pairs?',
        options: ['functions', 'arrays', 'for loops', 'objects'],
        answer: 3,
    },
]


const takeQuiz = () => {
    startQuiz.remove();
    countdown();
    appendQuizContent();
    optionsElement.addEventListener('click', submit);
    submitButton.addEventListener('click', setUserScores);
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
    setTimeout(nextQuestion, 1500);
}

const nextQuestion = () => {
    currentIndex++;
    clearContent();
    console.log(intervalCount);
    if (currentIndex + 1 > questionList.length || intervalCount <= 0) {
        scoreboardElement.style.display="block";
    } else {
        appendQuizContent();
    }
}

const setUserScores = () => {
    // get input and value
    //localStorage.setItem("user", value);
    //localStorage.setItem("score", score);
}

const checkAnswer = (event) => {
    let currentList = questionList[currentIndex];
    let clickedOption = event.target;
    let answerValue = parseInt(clickedOption.getAttribute('value'));
    let answer = parseInt(currentList.answer);
    let correctAnswer = answerOptions[answer];
    let color;
    if (answerValue === answer) {
        color = 'green';
        score += 10;
    } else {
        color = 'red';
        intervalCount -= 10;
        if (intervalCount <= 0) {
            intervalCount = 0;
        }
        timer.textContent = intervalCount;
    }
    correctAnswer.style.backgroundColor = 'green';
    clickedOption.style.backgroundColor = color;
}

const countdown = () => {
    let interval = setInterval(() => {
        timer.textContent = intervalCount;
        if(intervalCount <= 0) {
            addTimesUpText();
            clearContent();
            clearInterval(interval);
        }
        intervalCount -= 1;
    }, 1000)
}

const addTimesUpText = () => {
        console.log("Times up!!");

}




startQuiz.addEventListener('click', takeQuiz)