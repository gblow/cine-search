var mainPage = document.querySelector('.main-page');
var moveOrTvBtn = document.getElementById('movie-btn'); 
// var mainPageBtn1 = document.getElementById('tv-btn'); 
var genrePage = document.querySelector('.genre-page');
var streamingPage = document.querySelector('.streaming-page');
var resultsPage = document.querySelector('.results-page');
var prevResultsPageBtn = document.getElementById('prev-results-btn');
const WatchmodeAPI = "cokcLMHE2H1fuhy7JrUfLRhE81oeqANAcPdOEOzp"
const WikiAPI = "6e5f803bd59e151c8d9173f058396cb9"
var type = "";
var genreResults = "";
var selectedGenre = "";
var sourcesResults = "";
var surveyResults = {
    type: '', // either tv or move
    genre: '',
    streaming: '', // Streaming provider
};



function goToGenrePage() {
    mainPage.style.display = "none";
    genrePage.style.display = "block";
}

// Actually show the results (in a different function maybe?)
    // @TODO: move this into a separate function
    
            // @TODO: 
            // You have the movies back in data, filtered by genre, streaming provider, etc.
            // Now you actually display this on the page


            function displayResults() {
                var apiUrl = 'https://api.watchmode.com/v1/list-titles/?apiKey=cokcLMHE2H1fuhy7JrUfLRhE81oeqANAcPdOEOzp&genre=' + surveyResults.genre + '&source_ids=' + surveyResults.streaming + "&types=" + surveyResults.type + "&sort_by=popularity_desc" + "&limit=20";
            
                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        console.log ("apiData",data)
            
                        var firstColumnUl = document.querySelector('#result-col .column:first-child ul');
                        firstColumnUl.innerHTML = '';

                        for (var i = 0; i < data.titles.length; i++) {
                            var li = document.createElement('li');
                            li.textContent = data.titles[i].title;
                            firstColumnUl.appendChild(li);
                        }
                    }) 
                
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
            

mainPage.addEventListener("click", function(event) {
    // They clicked on either move or tv show, so store that selection
    console.log("event target is:", event.target);
    console.log("event target is:", event.target.getAttribute("data-type"));
    var type = event.target.getAttribute("data-type");
    surveyResults.type = type;
    console.log("Survey results", surveyResults);

goToGenrePage();
});
moveOrTvBtn.addEventListener("click", goToGenrePage);



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


// Use event delegation, using this will help you need less query selectors (because you don't need a selector for each btn)
// And will make your life easier, as you also will only need one event listener.
genrePage.addEventListener("click", function(event) {
    // You're gonna have access to the button that was clicked. So use some data-attribute to get the genre that was clicked
    console.log("Genre that was clicked", event.target);
    console.log("Genre that was clicked", event.target.getAttribute("data-genre"));
    surveyResults.genre = event.target.getAttribute("data-genre");

    console.log("Survey results:", surveyResults);
    goToStreamingPage();
    selectedGenre = "";
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


// Use event delegation, using this will help you need less query selectors (because you don't need a selector for each btn)
// And will make your life easier, as you also will only need one event listener.

streamingPage.addEventListener("click", function(event) {
    console.log("streaming:", event.target.getAttribute('data-streaming'));
    // console.log(event.target.data);
    var streaming = event.target.getAttribute('data-streaming');
    surveyResults.streaming = streaming;
    console.log("Survey results:", surveyResults);

    goToResultsPage();
    displayResults();
})


//@TODO: Still have to save to local storage in the previous results page.

function goToResultsPage2() {
    mainPage.style.display = "none";
    genrePage.style.display = "none";
    streamingPage.style.display = "none";
    resultsPage.style.display = "block";
}

prevResultsPageBtn.addEventListener("click", goToResultsPage2)


    // Fill out form get type, genre, and source
    // Using genre api get the genre id from the genre data array, loop through data from genre api find matching genre and grab it's id
    // Using sources api get the source id that matches the selected source, loop through data from sources api find matching source and grab it's id
    // construct url with type genre id and source id and send api request to get data

    // Main page function and click listener
