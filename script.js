// store high scores
// set a timer - decrement time every time the answer is incorrect

// high scores & timer in flexbox?


const startQuiz = document.querySelector('#start');
const timer = document.querySelector('#counter');
const question = document.querySelector('#question');
const optionsElement = document.querySelector('#options-container');
const correctAnswer = document.querySelector('answer');
const quizContent = document.querySelector('#quiz-content');
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
    }
]


const takeQuiz = () => {
    countdown();
    appendQuizContent();
    optionsElement.addEventListener('click', submit)
}

const clearContent = () => {
    optionsElement.innerHTML = ''
    quizContent.innerHTML = ''
}

const appendQuizContent = () => {
    clearContent();
    let question = document.createElement('h2') //adds questions to page
    question.textContent = questionList[currentIndex].question;

    let currentList = questionList[currentIndex]

    for (i = 0; i < currentList.options.length; i++) {
        let selectEl = document.createElement('div');
        optionsElement.appendChild(selectEl);
        let text = document.createTextNode(currentList.options[i]);
        selectEl.appendChild(text);
        selectEl.setAttribute('class', 'option'); //sets option divs as ids
        selectEl.setAttribute('value', i); //gives number values to options
    }

    quizContent.appendChild(question) //adds question to page
    quizContent.appendChild(optionsElement) //adds options to page

    answerOptions = document.querySelectorAll('.option');
}

const submit = (event) => {
    checkAnswer(event);
    setTimeout(nextQuestion, 2000);
}

const nextQuestion = () => {
    currentIndex++;
    appendQuizContent();
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
        //add points to score
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
            clearInterval(interval);
        }
        intervalCount -= 1;
    }, 1000)
}

const addTimesUpText = () => {
        console.log ("Times up!!")

}


startQuiz.addEventListener('click', takeQuiz)









// const interval = setInterval(() => {
// decrement count
// display count

//if count < 0
// clear interval
//}, 1000)



// let interval = setInterval(() => {
//     count -= 1;
//     if(count === 0) {
//         clearInterval(interval);
//     }
// }, 1000)

// console.log(interval)


// const appendTimer = () => {
//     let count = document.createElement('p')
//     count.textContent = "Timer: " + count

//     timer.appendChild(count)
// }

// appendTimer();
