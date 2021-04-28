const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

// localStorage에 저장할 key
const TODOS_LS = "toDos";
// localStorage에 저장할 value 목록
// const --> let 으로 바뀐 이유는, todolist에 할일을 추가 또는 삭제하면 이 배열이 변하기 때문
let toDos = [];

// delete 원리 : 닫기 누른 버튼의 li 삭제,
// 삭제한 li 를 filter()를 통해 걸러내고, 남은 li 들로 새 배열 만듦,
// 새 배열로 현재 배열을 switch

function deleteToDo(event) {
  // 클릭한 닫기 버튼 :
  const btn = event.target;
  // 클릭한 닫기 버튼의 li
  const li = btn.parentNode;
  // ul 안의 해당 li 삭제 (하지만 여기까지만 해서는 새로고침해도 안사라짐)
  toDoList.removeChild(li);

  // filter() : 배열에 적용하는 함수로, 조건에 맞는 요소들만 따로 모아 새 배열을 반환한다.
  const cleanToDos = toDos.filter(function (toDo) {
    // 이 조건에 적합한 toDo만 가지고 새로운 배열을 만듦
    return toDo.id !== parseInt(li.id);
  });
  console.log(cleanToDos);
  // filter를 거쳐 바뀐 cleanToDos 를 toDos 에 넣음
  toDos = cleanToDos;
  saveToDos();
}

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
  // 닫기 버튼 함수 호출
  delBtn.addEventListener("click", deleteToDo);
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

// 할일을 작성하면 실행할 목록 :
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
