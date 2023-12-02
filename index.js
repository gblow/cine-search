var mainPage = document.querySelector('.main-page');
var mainPageBtn0 = document.getElementById('movie-btn'); 
var mainPageBtn1 = document.getElementById('tv-btn'); 
var genrePage = document.querySelector('.genre-page');
var streamingPage = document.querySelector('.streaming-page');
var resultsPage = document.querySelector('.results-page');
var resultsPageBtn = document.getElementById('results-btn');

function goToGenrePage() {
    mainPage.style.display = "none";
    genrePage.style.display = "block";
}
mainPageBtn0.addEventListener("click", goToGenrePage);
mainPageBtn1.addEventListener("click", goToGenrePage);

function goToResultsPage() {
    mainPage.style.display = "none";
    resultsPage.style.display = "block";
}
resultsPageBtn.addEventListener("click", goToResultsPage)
