var mainPage = document.querySelector('.main-page');
var mainPageBtn0 = document.getElementById('movie-btn'); 
var mainPageBtn1 = document.getElementById('tv-btn'); 
var genrePage = document.querySelector('.genre-page');
var streamingPage = document.querySelector('.streaming-page');
var resultsPage = document.querySelector('.results-page');
var prevResultsPageBtn = document.getElementById('prev-results-btn');
const WatchmodeAPI = "cokcLMHE2H1fuhy7JrUfLRhE81oeqANAcPdOEOzp"
const WikiAPI = "6e5f803bd59e151c8d9173f058396cb9"
=======



var genrePageBtn0 = document.getElementById("action-btn");
var genrePageBtn1 = document.getElementById("horror-btn");
var genrePageBtn2 = document.getElementById("scifi-btn");
var genrePageBtn3 = document.getElementById("rom-btn");
var genrePageBtn4 = document.getElementById("com-btn");
var genrePageBtn5 = document.getElementById("kids-btn");


var streamingPageBtn0 = document.getElementById('netflix-btn'); 
var streamingPageBtn1 = document.getElementById('max-btn'); 
var streamingPageBtn2 = document.getElementById('hulu-btn'); 
var streamingPageBtn3 = document.getElementById('amazon-btn'); 
var streamingPageBtn4 = document.getElementById('vudu-btn'); 
var streamingPageBtn5 = document.getElementById('paramount-btn'); 
var streamingPageBtn6 = document.getElementById('apple-btn'); 
var streamingPageBtn7 = document.getElementById('disney-btn'); 
var streamingPageBtn8 = document.getElementById('peacock-btn'); 



// function showMainPage() {
//     mainPage.classList.add('visible');
//     genrePage.classList.remove('visible');
//     streamingPage.classList.remove('visible');
//     resultsPage.classList.remove('visible');
// }

// function showGenrePage() {
//     mainPage.classList.remove('visible');
//     genrePage.classList.add('visible');
//     streamingPage.classList.remove('visible');
//     resultsPage.classList.remove('visible');
// }

// function showStreamingPage() {
//     mainPage.classList.remove('visible');
//     genrePage.classList.remove('visible');
//     streamingPage.classList.add('visible');
//     resultsPage.classList.remove('visible');
// }

// function showResultsPage() {
//     mainPage.classList.remove('visible');
//     genrePage.classList.remove('visible');
//     streamingPage.classList.remove('visible');
//     resultsPage.classList.add('visible');
// }

// mainPageBtn0.addEventListener('click', showGenrePage);
// mainPageBtn1.addEventListener('click', showGenrePage);
// genrePageBtn0.addEventListener('click', function() {
//     showStreamingPage();
//     fetchDataByGenre('Action');
// });


function goToGenrePage() {
    mainPage.style.display = "none";
    genrePage.style.display = "block";
}
mainPageBtn0.addEventListener("click", goToGenrePage);
mainPageBtn1.addEventListener("click", goToGenrePage);


function goToStreamingPage() {
    mainPage.style.display = "none";
    genrePage.style.display = "none";
    streamingPage.style.display = "block";
}



function fetchDataByGenre(genre) {
    var apiUrl = 'https://api.watchmode.com/v1/genres/?apiKey=cokcLMHE2H1fuhy7JrUfLRhE81oeqANAcPdOEOzp'

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(`data for ${genre}:`, data);
        })
        .catch(error => {
            console.error('Error:', error);
        })
}

//Genre page function and click listener
genrePageBtn0.addEventListener("click", function(){
    goToStreamingPage();
    fetchDataByGenre("Action")
});
genrePageBtn1.addEventListener("click", function(){
    goToStreamingPage()
    fetchDataByGenre("Horror")
});
genrePageBtn2.addEventListener("click", function(){
    goToStreamingPage()
    fetchDataByGenre("SciFi/Fantasy")
});
genrePageBtn3.addEventListener("click", function(){
    goToStreamingPage()
    fetchDataByGenre("Romance")
});
genrePageBtn4.addEventListener("click", function(){
    goToStreamingPage()
    fetchDataByGenre("Comedy")
});
genrePageBtn5.addEventListener("click", function(){
    goToStreamingPage()
    fetchDataByGenre("Kids/Animation")
});


//Streaming page function and click listener

function goToResultsPage() {
    mainPage.style.display = "none";
    genrePage.style.display = "none";
    streamingPage.style.display = "none";
    resultsPage.style.display = "block";
}

streamingPageBtn0.addEventListener("click", goToResultsPage);
streamingPageBtn1.addEventListener("click", goToResultsPage);
streamingPageBtn2.addEventListener("click", goToResultsPage);
streamingPageBtn3.addEventListener("click", goToResultsPage);
streamingPageBtn4.addEventListener("click", goToResultsPage);
streamingPageBtn5.addEventListener("click", goToResultsPage);
streamingPageBtn6.addEventListener("click", goToResultsPage);
streamingPageBtn7.addEventListener("click", goToResultsPage);
streamingPageBtn8.addEventListener("click", goToResultsPage);

function goToResultsPage2() {
    mainPage.style.display = "none";
    genrePage.style.display = "none";
    streamingPage.style.display = "none";
    resultsPage.style.display = "block";
}
prevResultsPageBtn.addEventListener("click", goToResultsPage2)

