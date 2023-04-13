const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const timerElement = document.getElementById("timer");
const score = document.getElementById("final-score");
const yourScore = document.getElementById("your-score");
const ctx = document.getElementById("myChart").getContext("2d");
const nameField = document.querySelector('#name');
const idField = document.querySelector('#id');
const inputDiv = document.getElementById("input-div");



let shuffledQuestions, currentQuestionIndex;
let timeLeft = 150; // or any other starting value
let timerInterval,
    finalMarks,
    marks = 0,
    totalMarks = 10;





// startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", function() {


    if (nameField.value.trim() === '' || idField.value.trim() === '') {
        score.textContent = 'Enter Your name and id to start the quiz.'
        return;
    }

    startQuiz()

});
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});

let timerStarted = false;

function startTimer(duration, display) {
    if (!timerStarted) {
        let timer = duration,
            minutes,
            seconds;
        let countdown = setInterval(function() {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(countdown);
                display.textContent = "Time's up!";
                startButton.disabled = true;
                yourScore.textContent = "Your final score is";
                totalMarks = marks
                finalMarks = finalMarks - totalMarks
                    // Create a new pie chart
                new Chart(ctx, {
                    type: "pie",
                    data: {
                        labels: ["Actual Marks", "Total Score"],
                        datasets: [{
                            label: "Marks",
                            data: [finalMarks, totalMarks],
                            backgroundColor: ["#FF6384", "#36A2EB"],
                        }, ],
                    },
                });

            }
        }, 1000);

        timerStarted = true;
    }
}


function startQuiz() {

    nameField.disabled = true
    idField.textContent = `Id:${idField.value}`
    idField.disabled = true
    startButton.textContent = "Next";
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove("hide");
    setNextQuestion();
    startTimer(timeLeft, timerElement);


}



function setNextQuestion() {
    resetState();
    if (shuffledQuestions.length === 0) {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
        yourScore.textContent = "Your final score is " + marks;
        clearInterval(timerInterval);
    } else {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-button");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
    shuffledQuestions.splice(currentQuestionIndex, 1);
}


function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}



function selectAnswer(e) {
    const selectedButton = e.target;
    let correct = selectedButton.dataset.correct;
    if (correct) {
        marks = marks + 1;
        score.textContent = marks;
        finalMarks = totalMarks - marks;
        console.log(finalMarks);
    }
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct);
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

const questions = [{
        question: "Which sport is the national sport of Ghana?",
        answers: [
            { text: "Rugby", correct: false },
            { text: "Cricket", correct: false },
            {
                text: "Soccer",
                correct: true
            },
        ],
    },
    {
        question: 'Which famous Ghanaian was the first Secretary-General of the United Nations?',
        answers: [
            { text: "Nelson Mandela", correct: false },
            { text: "Kofi Annan", correct: true },
            { text: "Desmond Tutu", correct: false },
            { text: "Kwame Cash", correct: false },
        ],
    },
    {
        question: "Which sea is located to the south of Ghana?",
        answers: [
            { text: "Gulf of Guinea", correct: true },
            { text: "Red Sea", correct: false },
            { text: "Ghana.", correct: false },
            { text: "Mediterranean Sea", correct: false },
        ],
    },
    {
        question: "What is the largest ethnic group in Ghana ? ",
        answers: [
            { text: "Maasai", correct: false },
            { text: "Kofi Brymo", correct: false },
            { text: "Ashanti", correct: true },
            { text: "Zulu", correct: false },
        ],
    },
    {
        question: "Which African country is located to the west of Ghana?",
        answers: [
            { text: "Kumasi", correct: false },
            { text: "Angola", correct: false },
            { text: "Kenya", correct: false },
            { text: " Togo", correct: true },
        ],
    },
    {
        question: "What is the highest mountain in Ghana?",
        answers: [
            { text: "Mount Cameroon", correct: false },
            { text: "Mount Adjangote", correct: false },
            { text: "Mount Afadjato", correct: true },
            { text: "Mount Kilimanjaro", correct: false },
        ],
    },
    {
        question: "What is the currency of Ghana?",
        answers: [
            { text: "Cedis", correct: true },
            { text: "Rand", correct: false },
            {
                text: "Naira",
                correct: false
            },
        ],
    },
    {
        question: "What is the official language of Ghana?",
        answers: [
            { text: "English", correct: true },
            { text: "French", correct: false },
            { text: "Spanish", correct: false },
        ],
    },
    {
        question: "Which river forms the eastern border of Ghana?",
        answers: [
            { text: " Congo", correct: false },
            { text: "Niger", correct: false },
            { text: "Volta", correct: true }
        ],
    },
    {
        question: "What is the capital city of Ghana?",
        answers: [
            { text: "Lagos", correct: false },
            { text: "Abuja", correct: false },
            { text: "Accra", correct: true },
            { text: "Lome", correct: false },
        ],
    },
];