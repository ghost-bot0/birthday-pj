document.addEventListener("DOMContentLoaded", () => {
  /* HELPER FUNCTION: showScene */
  function showScene(id) {
    document.querySelectorAll(".scene").forEach((scene) => {
      scene.classList.remove("active");
    });
    const target = document.getElementById(id);
    if (target) {
      target.classList.add("active");
    }
  }

  /* SECTION 1: OPENING SCENE */
  const houseLeft = document.getElementById("house-left");
  const houseMiddle = document.getElementById("house-middle");
  const houseRight = document.getElementById("house-right");
  const declineSound = document.getElementById("decline-sound");
  const teaseSound = document.getElementById("tease-sound");

  // Left House: Play decline sound.
  houseLeft.addEventListener("click", () => {
    console.log("Left house clicked");
    declineSound.play();
  });
  // Right House: Play decline sound.
  houseRight.addEventListener("click", () => {
    console.log("Right house clicked");
    declineSound.play();
  });
  // Middle House: Transition to Chibi Greeting.
  houseMiddle.addEventListener("click", () => {
    console.log("Middle house clicked");
    showScene("chibi-greeting");
  });

  /* SECTION 2: CHIBI GREETING */
  const gotThisBtn = document.getElementById("got-this");
  const helpMeBtn = document.getElementById("help-me");
  const greetingResponse = document.getElementById("greeting-response");

  gotThisBtn.addEventListener("click", () => {
    greetingResponse.textContent = "I like your confidence!";
    setTimeout(() => {
      showScene("playful-button");
    }, 2000);
  });
  helpMeBtn.addEventListener("click", () => {
    greetingResponse.textContent =
      "I knew it! But I'll not help you as it's simple so you'll get it easily!";
    setTimeout(() => {
      showScene("playful-button");
    }, 2000);
  });

  /* SECTION 3: PLAYFUL BUTTON */
  let teaseCount = 0;
  const teasingButton = document.getElementById("teasing-button");
  const buttonResponse = document.getElementById("button-response");

  teasingButton.addEventListener("mouseover", () => {
    if (teaseCount < 3) {
      const x = Math.random() * 200 - 100;
      const y = Math.random() * 200 - 100;
      teasingButton.style.transform = `translate(${x}px, ${y}px)`;
      teaseSound.play();
      teaseCount++;
    }
  });
  teasingButton.addEventListener("click", () => {
    if (teaseCount >= 3) {
      buttonResponse.textContent = "Our button is a little teasing 🤭 But I fixed it for you!";
      setTimeout(() => {
        buttonResponse.textContent = "Hey, stop it! Don’t tease her!";
        teasingButton.style.transform = "translate(0,0)";
        setTimeout(() => {
          showScene("guess-surprise");
        }, 2000);
      }, 1000);
    }
  });

  /* SECTION 4: GUESS THE SURPRISE */
  const surpriseFeedback = document.getElementById("surprise-feedback");
  const surpriseButtons = document.querySelectorAll(".surprise-btn");

  surpriseButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.getAttribute("data-type");
      handleSurprise(type);
    });
  });

  function handleSurprise(type) {
    if (type === "cute") {
      surpriseFeedback.textContent = "Generating the cutest message ever… 💖";
      setTimeout(() => {
        surpriseFeedback.textContent = "Almost there…";
        setTimeout(() => {
          surpriseFeedback.textContent =
            "Oops! The cute message got lost. Guess you’ll have to wait 😜";
          setTimeout(() => {
            showScene("quiz-section");
            startQuiz();
          }, 2000);
        }, 1000);
      }, 1500);
    } else if (type === "funny") {
      surpriseFeedback.textContent = "Processing… Finding the funniest joke for you… 🤔";
      document.getElementById("guess-surprise").classList.add("shake");
      setTimeout(() => {
        document.getElementById("guess-surprise").classList.remove("shake");
        surpriseFeedback.textContent = "Actually… you’re the funniest surprise here 😆";
        setTimeout(() => {
          showScene("quiz-section");
          startQuiz();
        }, 2000);
      }, 2000);
    } else if (type === "danger") {
      surpriseFeedback.textContent = "System Hacking in Progress…";
      document.body.style.background = "#000";
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        surpriseFeedback.textContent = `System Hacking in Progress… ${progress}%`;
        if (progress >= 70) {
          clearInterval(interval);
          surpriseFeedback.textContent = "System saved just in time!";
          setTimeout(() => {
            document.body.style.background = "#f9f1f1";
            showScene("quiz-section");
            startQuiz();
          }, 3000);
        }
      }, 700);
    }
  }

  /* SECTION 5: QUIZ */
  const quizQuestions = [
    {
      question: "What’s my best quality?",
      options: [
        { text: "My great humor", response: "Do I really have great humor? Hmmm 🤔" },
        { text: "My kindness", response: "Aww, that’s sweet, but let’s not get too emotional 🥲" },
        { text: "My intelligence", response: "Oh? Someone finally noticed 😏" },
        { text: "My patience", response: "Have you seen me playing games? 😂" },
      ],
    },
    {
      question: "If I were to get you a gift, what would it be?",
      options: [
        { text: "A cute plushie", response: "Okay, but only if you name it after me 😏" },
        { text: "A surprise mystery box", response: "Ooooh, adventurous! Just don’t blame me if it’s a prank 😆" },
        { text: "Why do I feel like you’ll just say ‘WRONG’ no matter what I pick?", response: "🥹" },
        { text: "You tell me! You should have the answer anyway. 😇", response: "😉" },
      ],
    },
    {
      question: "If I disappear for a day, where would I be?",
      options: [
        { text: "Watching anime", response: "Lost in another world, probably crying over a character’s death 😭" },
        { text: "Sleeping", response: "Well… that’s always an option 😴" },
        { text: "Lost in my own thoughts, overthinking everything", response: "Classic me 🫠" },
        { text: "Out on a long drive, music blasting", response: "Sounds like a perfect escape, doesn’t it? 🚗💨" },
      ],
    },
    {
      question: "What’s something I would NEVER do?",
      options: [
        { text: "Ignore your texts", response: "Well! Well! That's True 😌" },
        { text: "Say no to good food", response: "Unless it’s karela, then it’s a hard pass 🤢" },
        { text: "Stop teasing you", response: "That would be boring, right? 😏" },
        { text: "Dance in public", response: "Yeah… that’s never happening 😂" },
      ],
    },
    {
      question: "What’s the best way to cheer me up?",
      options: [
        { text: "Play games with me", response: "Simple. Effective. No questions asked 😎" },
        { text: "Call me and just talk", response: "Aww, so sweet 🥹" },
        { text: "Take me out for food", response: "Food = happiness. No debate. 🍕😌" },
        { text: "Annoy me until I forget what I was sad about", response: "You wouldn’t dare… or would you? 😳😂" },
      ],
    },
  ];
  
  let currentQuiz = 0;
  const quizContainer = document.getElementById("quiz-container");
  
  function startQuiz() {
    currentQuiz = 0;
    displayQuizQuestion();
  }
  
  function displayQuizQuestion() {
    quizContainer.innerHTML = "";
    if (currentQuiz < quizQuestions.length) {
      const q = quizQuestions[currentQuiz];
      const questionDiv = document.createElement("div");
      questionDiv.className = "question";
      questionDiv.textContent = q.question;
      quizContainer.appendChild(questionDiv);
  
      const optionsDiv = document.createElement("div");
      optionsDiv.className = "options";
      q.options.forEach((option) => {
        const btn = document.createElement("button");
        btn.textContent = option.text;
        btn.addEventListener("click", () => {
          // Update the thinking bubble in the quiz section.
          const thinkingBubble = document.getElementById("thinking-bubble");
          thinkingBubble.textContent = option.response;
          thinkingBubble.style.opacity = 1;
          setTimeout(() => {
            thinkingBubble.style.opacity = 0;
            currentQuiz++;
            displayQuizQuestion();
          }, 2000);
        });
        optionsDiv.appendChild(btn);
      });
      quizContainer.appendChild(optionsDiv);
    } else {
      showScene("final-message");
      startFinalMessage();
    }
  }
  
  /* SECTION 6: FINAL MESSAGE & CAKE */
  const finalTextDiv = document.getElementById("final-text");
  const finalFeedback = document.getElementById("final-feedback");
  const yesBtn = document.getElementById("yes-btn");
  const declineBtn = document.getElementById("decline-btn");
  const cake = document.getElementById("birthday-cake");
  const candles = document.getElementById("candles");
  
  function startFinalMessage() {
    const message =
      "I really like you, and I wanna share my future with you!\n" +
      "The more I talk to you, the more I keep falling for you.\n" +
      "We already play as a good duo in games, and just like I protect you in game, I wanna protect you in real life as well.\n" +
      " And I wanna ask you properly.. Will you be my Girlfriend ?";
    finalTextDiv.textContent = "";
    // Use the typeMessage function for realistic typing (in a code-style box)
    typeMessage(finalTextDiv, message, 50, () => {
      console.log("Typing complete!");
    });
    yesBtn.addEventListener("click", finalResponse);
    declineBtn.addEventListener("click", finalResponse);
  }
  
  /* Typing function with blinking cursor */
  function typeMessage(element, message, speed = 50, callback) {
    let index = 0;
    const cursorSpan = document.createElement("span");
    cursorSpan.classList.add("cursor");
    element.textContent = "";
    element.appendChild(cursorSpan);
  
    const typingInterval = setInterval(() => {
      if (index < message.length) {
        cursorSpan.insertAdjacentText("beforebegin", message[index]);
        index++;
      } else {
        clearInterval(typingInterval);
        element.removeChild(cursorSpan);
        if (callback) callback();
      }
    }, speed);
  }
  
  function finalResponse() {
    finalFeedback.textContent = "Awesome! Get ready for the cake!";
    setTimeout(() => {
      cake.style.cursor = "pointer";
      cake.addEventListener("click", blowCandles);
    }, 2000);
  }
  
  function blowCandles() {
    // Swap the cake image from lit to unlit.
    cake.src = "images/cake-no-flame.png";
    candles.style.opacity = 0;
    finalFeedback.textContent = "Fireworks and confetti!";
    launchConfetti();
    setTimeout(() => {
      finalFeedback.textContent = "Thank you for your time and a small pat on my head for all the efforts.";
      showFinalChibi();
    }, 3000);
  }
  
  /* Confetti Effect */
  function launchConfetti() {
    const container = document.createElement("div");
    container.classList.add("confetti-container");
    document.body.appendChild(container);
  
    const confettiCount = 80;
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.top = "-10px";
      const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFEA00", "#FFA500", "#FF00FF", "#00FFFF"];
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 1 + "s";
      container.appendChild(confetti);
    }
  
    setTimeout(() => {
      container.remove();
    }, 4000);
  }
  
  /* Reveal Final Chibi with Speech Bubble */
  function showFinalChibi() {
    const finalChibiContainer = document.getElementById("final-chibi-container");
    finalChibiContainer.style.display = "inline-flex";
    finalChibiContainer.style.opacity = 0;
    setTimeout(() => {
      finalChibiContainer.style.opacity = 1;
    }, 50);
  }
});
