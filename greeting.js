const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
  console.log(greeting);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  // user 가 없는 경우
  console.log(currentUser);
  if (currentUser === null) {
    // user 가 있는 경우
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
