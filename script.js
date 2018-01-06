const omdbAPI = "https://www.omdbapi.com/?apikey=7344e22a&t=";
const xhr = new XMLHttpRequest();
const theList = document.getElementById('theList');
const searchButton = document.getElementById("searchButton");
const searchText = document.getElementById("searchText");

const getMovieData = (event) => {
    let theTitle = "Star Wars";
    let fullURL = encodeURI(omdbAPI + theTitle);  
    xhrRequest(fullURL, movieHandler);
    event.preventDefault();
}

const xhrRequest = (url, eventHandler) => {
    xhr.open("GET", url, true);
    //Maybe this should be onReadyStateChange
    xhr.onload = eventHandler;
    xhr.send();
    xhr.onerror = () => {
        //There was a connection error of some sort
    };
}

const movieHandler = (event) => {
    if (xhr.status >= 200 && xhr.status < 400) {
        let data = JSON.parse(xhr.responseText);
        Object.getOwnPropertyNames(data).sort().map((v, i, a) => {
            let textNode = document.createTextNode(v + ' → ' + data[v]);
            let li = document.createElement("LI");
            li.appendChild(textNode);
            theList.appendChild(li);
        });
    } else {
        console.log(xhr.status);
    }
}

searchButton.addEventListener("click", (event) => {
    if (searchText.validity.valueMissing) {
        searchText.setCustomValidity("Please enter the title of a movie.");
        event.preventDefault();
    } /*else {
        searchText.setCustomValidity("");
    }*/
});

searchButton.addEventListener("click", getMovieData);