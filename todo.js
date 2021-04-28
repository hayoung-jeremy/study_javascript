const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

// localStorage에 저장할 key
const TODOS_LS = "toDos";
// localStorage에 저장할 value 목록
const toDos = [];

// todo object 목록을 가져와서 localStorage에 저장
function saveToDos() {
  // javaScript data를 localStorage에 저장할 수 없음, only string 만 가능, 그래서 JSON.stringify 이용
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

// input에 입력한 값을 toDos에 밀어넣음
function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "⨉";
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  // 입력한 값을 localStorage에 저장
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    // localStorage에 저장할수 있는 것은 string 뿐이기 때문에,
    // 가져온 데이터도 string, so : JSON.parse를 이용해서 string을 object로 바꿔줌
    // console.log(loadedToDos);
    const parsedToDos = JSON.parse(loadedToDos);
    // console.log(parsedToDos);

    // toDoObj 에 들어있는 객체중 text를 각각 반환
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
