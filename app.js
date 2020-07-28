//Array of question objects to call during changing code
let questions = [
  {
    "question": "Which is not a way to define a variable in JS?",
    "correct_answer": "give",
    "answers": [
      "let",
      "give",
      "var",
      "const"
    ]
  },
  {
    "question": "What does HTML stand for?",
    "correct_answer": "Hyper Text Markup Language",
    "answers": [
      "Hyper Tag Markup Language",
      "Hyperlinking Text Marking Language",
      "Hyperlinks Text Mark Language",
      "Hyper Text Markup Language"
    ]
  },
  {
    "question": "Which HTML element gives the largest heading",
    "correct_answer": "<h1>",
    "answers": [
      "<h1>",
      "<heading>",
      "<h6>",
      "<head>"
    ]
  },
  {
    "question": "What is the correct HTML element for inserting a line break?",
    "correct_answer": "<br>",
    "answers": [
      "<lb>",
      "<break>",
      "<br>",
      "<lineBreak>"
    ]
  },
  {
    "question": "Which tag links stylesheets to the page?",
    "correct_answer": "give",
    "answers": [
      "let",
      "<style>",
      "<script>",
      "<a href = 'ex'>"
    ]
  },
  {
    "question": "What symbol makes comments in JS?",
    "correct_answer": "//",
    "answers": [
      "<-- -->",
      "//",
      "/* */",
      "--> <--"
    ]
  },
  {
    "question": "How can you make a numbered list?",
    "correct_answer": "<ol>",
    "answers": [
      "<dl>",
      "<list>",
      "<ul>",
      "<ol>"
    ]
  },
  {
    "question": "How can you make a bulleted list?",
    "correct_answer": "<ul>",
    "answers": [
      "<ul>",
      "<ol>",
      "<dl>",
      "<list>"
    ]
  },
  {
    "question": "Which symbol calls for the ID of an image to style in CSS",
    "correct_answer": "#",
    "answers": [
      "<a>",
      "#",
      ".",
      "//"
    ]
  },
  {
    "question": "Which is not a boolean value?",
    "correct_answer": "justify",
    "answers": [
      "true",
      "justify",
      "false",
      "null"
    ]
  },
]

//Defining global variables to manipulate
let score = 0
let time = 100
let myIndex = 0
let permission = true

//Function that is called everytime 
function newQuestion() {

  //If question is past the last item in the array go to score screen and stop function
  if (myIndex >= 10) {
    scoreScreen()
    return
  }

  //Changes content in previous HMTL to add questions
  document.getElementById('results').innerHTML = ` `
  document.getElementById('overBtn').textContent = 'Choose One!'
  document.getElementById("questions").className = 'boldQ'
  document.getElementById("questions").textContent = questions[myIndex].question

  let answers = questions[myIndex].answers

  //Creates buttons for the user to pick from
  document.getElementById('answers').innerHTML = ` `
  for (let i = 0; i < answers.length; i++) {
    let answerElem = document.createElement('button')
    answerElem.className = 'btn btn-secondary btn-lg answers btnStyle'
    answerElem.dataset.answer = answers[i]
    answerElem.textContent = answers[i]
    document.getElementById('answers').append(answerElem)
  }
}

//Function that handles time and freezes time when the game ends 
function timeScore () {

  var timeLeft = setInterval(function () {
    if (time > 0 && myIndex < 10) {
      time--
      document.getElementById('time').textContent = time
    } else {
      clearInterval(timeLeft)
      scoreScreen() 
    }
  }, 1000)
}

//Event listeners for the start button to start the Quiz
document.getElementById("startBtn").addEventListener('click', timeScore)
document.getElementById("startBtn").addEventListener('click', newQuestion)

//Click event that checks the answer and changes variables depending on correctness.
document.addEventListener('click', event => {
  if (event.target.classList.contains('answers') && permission) {

    //Checks if the answer is correct
    if (event.target.dataset.answer === questions[myIndex].correct_answer) {
      //Adds to score and changes score text
      score++
      document.getElementById('score').textContent = score

      //Creates div to alert the user 
      let resultElem = document.createElement('div')
      resultElem.className = 'alert alert-success'
      resultElem.textContent = 'Correct Answer! Good Job!'
      document.getElementById('results').append(resultElem)
      permission = false
      setTimeout(() => {
        newQuestion()
        permission = true

      }, 2000)

    } else if (event.target.dataset.answer !== questions[myIndex].correct_answer) {
      console.log('Wrong!')
      let resultElem = document.createElement('div')
      resultElem.className = 'alert alert-danger alertStyle'
      resultElem.textContent = `Incorrect Answer! The correct was: ${questions[myIndex].correct_answer}`
      document.getElementById('results').append(resultElem)
      time = time - 10
      permission = false
      setTimeout(() => {
        newQuestion()
        permission = true

      }, 2000)
    }
    myIndex++
  }

})

function scoreScreen() {
  var finalTime = time
  
  document.getElementById('startScreen').innerHTML = `
    <h1>End of Quiz!</h1>
    
    <h3>Your Final Score was: ${score}</h3>
    <h3>You had ${finalTime} seconds left to spare!</h3>

    <p class="finalP">How do you stack up?</p>
    <p class="finalP">Save your name and score to see how you compete!</p>

    <form id="highscoreInput">
      <div class="form-group">
        <label for="name" id="name">Name:</label>
        <input type="text" class="form-control" id="nameInput">
        <small class="form-text text-muted">This name will represent you in the Highscore Table</small>
      </div>
    <form>

    <button class="btn btn-dark" id="submitScore">Submit!</button>
  `
}

//Quinton's Code
const submitScore = submission => {
  console.log(submission)
  let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || []
  leaderboard.push(submission)
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard))
  leaderboard.sort((a, b) => {
    return b.score - a.score
  })
  let tableElem = document.createElement('table')
  tableElem.className = 'table tableStyle'
  tableElem.innerHTML = `
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">username</th>
          <th scope="col">score</th>
        </tr>
      </thead>
    `
  let bodyElem = document.createElement('tbody')
  for (let i = 0; i < leaderboard.length; i++) {
    let rowElem = document.createElement('tr')
    rowElem.innerHTML = `
        <th scope="row">${i + 1}</th>
        <td>${leaderboard[i].username}</td>
        <td>${leaderboard[i].score}</td>
      `
    bodyElem.append(rowElem)
  }
  tableElem.append(bodyElem)
  document.getElementById('table').append(tableElem)
}

document.addEventListener('click', event => {
  if (event.target.id === 'submitScore') {
    event.preventDefault()
    submitScore({
      username: document.getElementById('nameInput').value,
      score: score
    })
  
  }
})
scoreScreen()