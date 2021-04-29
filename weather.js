const weather = document.querySelector(".js-weather");
const API_KEY = "4202a96e6da9b590dc2f1b421ceb72f6";
const COORDS = "coords";

// javaScript는 새로고침없이도 백그라운드에서 계속적으로 데이터를 가져올 수 있다:
// 날씨 가져올 함수
function getWeather(lat, lng) {
  // fetch 로 data를 받고, then: 이전 함수가 끝난 후 실행할 함수
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);
      // 온도 :
      const temperature = json.main.temp;
      // 위치 :
      const place = json.name;
      weather.innerText = `${temperature} @ ${place}`;
    });
}

// 좌표 저장
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 좌표 가져오기를 성공했을때 실행할 함수 (위치정보를 가져오고, 그에 해당하는 날씨정보를 가져온다.)
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

  // 해당 좌표에대한 날씨정보를 가져옴
  getWeather(latitude, longitude);
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
  // 좌표 정보가 없다면, 유저에게 좌표 정보를 요청
  if (loadedCoords === null) {
    askForCoords();
  }
  // 좌표 정보가 이미 있을 경우, 해당 좌표의 날씨정보를 가져옴
  else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
