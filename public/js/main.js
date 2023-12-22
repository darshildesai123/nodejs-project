const cityName = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");
const city_name = document.getElementById("city_name");
const temp_status = document.getElementById("temp_status");
const temp_real_val = document.getElementById("temp_real_val");

const hide = document.querySelector(".middle_layer");

const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;

  if (cityVal === "") {
    city_name.innerText = `Plz write the name before search`;
    hide.classList.add("data_hide");
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=31d3daf551327695b41907c275902b33`;
      const response = await fetch(url);
      const data = await response.json();
      const arrData = [data];
      temp_real_val.innerText = arrData[0].main.temp;
      city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
      const tempMod = arrData[0].weather[0].main;

      // condition to check sunny and cloudy

      if (tempMod == "Clear") {
        temp_status.innerHTML =
          "<i class= 'fa-solid fa-sun' style='color: #eccc68;'></i>";
      } else if (tempMod == "Cloud") {
        temp_status.innerHTML =
          "<i class= 'fa-solid fa-cloud' style='color: #f1f2f6;'></i>";
      } else if (tempMod == "Rain") {
        temp_status.innerHTML =
          "<i class= 'fa-solid fa-rain' style='color: #a4b0be;'></i>";
      } else {
        temp_status.innerHTML =
          "<i class= 'fa-solid fa-sun' style='color: #eccc68;'></i>";
      }
      hide.classList.remove("data_hide");
    } catch {
      city_name.innerText = `Plz enter the city name properly`;
      hide.classList.add("data_hide");
    }
  }
};

submitBtn.addEventListener("click", getInfo);
