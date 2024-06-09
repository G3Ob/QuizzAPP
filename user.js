// user.js
const loginContainer = document.getElementById('login-container');
const registerContainer = document.getElementById('register-container');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterForm = document.getElementById('show-register-form');
const showLoginForm = document.getElementById('show-login-form');
const quizContainer = document.getElementById('quiz-container');
const userPageButton = document.getElementById('user-page-btn');
const adminPageButton = document.getElementById('admin-page-btn');

showRegisterForm.addEventListener('click', () => {
    loginContainer.classList.add('hide');
    registerContainer.classList.remove('hide');
});

showLoginForm.addEventListener('click', () => {
    registerContainer.classList.add('hide');
    loginContainer.classList.remove('hide');
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    loginUser(username, password);
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    registerUser(username, password);
});

function loginUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        alert('Login successful!');
        localStorage.setItem('loggedInUser', username);
        loadQuizPage();
    } else {
        alert('Invalid username or password');
    }
}

function registerUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.username === username)) {
        alert('Username already exists');
    } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful!');
        registerContainer.classList.add('hide');
        loginContainer.classList.remove('hide');
    }
}

function loadQuizPage() {
    loginContainer.classList.add('hide');
    registerContainer.classList.add('hide');
    quizContainer.classList.remove('hide');
    userPageButton.classList.remove('hide');
    adminPageButton.classList.remove('hide');
}

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

const savedQuizzesList = document.getElementById('saved-quizzes-list');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const homeButton = document.getElementById('home-btn');
const submitScoreButton = document.getElementById('submit-score-btn');

homeButton.addEventListener('click', goToHomePage);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showScore();
    }
});



function loadSavedQuizzes() {
    savedQuizzesList.innerHTML = '';
    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    quizzes.forEach((quiz, index) => {
        const quizItem = document.createElement('div');
        quizItem.classList.add('saved-quiz-item');
        quizItem.innerText = `Quiz ${index + 1}`;
        quizItem.addEventListener('click', () => startSavedQuiz(quiz));
        savedQuizzesList.appendChild(quizItem);
    });
}

function startSavedQuiz(savedQuestions) {
    questions = savedQuestions;
    currentQuestionIndex = 0;
    score = 0;
    savedQuizzesList.classList.add('hide');
    questionContainer.classList.remove('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });
    if (currentQuestionIndex < questions.length - 1) {
        nextButton.classList.remove('hide');
    } else {
        showScore();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showScore() {
    questionContainer.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreElement.innerText = `Score: ${score}`;
    window.score = score;
}


function goToHomePage() {
    window.location.href = 'user.html';
}

// Load saved quizzes on page load
loadSavedQuizzes();
