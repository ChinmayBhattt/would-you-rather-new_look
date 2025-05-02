    // Questions data
    const questions = [
      {
        question: "Would you rather...",
        optionA: {
          text: "Have the ability to fly",
          emoji: "✈️",
          percentage: 65
        },
        optionB: {
          text: "Have the ability to read minds",
          emoji: "🧠",
          percentage: 35
        }
      },
      {
        question: "Would you rather...",
        optionA: {
          text: "Live in a beach house",
          emoji: "🏖️",
          percentage: 71
        },
        optionB: {
          text: "Live in a mountain cabin",
          emoji: "🏔️",
          percentage: 29
        }
      },
      {
        question: "Would you rather...",
        optionA: {
          text: "Be invisible",
          emoji: "👻",
          percentage: 42
        },
        optionB: {
          text: "Be super strong",
          emoji: "💪",
          percentage: 58
        }
      },
      {
        question: "Would you rather...",
        optionA: {
          text: "Travel 100 years into the future",
          emoji: "🚀",
          percentage: 60
        },
        optionB: {
          text: "Travel 100 years into the past",
          emoji: "⏳",
          percentage: 40
        }
      },
      {
        question: "Would you rather...",
        optionA: {
          text: "Never have to eat again",
          emoji: "🍽️",
          percentage: 22
        },
        optionB: {
          text: "Never have to sleep again",
          emoji: "😴",
          percentage: 78
        }
      },
      {
        question: "Would you rather...",
        optionA: {
          text: "Win the lottery",
          emoji: "💰",
          percentage: 68
        },
        optionB: {
          text: "Find true love",
          emoji: "❤️",
          percentage: 32
        }
      },
      {
        question: "Would you rather...",
        optionA: {
          text: "Speak all languages",
          emoji: "🗣️",
          percentage: 83
        },
        optionB: {
          text: "Play all musical instruments",
          emoji: "🎸",
          percentage: 17
        }
      },
      {
        question: "Would you rather...",
        optionA: {
          text: "Have unlimited money",
          emoji: "💵",
          percentage: 75
        },
        optionB: {
          text: "Have unlimited time",
          emoji: "⌛",
          percentage: 25
        }
      },
      {
        question: "Would you rather...",
        optionA: {
          text: "Be famous",
          emoji: "🌟",
          percentage: 31
        },
        optionB: {
          text: "Be anonymous but wealthy",
          emoji: "🕶️",
          percentage: 69
        }
      },
      {
        question: "Would you rather...",
        optionA: {
          text: "Live without internet",
          emoji: "🌐",
          percentage: 18
        },
        optionB: {
          text: "Live without air conditioning",
          emoji: "❄️",
          percentage: 82
        }
      }
    ];

    // Game state
    let currentQuestionIndex = 0;
    let selectedAnswers = [];

    // DOM elements
    const landingScreen = document.querySelector('.landing-screen');
    const questionScreen = document.querySelector('.question-screen');
    const resultsScreen = document.querySelector('.results-screen');
    const startBtn = document.querySelector('.start-btn');
    const nextBtn = document.querySelector('.next-btn');
    const restartBtn = document.querySelector('.restart-btn');
    const shareBtn = document.querySelector('.share-btn');
    const progressBar = document.querySelector('.progress-bar');
    const currentQuestionElement = document.getElementById('current-question');
    const totalQuestionsElement = document.getElementById('total-questions');
    const questionText = document.querySelector('.question-text');
    const optionsContainer = document.querySelector('.options-container');
    const options = document.querySelectorAll('.option');

    // Initialize
    totalQuestionsElement.textContent = questions.length;

    // Event listeners
    startBtn.addEventListener('click', startGame);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartGame);
    shareBtn.addEventListener('click', shareResults);
    options.forEach(option => {
      option.addEventListener('click', selectOption);
    });

    // Functions
    function startGame() {
      switchScreen(landingScreen, questionScreen);
      currentQuestionIndex = 0;
      selectedAnswers = [];
      loadQuestion(currentQuestionIndex);
    }

    function loadQuestion(index) {
      const question = questions[index];
      
      // Update question text and progress
      questionText.textContent = question.question;
      currentQuestionElement.textContent = index + 1;
      progressBar.style.width = `${((index + 1) / questions.length) * 100}%`;
      
      // Update options
      const optionElements = document.querySelectorAll('.option');
      
      optionElements[0].querySelector('h3').textContent = "Option A";
      optionElements[0].querySelector('p').textContent = question.optionA.text;
      optionElements[0].querySelector('.emoji').textContent = question.optionA.emoji;
      optionElements[0].querySelector('.result-text').textContent = "0%";
      optionElements[0].querySelector('.result-fill').style.width = "0%";
      
      optionElements[1].querySelector('h3').textContent = "Option B";
      optionElements[1].querySelector('p').textContent = question.optionB.text;
      optionElements[1].querySelector('.emoji').textContent = question.optionB.emoji;
      optionElements[1].querySelector('.result-text').textContent = "0%";
      optionElements[1].querySelector('.result-fill').style.width = "0%";
      
      // Reset options state
      optionElements.forEach(option => {
        option.classList.remove('selected', 'not-selected');
        option.querySelector('.result-text').classList.remove('show');
      });
      
      // Hide next button
      nextBtn.classList.remove('show');
    }

    function selectOption(e) {
      // Only allow selection if none is already selected
      if (document.querySelector('.option.selected')) return;
      
      const selectedOption = e.currentTarget;
      const otherOption = selectedOption.dataset.option === 'A' 
        ? document.querySelector('.option[data-option="B"]')
        : document.querySelector('.option[data-option="A"]');
      
      // Mark as selected/not-selected
      selectedOption.classList.add('selected');
      otherOption.classList.add('not-selected');
      
      // Get current question data
      const question = questions[currentQuestionIndex];
      const selectedPercentage = selectedOption.dataset.option === 'A' 
        ? question.optionA.percentage 
        : question.optionB.percentage;
      const otherPercentage = 100 - selectedPercentage;
      
      // Store the answer
      selectedAnswers.push({
        questionIndex: currentQuestionIndex,
        selectedOption: selectedOption.dataset.option
      });
      
      // Update and show result bars
      setTimeout(() => {
        selectedOption.querySelector('.result-fill').style.width = `${selectedPercentage}%`;
        otherOption.querySelector('.result-fill').style.width = `${otherPercentage}%`;
        
        selectedOption.querySelector('.result-text').textContent = `${selectedPercentage}%`;
        otherOption.querySelector('.result-text').textContent = `${otherPercentage}%`;
        
        selectedOption.querySelector('.result-text').classList.add('show');
        otherOption.querySelector('.result-text').classList.add('show');
        
        // Show next button
        nextBtn.classList.add('show');
      }, 300);
    }

    function nextQuestion() {
      currentQuestionIndex++;
      
      if (currentQuestionIndex >= questions.length) {
        // Game is finished, show results
        switchScreen(questionScreen, resultsScreen);
      } else {
        // Load next question with transition
        questionScreen.classList.remove('active');
        setTimeout(() => {
          loadQuestion(currentQuestionIndex);
          questionScreen.classList.add('active');
        }, 300);
      }
    }

    function restartGame() {
      switchScreen(resultsScreen, landingScreen);
    }

    function shareResults() {
      // In a real application, this would share to social media
      alert('Share functionality would be implemented here! This would allow sharing to social media platforms.');
    }

    function switchScreen(fromScreen, toScreen) {
      fromScreen.classList.remove('active');
      setTimeout(() => {
        toScreen.classList.add('active');
      }, 300);
    }

    // Add a subtle parallax effect on mouse move for extra polish
    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const moveX = (clientX - centerX) / 40;
      const moveY = (clientY - centerY) / 40;
      
      document.querySelectorAll('.option').forEach(option => {
        if (!option.classList.contains('selected') && !option.classList.contains('not-selected')) {
          option.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
      });
    });