const questions = [
    { question: "Commonly used data types DO not include:", choices: ["1. strings", "2. Booleans", "3.alerts", "4.numbers"], answer: "4. numbers" },
    { question: "The condition in an if / else statement is enclosed with ______", choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square bracket"], answer: "3. parenthesis" },
    { question: "Arrays in JavaScript can be used to store ______", choices:["1. numbers and strings","2. other arrays","3. booleans","4. all of the above"], answer: "4. all of the above"},
    { question: "String values must be enclosed within ______ when being assigned to variables.", choices:["1. commas","2. curly brackets","3. quotes","4. parenthesis"], answer: "3. quotes"},
    { question: "A very useful tool used during development and debugging for printing content to the debugger is:", choices:["1. JavaScript","2. terminal/bash","3. for loops","4. console.log"], answer:"4. console.log"}
];



let timerSeconds = 60;
let timerInterval;
let score = 0;
let currentQuestionIndex = 0;

function startQuiz() {
    displayQuestion();
    timerInterval = setInterval(updateTimer, 1000);
    setTimeout(endQuiz, timerSeconds * 1000);
}

function displayQuestion() {
    const questionContainer = document.getElementById("question-container");
    const currentQuestion = questions[currentQuestionIndex];

    questionContainer.innerHTML = `<p>${currentQuestion.question}</p>`;

    const choicesContainer = document.createElement("div");
    choicesContainer.className = "choices";

    currentQuestion.choices.forEach((choice, index) => {
        choicesContainer.innerHTML += `<label class="choice">
                                          <input type="radio" name="choice" value="${index}"> ${choice}
                                       </label>`;
    });

    questionContainer.appendChild(choicesContainer);
}

function updateTimer() {
    const timerElement = document.getElementById("timer");
    timerElement.textContent = timerSeconds;

    if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        endQuiz();
    } else {
        timerSeconds--;
    }
}

function endQuiz() {
    const selectedChoice = document.querySelector('input[name="choice"]:checked');

    if (selectedChoice) {
        const userAnswer = questions[currentQuestionIndex].choices[selectedChoice.value];
        const correctAnswer = questions[currentQuestionIndex].answer;

        if (userAnswer === correctAnswer) {
            score++;
            showFeedback("Correct!", "green");
        } else {
            showFeedback("Wrong! The correct answer is: " + correctAnswer, "red");
        }
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length && timerSeconds > 0) {
        displayQuestion();
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    clearInterval(timerInterval);

    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `<h1>Quiz Ended!</h1>
                               <p>Your final score: ${score}</p>`;
}

function showFeedback(message, color) {
    const feedbackContainer = document.getElementById("feedback");
    feedbackContainer.textContent = message;
    feedbackContainer.style.color = color;

    // Clear the feedback after 2 seconds
    setTimeout(() => {
        feedbackContainer.textContent = "";
    }, 2000);
}

// Start the quiz when the page loads
startQuiz();


