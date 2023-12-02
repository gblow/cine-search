const wikiAPIKey = "6e5f803bd59e151c8d9173f058396cb9";
const wmAPIKey = "cokcLMHE2H1fuhy7JrUfLRhE81oeqANAcPdOEOzp";
var mainPage = document.getElementById("main-page");
var genrePage = document.getElementById("genre-page");
var movieSel = document.getElementById("movie-btn");
var tvSel = document.getElementById("tv-btn");
var action = document.getElementById("action-btn");
var horror = document.getElementById("horror-btn");
var scifi = document.getElementById("scifi-btn");
var rom = document.getElementById("rom-btn");
var com = document.getElementById("com-btn");
var kids = document.getElementById("kids-btn");

// Sends the user to the genre page
movieSel.addEventListener("click", function() {
    mainPage.style.display = "none";
    genrePage.style.display = "block";
})

tvSel.addEventListener("click", function() {
    mainPage.style.display = "none";
    genrePage.style.display = "block";
});

function makeAPICallAndNav(genre) {
    var wmURL = `'https://api.watchmode.com/v1/sources/?apiKey=cokcLMHE2H1fuhy7JrUfLRhE81oeqANAcPdOEOzp'`;

    fetch(wmURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Error", error);
        })
        window.location.href = "#streaming-page";
}

action.addEventListener("click", function() {
    makeAPICallAndNav("Action");
})
horror.addEventListener("click", function() {
    makeAPICallAndNav("Horror");
})
scifi.addEventListener("click", function() {
    makeAPICallAndNav("Scifi");
})
rom.addEventListener("click", function() {
    makeAPICallAndNav("Romance");
})
com.addEventListener("click", function() {
    makeAPICallAndNav("Comedy");
})
kids.addEventListener("click", function() {
    makeAPICallAndNav("Kids/Animation");
})
