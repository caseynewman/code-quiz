// store high scores
// store questions
// set a timer - decrement time every time the answer is incorrect
// store correct answers
// store incorrect answers
// 

// highlight green when correct
// highlight red when incorrect

// high scores & timer in flexbox?




const startQuiz = document.querySelector('#start');
const question = document.querySelector('#question');
const optionsElement = document.querySelector('#options-container');
const correctAnswer = document.querySelector('answer');
const quizContent = document.querySelector('#quiz-content'); //div holding quiz info
let submitAnswer = document.querySelectorAll('.option'); //gets id and sets element to variable
let currentIndex = 0;






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
    appendQuizContent();
    // startQuiz.remove(); //removes start button after click
    optionsElement.addEventListener('click', submit)
}

startQuiz.addEventListener('click', takeQuiz)

    const appendQuizContent = () => {
        optionsElement.innerHTML = ''
        quizContent.innerHTML = '' //clears array after click
        let question = document.createElement('h2') //adds questions to page
        question.textContent = questionList[currentIndex].question;

        let currentList = questionList[currentIndex]

        for (i = 0 ; i < currentList.options.length ; i++) {
            let selectEl = document.createElement('div');
            optionsElement.appendChild(selectEl);
            let text = document.createTextNode(currentList.options[i]);
            selectEl.appendChild(text);
            selectEl.setAttribute('class', 'option'); //sets option divs as ids
            selectEl.setAttribute('value', i); //gives number values to options
        }

        quizContent.appendChild(question) //adds question to page
        quizContent.appendChild(optionsElement) //adds options to page

    }

    const submit = () => {
        checkAnswer();
        setTimeout(nextQuestion, 2000);
    }

    const nextQuestion = () => {
        currentIndex++;
        // if(currentIndex >= questionList.length){
        // }
    
        appendQuizContent();
    }


    
    const checkAnswer = (event) => {
        let currentList = questionList[currentIndex];
        let clickedOption = this;
        if (clickedOption.value === currentList.answer) {
            console.log ('success!');
        }
        //get event out of element, pull value out === questionList[currentIndex].answer ? 
        //green or red
    }



















    // const timer = document.querySelector('#timer');


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
