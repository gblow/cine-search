const wikiAPIKey = "6e5f803bd59e151c8d9173f058396cb9";
const wmAPIKey = "cokcLMHE2H1fuhy7JrUfLRhE81oeqANAcPdOEOzp";
var mainPage = document.getElementById("main-page");
var genrePage = document.getElementById("genre-page");
var movieSel = document.getElementById("movie-btn");
var tvSel = document.getElementById("tv-btn");
var action = document.querySelector("#action-btn");
var horror = document.querySelector("#horror-btn");
var scifi = document.querySelector("#scifi-btn");
var rom = document.querySelector("#rom-btn");
var com = document.querySelector("#com-btn");
var kids = document.querySelector("#kids-btn");

movieSel.addEventListener("click", function() {
    mainPage.style.display = "none";
    genrePage.style.display = "block";
})

tvSel.addEventListener("click", function() {
    mainPage.style.display = "none";
    genrePage.style.display = "block";
});