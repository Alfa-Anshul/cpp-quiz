const quizData = [
  // Basic Level
  {
    id: 1,
    question: "What is the correct way to declare a variable in C++?",
    options: ["var x = 5;", "int x = 5;", "x = 5;", "declare x = 5;"],
    correct: 1,
    difficulty: "basic"
  },
  {
    id: 2,
    question: "Which header file is used for input/output in C++?",
    options: ["#include <io.h>", "#include <stdio.h>", "#include <iostream>", "#include <input.h>"],
    correct: 2,
    difficulty: "basic"
  },
  {
    id: 3,
    question: "What is the output of cout << 5 + 3 * 2;",
    options: ["16", "11", "13", "21"],
    correct: 1,
    difficulty: "basic"
  },
  {
    id: 4,
    question: "Which of the following is not a fundamental data type in C++?",
    options: ["int", "float", "string", "double"],
    correct: 2,
    difficulty: "basic"
  },
  {
    id: 5,
    question: "What does 'cout' stand for?",
    options: ["Console out", "Code out", "Character output", "Central output"],
    correct: 0,
    difficulty: "basic"
  },

  // Intermediate Level
  {
    id: 6,
    question: "What is the output of the following code? int x = 5; int y = x++; cout << x << \" \" << y;",
    options: ["5 5", "6 5", "5 6", "6 6"],
    correct: 1,
    difficulty: "intermediate"
  },
  {
    id: 7,
    question: "What is a pointer in C++?",
    options: ["A variable that stores an address", "A function that points to code", "A type of array", "A special function"],
    correct: 0,
    difficulty: "intermediate"
  },
  {
    id: 8,
    question: "What is the correct syntax to create a pointer to an integer?",
    options: ["int *ptr;", "int ptr*;", "*int ptr;", "ptr *int;"],
    correct: 0,
    difficulty: "intermediate"
  },
  {
    id: 9,
    question: "Which keyword is used to define a constant in C++?",
    options: ["static", "const", "final", "constant"],
    correct: 1,
    difficulty: "intermediate"
  },
  {
    id: 10,
    question: "What is the difference between pass by value and pass by reference?",
    options: [
      "Pass by value copies data, pass by reference passes address",
      "They are the same thing",
      "Pass by reference is slower",
      "Pass by value is used for objects only"
    ],
    correct: 0,
    difficulty: "intermediate"
  },

  // Advanced Level
  {
    id: 11,
    question: "What is RAII in C++?",
    options: [
      "Resource Acquisition Is Initialization",
      "Random Array Index Initialization",
      "Recursive Algorithm in Implementation",
      "Real-time Application Interface Integration"
    ],
    correct: 0,
    difficulty: "advanced"
  },
  {
    id: 12,
    question: "What is the purpose of virtual functions in C++?",
    options: [
      "To achieve dynamic polymorphism",
      "To improve performance",
      "To reduce memory usage",
      "To create inline functions"
    ],
    correct: 0,
    difficulty: "advanced"
  },
  {
    id: 13,
    question: "What is the output of the code: vector<int> v = {1,2,3}; cout << v.at(5);",
    options: [
      "No output",
      "Returns 0",
      "Throws an out_of_range exception",
      "Returns undefined value"
    ],
    correct: 2,
    difficulty: "advanced"
  },
  {
    id: 14,
    question: "What is template specialization in C++?",
    options: [
      "A way to provide custom implementation for specific template arguments",
      "A method to inherit from templates",
      "A technique to optimize templates automatically",
      "A way to prevent template instantiation"
    ],
    correct: 0,
    difficulty: "advanced"
  },
  {
    id: 15,
    question: "What is the purpose of the 'mutable' keyword in C++?",
    options: [
      "To allow modification of member variables in const member functions",
      "To declare variable-length arrays",
      "To create mutable strings",
      "To make virtual functions non-const"
    ],
    correct: 0,
    difficulty: "advanced"
  }
];

class Quiz {
  constructor() {
    this.currentQuestion = 0;
    this.score = 0;
    this.selectedAnswers = [];
    this.questions = [];
    this.difficulty = 'basic';
    this.init();
  }

  init() {
    this.render();
  }

  setDifficulty(level) {
    this.difficulty = level;
  }

  startQuiz() {
    this.questions = quizData.filter(q => q.difficulty === this.difficulty);
    this.currentQuestion = 0;
    this.score = 0;
    this.selectedAnswers = new Array(this.questions.length).fill(-1);
    this.renderQuiz();
  }

  selectAnswer(index) {
    this.selectedAnswers[this.currentQuestion] = index;
    this.renderQuiz();
  }

  nextQuestion() {
    if (this.selectedAnswers[this.currentQuestion] === -1) {
      alert('Please select an answer before proceeding!');
      return;
    }
    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
      this.renderQuiz();
    }
  }

  submitQuiz() {
    if (this.selectedAnswers[this.currentQuestion] === -1) {
      alert('Please select an answer before submitting!');
      return;
    }
    this.calculateScore();
    this.renderResults();
  }

  calculateScore() {
    this.score = 0;
    this.questions.forEach((q, index) => {
      if (this.selectedAnswers[index] === q.correct) {
        this.score++;
      }
    });
  }

  restartQuiz() {
    this.currentQuestion = 0;
    this.score = 0;
    this.selectedAnswers = [];
    this.questions = [];
    this.render();
  }

  render() {
    const root = document.getElementById('root');
    root.innerHTML = `
      <div class="container">
        <div class="header">
          <h1>🖥️ C++ Quiz</h1>
          <p>Test Your C++ Programming Knowledge</p>
        </div>
        <div class="start-screen">
          <h2>Welcome to C++ Quiz!</h2>
          <p>Challenge yourself with questions spanning from basic to advanced C++ concepts. Select your difficulty level and begin!</p>
          <div class="difficulty-select">
            <label>Select Difficulty Level:</label>
            <div class="difficulty-buttons">
              <button class="difficulty-btn" onclick="quiz.setDifficulty('basic'); quiz.updateDifficultyUI();">Beginner</button>
              <button class="difficulty-btn" onclick="quiz.setDifficulty('intermediate'); quiz.updateDifficultyUI();">Intermediate</button>
              <button class="difficulty-btn" onclick="quiz.setDifficulty('advanced'); quiz.updateDifficultyUI();">Advanced</button>
            </div>
          </div>
          <button class="start-btn" onclick="quiz.startQuiz();">Start Quiz</button>
        </div>
      </div>
    `;
    this.updateDifficultyUI();
  }

  updateDifficultyUI() {
    const buttons = document.querySelectorAll('.difficulty-btn');
    buttons.forEach(btn => {
      btn.classList.remove('active');
      if (
        (this.difficulty === 'basic' && btn.textContent === 'Beginner') ||
        (this.difficulty === 'intermediate' && btn.textContent === 'Intermediate') ||
        (this.difficulty === 'advanced' && btn.textContent === 'Advanced')
      ) {
        btn.classList.add('active');
      }
    });
  }

  renderQuiz() {
    const root = document.getElementById('root');
    const q = this.questions[this.currentQuestion];
    const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
    const isLastQuestion = this.currentQuestion === this.questions.length - 1;
    const selectedAnswer = this.selectedAnswers[this.currentQuestion];

    let optionsHTML = q.options.map((option, index) => `
      <button class="option ${selectedAnswer === index ? 'selected' : ''}" 
              onclick="quiz.selectAnswer(${index});">
        ${option}
      </button>
    `).join('');

    let buttonHTML = isLastQuestion ?
      `<button class="submit-btn" onclick="quiz.submitQuiz();">Submit Quiz</button>` :
      `<button class="next-btn" onclick="quiz.nextQuestion();">Next Question</button>`;

    root.innerHTML = `
      <div class="container">
        <div class="header">
          <h1>🖥️ C++ Quiz</h1>
        </div>
        <div class="quiz-screen">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
          <div class="question-counter">Question ${this.currentQuestion + 1} of ${this.questions.length}</div>
          <div class="question">${q.question}</div>
          <div class="options">${optionsHTML}</div>
          <div class="button-group">${buttonHTML}</div>
        </div>
      </div>
    `;
  }

  renderResults() {
    const root = document.getElementById('root');
    const percentage = ((this.score / this.questions.length) * 100).toFixed(1);
    let message = '';

    if (percentage >= 80) {
      message = 'Excellent! You have a strong grasp of C++!';
    } else if (percentage >= 60) {
      message = 'Good job! You know C++ well. Keep learning!';
    } else if (percentage >= 40) {
      message = 'Not bad! Review the concepts and try again.';
    } else {
      message = 'Keep practicing! C++ takes time to master.';
    }

    let resultsDetailsHTML = this.questions.map((q, index) => {
      const isCorrect = this.selectedAnswers[index] === q.correct;
      const userAnswer = q.options[this.selectedAnswers[index]];
      const correctAnswer = q.options[q.correct];

      return `
        <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
          <div class="result-question">Q${index + 1}: ${q.question}</div>
          <div class="result-answer"><strong>Your Answer:</strong> ${userAnswer || 'Not answered'}</div>
          <div class="result-answer"><strong>Correct Answer:</strong> ${correctAnswer}</div>
          <div class="result-answer"><strong>Status:</strong> ${isCorrect ? '✅ Correct' : '❌ Incorrect'}</div>
        </div>
      `;
    }).join('');

    root.innerHTML = `
      <div class="container">
        <div class="header">
          <h1>🖥️ C++ Quiz</h1>
        </div>
        <div class="results-screen">
          <h2>Quiz Complete!</h2>
          <div class="score-display">${this.score}/${this.questions.length}</div>
          <div class="score-text">You scored <strong>${percentage}%</strong></div>
          <div class="score-message">${message}</div>
          <div class="results-details">${resultsDetailsHTML}</div>
          <button class="restart-btn" onclick="quiz.restartQuiz();">Take Quiz Again</button>
        </div>
      </div>
    `;
  }
}

const quiz = new Quiz();