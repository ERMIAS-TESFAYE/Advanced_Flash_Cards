const days = ['MON', 'TUS', 'WED', 'TUR', 'FRI', 'SAT', 'SUN'];
const timeDisplay = document.querySelector('.time');

function currentTime() {
  const time = new Date();
  let hour = time.getHours();
  let minute = time.getMinutes();
  let second = time.getSeconds();

  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;

  timeDisplay.innerText = hour + ':' + minute + ':' + second;
}

setInterval(currentTime, 1000);
currentTime();

// cards
let cardCount = 0;

const question = document.querySelector('#question');
const answer = document.querySelector('#answer');
const subject = document.querySelector('#subject');
const button = document.querySelector('button');
const removeCard = document.querySelector('.delete');
const form = document.querySelector('form');
const cards = document.querySelector('.cards');
const quantity = document.querySelector('.quantity');

function getInput() {
  let ques = question.value;
  let ans = answer.value;
  let sub = subject.value;
  return {
    ques,
    ans,
    sub,
  };
}

function createElement() {
  let value = getInput();
  const mainCard = document.createElement('div');
  mainCard.className = 'card';

  const questionElement = document.createElement('p');
  questionElement.className = 'ques';
  questionElement.innerText = value.ques;
  mainCard.appendChild(questionElement);

  const line = document.createElement('div');
  line.className = 'line';
  mainCard.appendChild(line);

  const answerElement = document.createElement('p');
  answerElement.classList.add('ans');
  answerElement.innerText = value.ans;
  mainCard.appendChild(answerElement);
  answerElement.style.visibility = 'hidden';
  const subjectElement = document.createElement('div');
  subjectElement.className = 'sub';
  subjectElement.innerText = value.sub;
  mainCard.appendChild(subjectElement);

  const smallContainer = document.createElement('div');
  smallContainer.className = 'small';
  mainCard.appendChild(smallContainer);

  const btn = document.createElement('button');
  btn.textContent = 'Show Answer';
  btn.className = 'toggle';
  smallContainer.appendChild(btn);

  // Add event listener to toggle the visibility
  btn.addEventListener('click', () => {
    if (answerElement.style.visibility === 'hidden') {
      answerElement.style.visibility = 'visible';
      btn.innerText = 'Hide Answer';
    } else {
      answerElement.style.visibility = 'hidden';
      btn.innerText = 'Show Answer';
    }
  });

  const span = document.createElement('span');
  span.classList.add('material-symbols-outlined', 'delete');
  span.textContent = 'delete';
  smallContainer.appendChild(span);
  cardCount++;

  span.addEventListener('click', function () {
    //  remove the card when the delete button is clicked
    mainCard.remove();
    cardCount--;
    updateCardCount();
  });

  return mainCard;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let input = getInput();
  if (input.ques === '' || input.ans === '' || input.sub === '') {
    alert('please enter value');
  } else {
    cards.appendChild(createElement());
    updateCardCount();
    question.value = '';
    answer.value = '';
    subject.value = '';
  }
});

function updateCardCount() {
  if (cardCount === 0) {
    quantity.style.display = 'none';
  } else {
    quantity.style.display = 'flex';
    quantity.textContent = cardCount;
  }
}
