let questions = [];

const questionInput = document.getElementById('question-input');
const answerInputs = document.getElementsByClassName('answer-input');
const correctAnswerInputs = document.getElementsByClassName('correct-answer'); // Select all radio buttons for correct answers
const addQuestionButton = document.getElementById('add-question-btn');
const saveQuizButton = document.getElementById('save-quiz-btn');
const savedQuizzesList = document.getElementById('saved-quizzes-list');
const homeButton = document.getElementById('home-btn');

addQuestionButton.addEventListener('click', addQuestion);
saveQuizButton.addEventListener('click', saveQuiz);
homeButton.addEventListener('click', goToHomePage);

function addQuestion() {
    const questionText = questionInput.value;
    const answers = [];

    for (let i = 0; i < answerInputs.length; i++) {
        answers.push({
            text: answerInputs[i].value,
            correct: correctAnswerInputs[i].checked // Check if the corresponding radio button is checked
        });
    }

    if (questionText && answers.length) {
        questions.push({
            question: questionText,
            answers: answers
        });

        questionInput.value = '';
        for (let input of answerInputs) {
            input.value = '';
        }
        for (let input of correctAnswerInputs) {
            input.checked = false;
        }
    }
}

function saveQuiz() {
    if (questions.length > 0) {
        let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
        quizzes.push(questions);
        localStorage.setItem('quizzes', JSON.stringify(quizzes));
        questions = [];
        loadSavedQuizzes();
        alert('Quiz saved successfully!');
    }
}

function loadSavedQuizzes() {
    savedQuizzesList.innerHTML = '';
    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    quizzes.forEach((quiz, index) => {
        const quizItem = document.createElement('div');
        quizItem.classList.add('saved-quiz-item');
        quizItem.innerHTML = `
            <span>Quiz ${index + 1}</span>
            <button class="delete-btn">Delete</button>
        `;
        quizItem.querySelector('.delete-btn').addEventListener('click', () => deleteQuiz(index));
        savedQuizzesList.appendChild(quizItem);
    });
}

function deleteQuiz(index) {
    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    quizzes.splice(index, 1);
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    loadSavedQuizzes();
}

function goToHomePage() {
    window.location.href = 'admin.html';
}

// Load saved quizzes on page load
loadSavedQuizzes();
