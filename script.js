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



// const questions = []
// const correctAnswers = []

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
        question: "Next question",
        options: [''],
        answer: 0,
    },
    {
        question: 'Next questions',
        options: [''],
        answer: 3,
    }
]


const takeQuiz = () => {

    const quizContent = document.querySelector('#quiz-content')
    const next = document.querySelector('#next')
    let currentIndex = 0;
    
    const appendQuizContent = () => {
        const question = document.createElement('p')
        question.textContent = questionList[currentIndex].question
    
        const options = document.createElement('li')
        options.textContent = questionList[currentIndex].options
    
    
        quizContent.appendChild(question)
        quizContent.appendChild(options)
    }
    
    const incrementList = () => {
        currentIndex++;
        if(currentIndex >= questionList.length){
            currentIndex = 0;
        }
    
        quizContent.innerHTML = ''
        appendQuizContent();
    }
    
    next.addEventListener('click', incrementList)
    appendQuizContent();


}

// const interval = setInterval(() => {
    // decrement count
    // display count

    //if count < 0
    // clear interval
//}, 1000)










startQuiz.addEventListener('click', takeQuiz)