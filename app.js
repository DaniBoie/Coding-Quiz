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

let score = 0
let time = 100
let myIndex = 0

function newQuestion() {
  if (myIndex >= 10) {
    scoreScreen()
    return
  }
  document.getElementById('results').innerHTML = ` `
  document.getElementById('overBtn').textContent = 'Choose One!'
  document.getElementById("questions").textContent = questions[myIndex].question

  let answers = questions[myIndex].answers

  document.getElementById('answers').innerHTML = ` `
  for (let i = 0; i < answers.length; i++) {
    let answerElem = document.createElement('button')
    answerElem.className = 'btn btn-secondary btn-lg answers btnStyle'
    answerElem.dataset.answer = answers[i]
    answerElem.textContent = answers[i]
    document.getElementById('answers').append(answerElem)
  }
}

document.getElementById("startBtn").addEventListener('click', newQuestion)

document.addEventListener('click', event => {
  if (event.target.classList.contains('answers')) {

    if (event.target.dataset.answer === questions[myIndex].correct_answer) {
      console.log('CORRECT!')
      score++
      document.getElementById('score').textContent = score
      let resultElem = document.createElement('div')
      resultElem.className = 'alert alert-success'
      resultElem.textContent = 'Correct Answer!'
      document.getElementById('results').append(resultElem)
      setTimeout(newQuestion, 2000);

    } else if (event.target.dataset.answer !== questions[myIndex].correct_answer) {
      console.log('Wrong!')
      let resultElem = document.createElement('div')
      resultElem.className = 'alert alert-danger alertStyle'
      resultElem.textContent = 'Incorrect Answer!'
      document.getElementById('results').append(resultElem)
      setTimeout(newQuestion, 2000);
    }
    myIndex++
  }

})

function scoreScreen() {
  document.getElementById('startScreen').innerHTML = `
    <h1>End of Quiz!</h1>
    
    <p class="finalP">How did you do?</p>
    <p class="finalP">Save your name and score to see how you compete!</p>

    <form id="highscoreInput">
      <div class="form-group">
        <label for="name" id="name">Name:</label>
        <input type="text" class="form-control" id="nameInput">
        <small class="form-text text-muted">This name will represent you in the Highscore Table</small>
      </div>
    <form>

    <button class="btn btn-dark" id="nameBtn">Submit!</button>
  `
}

// scoreScreen()

let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || []



document.getElementById("nameBtn").addEventListener('click', event => {
  event.preventDefault()
  submitScore({
    username: document.getElementById('username').value,
    score: score
  })



})


function leaderboardCreate(){
  let hsTable = document.createElement('table')
  hsTable.className = 'table'
}
  // < h1 id = "scoreHeading" > Highscore Leaderboards:</ >

  //   <table class="table">
  //     <thead>
  //       <tr>
  //         <th scope="col">#</th>
  //         <th scope="col">First</th>
  //         <th scope="col">Last</th>
  //         <th scope="col">Handle</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       <tr>
  //         <th scope="row">1</th>
  //         <td>Mark</td>
  //         <td>Otto</td>
  //         <td>@mdo</td>
  //       </tr>
  //       <tr>
  //         <th scope="row">2</th>
  //         <td>Jacob</td>
  //         <td>Thornton</td>
  //         <td>@fat</td>
  //       </tr>
  //       <tr>
  //         <th scope="row">3</th>
  //         <td>Larry</td>
  //         <td>the Bird</td>
  //         <td>@twitter</td>
  //       </tr>
  //     </tbody>
  //   </table>
