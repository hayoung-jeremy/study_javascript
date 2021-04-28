const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  // form 에서 값을 입력하고 엔터를 누르면 발생하는 event 를 멈춤
  event.preventDefault();
  // input 에 입력한 사용자 이름을 가져옴
  const currentValue = input.value;
  // 가져온 이름을 h4에 보여줌
  paintGreeting(currentValue);
  saveName(currentValue);
}
function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

// user 정보가 없을 시 정보 입력창을 보여줌
function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
  console.log(greeting);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  console.log(currentUser);
  // user 가 없는 경우
  if (currentUser === null) {
    askForName();
    // user 가 있는 경우
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
