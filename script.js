let temp = document.querySelector('.temp');
let city = document.querySelector('.city');
let humidity = document.querySelector('.humidity');
let wind = document.querySelector('.wind');
let weatherIcon = document.querySelector('.weather-icon');
let condition = document.querySelector('#condition');
let searchbtn = document.querySelector('#searchbtn');
let searchbox = document.querySelector('#searchbox');
let error = document.querySelector('.error');
// https://api.openweathermap.org/data/2.5/weather?q=Mumbai&units=metric&appid=95ec049f3c03a67623b184e7d121f2d9

const url = 'https://api.openweathermap.org/data/2.5/weather?&units=metric';

const apiKey = '95ec049f3c03a67623b184e7d121f2d9';
let place = 'Mumbai';

async function checkWeather() {
    // console.log(temp,city,humidity,wind,weatherIcon);
    // console.log(url+`&q=${place}`+`&appid=${apiKey}`);
    let apiCall = await fetch(url+`&q=${place}`+`&appid=${apiKey}`);
    if (apiCall.status==404) {
        // alert('Invalid city, check the spelling.')
        error.innerHTML='Invalid city, check the spelling.'
        error.style.display='block';
    }
    else{
        error.style.display='none';
        let response = await apiCall.json();
        condition.innerHTML=response.weather[0].main;
        city.innerHTML=place;
        temp.innerHTML=Math.ceil(response.main.temp)+'°c';
        humidity.innerHTML=response.main.humidity+'%';
        wind.innerHTML=Math.ceil(response.wind.speed*3.6)+' km/h';
        weatherIcon.src='images/'+ response.weather[0].main.toLowerCase()+'.png';
        console.log(response);
    }
}

checkWeather();

function getData() {
    // console.log(searchbox.value);  
    place=searchbox.value.trim();

    if (place==='') {
        error.innerHTML='Enter a city.';
        error.style.display='block';
        // alert('Please enter a city.');
    }
    else{
        error.style.display='none';
        checkWeather();  
    }
}

searchbtn.addEventListener('click', getData); 

// making enter to search 
searchbox.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      getData();
      searchbox.blur(); // this will close the Android keyboard

    }
  });