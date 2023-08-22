const form = document.querySelector(".top-banner form");

form.addEventListener("submit", e => {
    e.preventDefault();
    const inputVal = input.value;
});

const key = "48941932b211d38b0c233f257ad34560";
const inputVal = input.value;

const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}`;

fetch(url)
    .then(response => response.json())
    .then(data => {

    })
    .catch(() => {
        msg.textContent = "Invalid city";
    });