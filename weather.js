const COORDS = "coords";

// 좌표 저장
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 좌표 가져오기를 성공했을때 실행할 함수
function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  // 객체 안의 key 와 value 의 이름이 같다면,
  // ex) latitude : latitude, 하나만 써도된다
  const coordsObj = {
    latitude,
    longitude,
  };
  // 좌표를 저장할 함수에 가져온 좌표를 arg 로 전달
  saveCoords(coordsObj);
}

// 좌표를 가져오지 못했을때 실행할 함수
function handleGeoError() {
  console.log("can't access geolocation");
}

// 좌표를 가져오는 함수
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    // get weather
  }
}

function init() {
  loadCoords();
}

init();
