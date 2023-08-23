const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

const key = "48941932b211d38b0c233f257ad34560";

form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;

    const listItems = list.querySelectorAll(".ajax-section .city");
    const listItemsArr = Array.from(listItems);

    if(listItemsArr.length > 0){
        const filteredArr = listItemsArr.filter(el => {
            let content = "";
            if(inputVal.includes(",")){
                if(inputVal.split(",")[1].length > 2){
                    inputVal = inputVal.split(",")[0];
                    content = el.querySelector(".city-name span").textContent.toLowerCase();
                }
                else{
                    content = el.querySelector(".city-name").dataset.name.toLowerCase();
                }
            }
            else{
                content = el.querySelector(".city-name span").textContent.toLowerCase();
            }
            return content == inputVal.toLowerCase();
        });
        
        if(filteredArr.length > 0){
            msg.textContent = "City present already, if not provide country code as well";
            form.reset();
            input.focus();
            return;
        }
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${key}&units=imperial`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const {main, name, sys, weather} = data;
        const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

        const li = document.createElement('li');
        li.classList.add("city");

        const markup = `<h2 class = "city-name" data-name = "${name},${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
        </h2>
        <div class = "city-temp">${Math.round(main.temp)}<sup>F</sup>
        </div>
        <figure>
        <img class = "city-icon" src=${icon} alt=${weather[0]["main"]}>
        <figcaption>${weather[0]["description"]}</figcaption>
        </figure>`;

        li.innerHTML = markup;
        list.appendChild(li);
    })
    .catch(() => {
        msg.textContent = "Invalid city";
    });

    msg.textContent = "";
    form.reset();
    input.focus();
});


