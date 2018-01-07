const xhr = new XMLHttpRequest();
const theList = document.getElementById('theList');
const searchButton = document.getElementById("searchButton");
const searchText = document.getElementById("searchText");

const getMovieData = () => {
    let fullURL = encodeURI("https://www.omdbapi.com/?apikey=7344e22a&t=" + searchText.value);  
    xhrRequest(fullURL, movieHandler);
}

const xhrRequest = (url, eventHandler) => {
    xhr.open("GET", url, true);
    xhr.onreadystatechange = eventHandler;
    xhr.send();
    xhr.onerror = () => {
        console.log(`Request failed: ${xhr.status}`);
    };
}

const movieHandler = () => {
    if (xhr.status >= 200 && xhr.status < 400) {
        let data = JSON.parse(xhr.responseText);
        Object.getOwnPropertyNames(data).sort().map((v, i, a) => {
            let textNode = document.createTextNode(v + ' → ' + data[v]);
            let li = document.createElement("LI");
            li.appendChild(textNode);
            theList.appendChild(li);
        });
    } else {
        console.log(`Request failed: ${xhr.status}`);
    }
}

/*
const errorHandler = (event) => {
    if (searchText.validity.valueMissing) {
        searchText.setCustomValidity("Please enter the title of a movie.");
        event.preventDefault();
    } else {
        searchText.setCustomValidity("");
    }
}

searchButton.addEventListener("click", errorHandler);
*/

searchText.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {searchButton.click()}
});

searchButton.addEventListener("click", getMovieData);