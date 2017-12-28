const omdbAPI = "https://www.omdbapi.com/?apikey=7344e22a&t=";
const xhr = new XMLHttpRequest();

const getMovieData = () => {
    let theTitle = prompt("Please enter the title of a movie.");
    let fullURL = encodeURI(omdbAPI + theTitle);
    const theList = document.getElementById('theList');
    xhrRequest(fullURL, movieHandler);
}

const xhrRequest = (url, eventHandler) => {
    xhr.open("GET", url, true);
    xhr.onload = eventHandler;
    xhr.send();
    xhr.onerror = () => {
        //There was a connection error of some sort
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
        console.log(xhr.status);
    }
}

const searchText = document.getElementById("searchText");
searchText.addEventListener("input", (event) => {
    if (searchText.validity.valueMissing) {
        searchText.setCustomValidity("Please enter the title of a movie.");
    } else {
        searchText.setCustomValidity("");
    }
});

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", getMovieData);