var mainPage = document.querySelector('.main-page');
var mainPageBtn0 = document.getElementById('movie-btn'); 
var mainPageBtn1 = document.getElementById('tv-btn'); 
var genrePage = document.querySelector('.genre-page');
var streamingPage = document.querySelector('.streaming-page');
var resultsPage = document.querySelector('.results-page');
var prevResultsPageBtn = document.getElementById('prev-results-btn');
const WatchmodeAPI = "cokcLMHE2H1fuhy7JrUfLRhE81oeqANAcPdOEOzp"
const WikiAPI = "6e5f803bd59e151c8d9173f058396cb9"
var type = "";



var genrePageBtn0 = document.getElementById("action-btn");
var genrePageBtn1 = document.getElementById("horror-btn");
var genrePageBtn2 = document.getElementById("scifi-btn");
var genrePageBtn3 = document.getElementById("rom-btn");
var genrePageBtn4 = document.getElementById("com-btn");
var genrePageBtn5 = document.getElementById("kids-btn");
var genreResults = "";
var selectedGenre = "";

var streamingPageBtn0 = document.getElementById('netflix-btn'); 
var streamingPageBtn1 = document.getElementById('max-btn'); 
var streamingPageBtn2 = document.getElementById('hulu-btn'); 
var streamingPageBtn3 = document.getElementById('amazon-btn'); 
var streamingPageBtn4 = document.getElementById('vudu-btn'); 
var streamingPageBtn5 = document.getElementById('paramount-btn'); 
var streamingPageBtn6 = document.getElementById('apple-btn'); 
var streamingPageBtn7 = document.getElementById('disney-btn'); 
var streamingPageBtn8 = document.getElementById('peacock-btn'); 
var sourcesResults = "";




function goToGenrePage() {
    mainPage.style.display = "none";
    genrePage.style.display = "block";
}

// Main page function and click listener
function fetchDataByType(type) {
    var apiUrl1 = 'https://api.watchmode.com/v1/autocomplete-search/?apiKey=cokcLMHE2H1fuhy7JrUfLRhE81oeqANAcPdOEOzp&search_value=&search_type=3'

    fetch(apiUrl1)
        .then(response => response.json())
        .then(data => {
            for(var i = 0; i < data.length; i++) {
                if(type === data[i].name) {
                    typeResults = data[i];
                }
            }
            console.log(typeResults)
        })
        .catch(error => {
            console.error('Error:', error);
        })
}

mainPageBtn0.addEventListener("click", function() {
    goToGenrePage();
    fetchDataByType("Movie")
});
mainPageBtn1.addEventListener("click", goToGenrePage);



function goToStreamingPage() {
    mainPage.style.display = "none";
    genrePage.style.display = "none";
    streamingPage.style.display = "block";
}


//Genre page function and click listener
function fetchDataByGenre(genre) {
    var apiUrl = 'https://api.watchmode.com/v1/genres/?apiKey=cokcLMHE2H1fuhy7JrUfLRhE81oeqANAcPdOEOzp'

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(`data for ${genre}:`, data);
            for(var i = 0; i < data.length; i++) {
                if(genre === data[i].name) {
                    genreResults = data[i];
                }
            }
            console.log(genreResults);
        })
        .catch(error => {
            console.error('Error:', error);
        })
}


genrePageBtn0.addEventListener("click", function(){
    goToStreamingPage();
    selectedGenre = "Action";
    fetchDataByGenre(selectedGenre);
});
genrePageBtn1.addEventListener("click", function(){
    goToStreamingPage();
    selectedGenre = "Horror";
    fetchDataByGenre(selectedGenre);
});
genrePageBtn2.addEventListener("click", function(){
    goToStreamingPage();
    selectedGenre = "Sci-Fi & Fantasy";
    fetchDataByGenre(selectedGenre);
});
genrePageBtn3.addEventListener("click", function(){
    goToStreamingPage();
    selectedGenre = "Romance";
    fetchDataByGenre(selectedGenre);
});
genrePageBtn4.addEventListener("click", function(){
    goToStreamingPage();
    selectedGenre = "Comedy";
    fetchDataByGenre(selectedGenre);
});
genrePageBtn5.addEventListener("click", function(){
    goToStreamingPage();
    selectedGenre = "Kids";
    fetchDataByGenre(selectedGenre);
});


//Streaming page function and click listener

function goToResultsPage() {
    mainPage.style.display = "none";
    genrePage.style.display = "none";
    streamingPage.style.display = "none";
    resultsPage.style.display = "block";
}

function fetchDataByStreaming(sources, selectedGenre) {
    var apiUrl = 'https://api.watchmode.com/v1/list-titles/?apiKey=cokcLMHE2H1fuhy7JrUfLRhE81oeqANAcPdOEOzp&source_ids=203'

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            var filteredResults = [];
            // console.log(`data for ${sourcesResults}:`, data);
            for(var i = 0; i < data.length; i++) {
                if(sources === data[i].name && selectedGenre === data[i].genre) {
                    filteredResults.push(data[i]);
                }
            }
            console.log(filteredResults)
        })
        .catch(error => {
            console.error('Error:', error);
        })
}

streamingPageBtn0.addEventListener("click", function() {
    goToResultsPage();
    fetchDataByStreaming("Netflix", selectedGenre);
});
streamingPageBtn1.addEventListener("click", function() {
    goToResultsPage();
    fetchDataByStreaming("Max", selectedGenre);
});
streamingPageBtn2.addEventListener("click", function() {
    goToResultsPage();
    fetchDataByStreaming("Hulu", selectedGenre);
});
streamingPageBtn3.addEventListener("click", function() {
    goToResultsPage();
    fetchDataByStreaming("Amazon Prime", selectedGenre);
});
streamingPageBtn4.addEventListener("click", function() {
    goToResultsPage();
    fetchDataByStreaming("Vudu", selectedGenre);
});
streamingPageBtn5.addEventListener("click", function() {
    goToResultsPage();
    fetchDataByStreaming("Paramount", selectedGenre);
});
streamingPageBtn6.addEventListener("click", function() {
    goToResultsPage();
    fetchDataByStreaming("AppleTV", selectedGenre);
});
streamingPageBtn7.addEventListener("click", function() {
    goToResultsPage();
    fetchDataByStreaming("Disney+", selectedGenre);
});
streamingPageBtn8.addEventListener("click", function() {
    goToResultsPage();
    fetchDataByStreaming("Peacock", selectedGenre);
});

function goToResultsPage2() {
    mainPage.style.display = "none";
    genrePage.style.display = "none";
    streamingPage.style.display = "none";
    resultsPage.style.display = "block";
}
prevResultsPageBtn.addEventListener("click", goToResultsPage2)

let url = 'https://api.watchmode.com/v1/list-titles/?apiKey='+WatchmodeAPI+"&movies&tv_series";
// let url = 'https://api.watchmode.com/v1/sources/?apiKey='+WatchmodeAPI
fetch(url, { method: 'Get' })
    .then((res) => res.json())
    .then((json) => {
        console.log(json);
    });

    // Fill out form get type, genre, and source
    // Using genre api get the genre id from the genre data array, loop through data from genre api find matching genre and grab it's id
    // Using sources api get the source id that matches the selected source, loop through data from sources api find matching source and grab it's id
    // construct url with type genre id and source id and send api request to get data

