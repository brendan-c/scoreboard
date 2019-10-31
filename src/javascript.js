function sanitize(message) {
  message = message.replace(new RegExp("<", "g"), ' ');
  message = message.replace(new RegExp(">", "g"), ' ');
  return message
}


function toggleEditor(event) {
  const container = event.target.parentElement.nodeName === 'H1' // if it's in the h1 title
    ?
    event.target.parentNode // the container is the h1
    :
    event.target.closest('.column') // else its a column

  const text = container.querySelector('.title')
  const input = container.querySelector('input[type="text"]')
  const editor = container.querySelector('.editor')

  let subject = text.innerHTML;
  input.value = subject;

  text.style.display = 'none';
  editor.style.display = 'inline';
}


function doEdit(event) {
  const container = event.target.parentElement.nodeName === 'H1' // if it's in the h1 title
    ?
    event.target.parentNode // the container is the h1
    :
    event.target.closest('.column') // else its a column

  const text = container.querySelector('.title')
  const input = container.querySelector('input[type="text"]')
  const editor = container.querySelector('.editor')

  var subject = input.value;
  subject = sanitize(subject);
  text.innerHTML = subject;

  text.style.display = 'inline';
  editor.style.display = 'none';
}

function changeScore(event) {
  const column = event.target.closest('.column')
  const btn = event.target
  const action = btn.classList.contains('add') ? 'add' : 'sub'
  const scoreElement = column.querySelector('.score')
  let scoreValue = scoreElement.textContent
  if (action === 'add') {
    scoreElement.innerText = Number(scoreValue) + 1
  } else {
    scoreElement.innerText = Number(scoreValue) - 1
  }
}


// determine what sort button was clicked
// redirect to the appropiate function
function handleButtonClick(event) {
  const clickedButton = event.target.classList[0]
  if (clickedButton === 'change_score') {
    changeScore(event)
  } else if (clickedButton === 'set_title') {
    doEdit(event)
  } else if (clickedButton === 'title') {
    toggleEditor(event)
  }
}

//Get collection of buttons
const buttons = document.querySelectorAll('.btn')
buttons.forEach(button => {
  // add a click event listener to each button
  // and run the handleButtonClick function
  button.addEventListener('click', handleButtonClick)
})