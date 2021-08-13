var data = 0;
var districtData = 0;
buttonState = [false, false, false];
buttonName = ["AstraZeneca", "mod", "gau"];
cityId = {
  臺北市: 0,
  基隆市: 1,
  新北市: 2,
  連江縣: 3,
  宜蘭縣: 4,
  釣魚臺: 5,
  新竹市: 6,
  新竹縣: 7,
  桃園市: 8,
  苗栗縣: 9,
  臺中市: 10,
  彰化縣: 11,
  南投縣: 12,
  嘉義市: 13,
  嘉義縣: 14,
  雲林縣: 15,
  臺南市: 16,
  高雄市: 17,
  南海島: 18,
  澎湖縣: 19,
  金門縣: 20,
  屏東縣: 21,
  臺東縣: 22,
  花蓮縣: 23,
  請選擇縣市: 24,
};
var map = L.map("map", {
  center: [23.4886513, 120.4477149],
  zoom: 8,
});
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var greenIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

var markers = new L.MarkerClusterGroup().addTo(map);

function getResultData(city, district) {
  const resultList = document.querySelector(".resultList");
  resultList.innerHTML = "";
  var result = false;
  for (var k = 0; k < buttonState.length; k++) {
    //疫苗迴圈
    if (buttonState[k] === false) continue;
    for (var i = 0; i < data.length; i++) {
      //醫院迴圈
      if (district === "" || district === "請選擇地區") {
        if (
          data[i].City === city &&
          data[i].Vaccines[0] &&
          data[i].Vaccines[0].Name == buttonName[k]
        ) {
          result = true;
          const item = document.createElement("div");
          item.classList.add("item");
          item.setAttribute("data-id", i);
          const content = document.createElement("div");
          content.classList.add("content");
          const flexBox = document.createElement("div");
          flexBox.classList.add("d-flex", "justify-content-between");
          const hospitalName = document.createElement("a");
          hospitalName.classList.add("header", "hospitalName", "w-75");
          hospitalName.textContent = data[i].HospitalName;
          const brandTag = document.createElement("div");
          brandTag.classList.add("ui", "labels", "teal");
          const brandTagLabel = document.createElement("a");
          brandTagLabel.classList.add("ui", "label");
          brandTagLabel.textContent = "AZ疫苗";
          const hospitalAddress = document.createElement("div");
          hospitalAddress.classList.add("description", "hospitalAddress");
          hospitalAddressText = document.createTextNode(data[i].Address);
          const hospitalPhone = document.createElement("div");
          hospitalPhone.classList.add("description", "hospitalPhone");
          hospitalPhoneText = document.createTextNode(data[i].Phone);
          const homeIcon = document.createElement("i");
          homeIcon.classList.add("home", "icon", "violet", "circular");
          const phoneIcon = document.createElement("i");
          phoneIcon.classList.add("phone", "icon", "red", "circular");
          item.appendChild(content);
          brandTag.appendChild(brandTagLabel);
          flexBox.append(hospitalName, brandTag);
          hospitalAddress.append(homeIcon, hospitalAddressText);
          hospitalPhone.append(phoneIcon, hospitalPhoneText);
          content.append(flexBox, hospitalAddress, hospitalPhone);
          resultList.appendChild(item);
          item.addEventListener("click", () => {
            map.setView(
              [
                data[item.getAttribute("data-id")].Lat,
                data[item.getAttribute("data-id")].Long,
              ],
              17
            );
            //L.map.setView([data[i].Lat, data[i].Long], 14);
          });
        }
      } else {
        if (
          data[i].City === city &&
          data[i].Dist === district &&
          data[i].Vaccines[0] &&
          data[i].Vaccines[0].Name == buttonName[k]
        ) {
          result = true;
          const item = document.createElement("div");
          item.classList.add("item");
          item.setAttribute("data-id", i);
          const content = document.createElement("div");
          content.classList.add("content");
          const flexBox = document.createElement("div");
          flexBox.classList.add("d-flex", "justify-content-between");
          const hospitalName = document.createElement("a");
          hospitalName.classList.add("header", "hospitalName", "w-75");
          hospitalName.textContent = data[i].HospitalName;
          const brandTag = document.createElement("div");
          brandTag.classList.add("ui", "labels", "orange");
          const brandTagLabel = document.createElement("a");
          brandTagLabel.classList.add("ui", "label");
          brandTagLabel.textContent = "AZ疫苗";
          const hospitalAddress = document.createElement("div");
          hospitalAddress.classList.add("description", "hospitalAddress");
          hospitalAddressText = document.createTextNode(data[i].Address);
          const hospitalPhone = document.createElement("div");
          hospitalPhone.classList.add("description", "hospitalPhone");
          hospitalPhoneText = document.createTextNode(data[i].Phone);
          const homeIcon = document.createElement("i");
          homeIcon.classList.add("home", "violet", "circular", "icon");
          const phoneIcon = document.createElement("i");
          phoneIcon.classList.add("phone", "icon", "red", "circular");
          item.appendChild(content);
          brandTag.appendChild(brandTagLabel);
          flexBox.append(hospitalName, brandTag);
          hospitalAddress.append(homeIcon, hospitalAddressText);
          hospitalPhone.append(phoneIcon, hospitalPhoneText);
          content.append(flexBox, hospitalAddress, hospitalPhone);
          resultList.appendChild(item);
          item.addEventListener("click", () => {
            map.setView(
              [
                data[item.getAttribute("data-id")].Lat,
                data[item.getAttribute("data-id")].Long,
              ],
              17
            );
            //L.map.setView([data[i].Lat, data[i].Long], 14);
          });
        }
      }
    }
  }
  if (result === false) {
    const item = document.createElement("div");
    item.classList.add("item", "text-center");
    const text = document.createElement("h1");
    text.textContent = "無查詢結果";
    item.appendChild(text);
    resultList.appendChild(item);
  }
}

{
  /* <div class="ui blue labels">
  <a class="ui label">
    Fun <i class="icon close"></i>
  </a>
  <a class="ui label">
    Happy
    <div class="detail">22</div>
  </a>
  <a class="ui label">
    Smart
  </a>
  <a class="ui label">
    Insane
  </a>
  <a class="ui label">
    Exciting
  </a>
</div> */
}

/* <div class="item">
<div class="content">
  <a class="header hospitalName">Daniel Louise</a>
  <div class="description hospitalAddress"><i class="home icon"></i>Last seen watching just now.</div>
  <div class="description hospitalPhone"><i class="phone icon"></i>Last seen watching <a><b>Arrested Development</b></a> just now.</div>
</div>
</div>

<div class="item">
<div class="content">
  <a class="header hospitalName">Daniel Louise</a>
  <div class="description hospitalAddress"><i class="home icon"></i>Last seen watching just now.</div>
  <div class="description hospitalPhone"><i class="phone icon"></i>Last seen watching <a><b>Arrested Development</b></a> just now.</div>
</div>
</div> */
function addlocationInput() {
  const locationInput = document.querySelector(".locationInput");
  const districtInput = document.querySelector(".districtInput");
  districtInput.innerHTML = "";
  const option = document.createElement("option");
  option.value = "請選擇地區";
  option.textContent = "請選擇地區";
  districtInput.appendChild(option);
  for (var i = 0; i < districtData.length; i++) {
    const option = document.createElement("option");
    option.value = districtData[i].name;
    option.textContent = districtData[i].name;
    locationInput.appendChild(option);
  }
  // <option value="臺南市">臺南市</option>
}

function addDistrictInput(id) {
  const districtInput = document.querySelector(".districtInput");
  districtInput.innerHTML = "";
  const resultList = document.querySelector(".resultList");
  resultList.innerHTML = "";
  const item = document.createElement("div");
  item.classList.add("item", "text-center");
  const text = document.createElement("h1");
  text.textContent = "無查詢結果";
  item.appendChild(text);
  resultList.appendChild(item);
  const option = document.createElement("option");
  option.value = "請選擇地區";
  option.textContent = "請選擇地區";
  districtInput.appendChild(option);
  if (id === 24) return;
  for (var i = 0; i < districtData[id].districts.length; i++) {
    const name = districtData[id].districts[i].name;
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    districtInput.appendChild(option);
  }
}

function addAllEventLister() {
  var locationInputValue = "";
  var districtInputValue = "";
  const locationInput = document.querySelector(".locationInput");
  const districtInput = document.querySelector(".districtInput");

  const buttons = document.querySelectorAll(".button");

  locationInput.addEventListener("change", (event) => {
    locationInputValue = event.target.value;
    districtInputValue = "";
    addDistrictInput(cityId[event.target.value]);
    locationInput.classList.remove("error"); //如果是紅色的話變回來
    buttons.forEach((button) => button.classList.remove("orange"));
  });

  districtInput.addEventListener("change", (event) => {
    buttons.forEach((button) => button.classList.remove("orange"));
    districtInputValue = event.target.value;
  });
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (locationInputValue === "" || locationInputValue === "請選擇縣市")
        locationInput.classList.add("error");
      //如果地址input沒有填的話變紅色
      else {
        button.classList.toggle("orange");
        if (button.classList.contains("orange")) {
          buttonState[button.id] = true;
          getResultData(locationInputValue, districtInputValue);
        } else {
          buttonState[button.id] = false;
          getResultData(locationInputValue, districtInputValue);
        }
      }
    });
  });
}

function getLocaion() {}
async function fecthdata() {
  const res = await fetch("./vaccine.json");
  data = await res.json();
  const resDistrict = await fetch("./district.json");
  districtData = await resDistrict.json();
  addlocationInput();
  for (var i = 0; i < data.length; i++) {
    markers.addLayer(
      L.marker([data[i].Lat, data[i].Long], { icon: greenIcon }).bindPopup(
        data[i].InfoWindowMessage
        // `<h3>${data[i].HospitalName}</h3>
        // <p class="ui header center aligned m-0 p-0">
        //  <div class="content p-0">
        //   <i class="circular inverted teal hospital outline icon"></i>
        //   ${data[i].Address}
        //  </div>
        // </p>
        // <p class="ui header center aligned m-0 p-0">
        //  <div class="content p-0">
        //   <i class="circular inverted orange phone  icon"></i>

        //   ${data[i].Phone}
        //  </div>
        // </p>
        // `
      )
    );
  }
  map.addLayer(markers);
}

fecthdata();
addAllEventLister();
addlocationInput();
