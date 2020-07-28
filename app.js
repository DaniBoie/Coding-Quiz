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
    "correct_answer": "<style>",
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
let tablePermission = true
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

      //Creates div to alert the user thier answer was right
      let resultElem = document.createElement('div')
      resultElem.className = 'alert alert-success'
      resultElem.textContent = 'Correct Answer! Good Job!'
      document.getElementById('results').append(resultElem)
      // permission blocks multiple button clicks & timeout gives buffer before new question
      permission = false
      setTimeout(() => {
        newQuestion()
        permission = true

      }, 2000)

      //Checks if the answer is wrong
    } else if (event.target.dataset.answer !== questions[myIndex].correct_answer) {
      console.log('Wrong!')

      //Creates div to alert the user thier answer was wrong
      let resultElem = document.createElement('div')
      resultElem.className = 'alert alert-danger alertStyle'
      resultElem.textContent = `Incorrect Answer! The correct answer was: ${questions[myIndex].correct_answer}`
      document.getElementById('results').append(resultElem)
      //takes time away for wrong answers
      time = time - 10
      // permission blocks multiple button clicks & timeout gives buffer before new question
      permission = false
      setTimeout(() => {
        newQuestion()
        permission = true

      }, 2000)
    }
    //After the question is checked go to the next object in the array
    myIndex++
  }
})

//Function that is called when the quiz is over.
function scoreScreen() {
  //variable to show how much time the user had left
  var finalTime = time
  
  //Changes the page's HTML to show score and leaderboard.
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

//Quinton's Code (Modified):

// creates a variable for submit score and stores it into the leaderboard
const submitScore = submission => {
  //either pulls existing leaderboard or creates a new one.
  let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || []
  //pushes the submission object into the leaderboard array
  leaderboard.push(submission)
  //Sets the newly added to array into the local storage.
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard))
  //function used to sort the arrat from highest score to lowest score.
  leaderboard.sort((a, b) => {
    return b.score - a.score
  })

  //Leaderboard Table creation

  // creating the main tavle and making the table head
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
  // Creating the table body
  let bodyElem = document.createElement('tbody')
  //Creating a loop that creates rows based off of the leaderboard array
  for (let i = 0; i < leaderboard.length; i++) {
    let rowElem = document.createElement('tr')
    rowElem.innerHTML = `
        <th scope="row">${i + 1}</th>
        <td>${leaderboard[i].username}</td>
        <td>${leaderboard[i].score}</td>
      `
    //Takes all the newly created rows and appends them into the table body
    bodyElem.append(rowElem)
  }
  //Takes the body element and appends it into the table element
  tableElem.append(bodyElem)
  // Appends the table onto the page
  document.getElementById('table').append(tableElem)
}

//Event listener for the final submit score button
document.addEventListener('click', event => {
  //checks if the submit button was pressed and also checks if its BEEN pressed before
  if (event.target.id === 'submitScore' && tablePermission) {
    event.preventDefault()
    //Calls the submit score function and inputs the object of varibles into it
    submitScore({
      username: document.getElementById('nameInput').value,
      score: score
    })
  //Checks if the table has already been created
  tablePermission = false
  //Changes the button to be a back button and takes you back to the home page
  document.getElementById('nameInput').textContent = ''
  document.getElementById('submitScore').textContent = 'Try Again!'
  }
})