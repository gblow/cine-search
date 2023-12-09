var mainPage = document.querySelector('.main-page');
var moveOrTvBtn = document.getElementById('movie-btn');  
var genrePage = document.querySelector('.genre-page');
var streamingPage = document.querySelector('.streaming-page');
var resultsPage = document.querySelector('.results-page');
var prevResultsPage = document.querySelector('.prev-results-page')
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
var tmdbIds = []; // Array to store tmdb_id values


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
            console.log("apiData", data);

            var firstColumnUl = document.querySelector('#result-col .column:first-child ul');
            var secondColumnUl = document.querySelector('#result-col .column:last-child ul');
            firstColumnUl.innerHTML = '';
            secondColumnUl.innerHTML = '';
            tmdbIds = [];

           

            for (var i = 0; i < data.titles.length; i++) {
                var li = document.createElement('li');
                li.textContent = data.titles[i].title;
                firstColumnUl.appendChild(li);

                // Store tmdb_id in the array
                tmdbIds.push(data.titles[i].tmdb_id);
                var li2 = document.createElement('li');
                li2.setAttribute("id", "video" + data.titles[i].tmdb_id)
                secondColumnUl.appendChild(li2);
            }

                console.log("your IDs are", tmdbIds);


                    //variable tmdbIds that contains the TMDB IDs from the displayed titles
                    console.log('tmdbIdsArray:', tmdbIds);
                    tmdbIds.forEach(function(tmdbId) {
                        fetchTrailer(tmdbId);
                    });
                        
                    }) 
                
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
            
            // 
            function handleTitleClick() {
                var clickedListItem = event.target;
                clickedListItem.classList.toggle('selected');
                
                var selectedTitleId = clickedListItem.textContent;
                if (surveyResults.selectedTitles.includes(selectedTitleId)) {
                    surveyResults.selectedTitles = surveyResults.selectedTitles.filter(id => id !== selectedTitleId);
                } else {
                    surveyResults.selectedTitles.push(selectedTitleId);
                }
                saveSelectedTitlesToLocalStorage();
                displaySelectedTitles()
            }


            surveyResults.selectedTitles = [];

            function saveSelectedTitlesToLocalStorage() {
                localStorage.setItem('selectedTitles', JSON.stringify(surveyResults.selectedTitles));
            }

            function loadSelectedTitlesFromLocalStorage() {
                var storedTitles = localStorage.getItem('selectedTitles');
                if (storedTitles) {
                    surveyResults.selectedTitles = JSON.parse(storedTitles);
                    displaySelectedTitles();
                }
            }

            // Displays the selected titles to the previous results page with a button option next to each title.
            // The button has the capability to remove the title from the list.
            function displaySelectedTitles() {
                var prevResultsList = document.getElementById('previous-results-list');
                prevResultsList.innerHTML = '';

                surveyResults.selectedTitles.forEach(function(title) {
                    var li = document.createElement('li');
                    var titleText = document.createTextNode(title);
                    li.appendChild(titleText);

                    var removeBtn = document.createElement('button');
                    removeBtn.textContent = 'Watched';
                    removeBtn.addEventListener('click', function() {
                        removeTitle(title);
                    });

                    li.appendChild(removeBtn);
                    prevResultsList.appendChild(li);
                })
            }

            // Removes title from the saved list and updates the new list to the local storage
            function removeTitle(title) {
                surveyResults.selectedTitles = surveyResults.selectedTitles.filter(t => t !== title);
                saveSelectedTitlesToLocalStorage();
                displaySelectedTitles();
            }
            
            loadSelectedTitlesFromLocalStorage();
            displaySelectedTitles();

            document.getElementById('result-col').addEventListener('click', function(event) {
                if (event.target.tagName === 'LI') {
                    handleTitleClick.call(event);
                }
            });
        

            function fetchTrailer(tmdbId) {
                var apiUrl = '';
                console.log(type)
                if (type === 'movie'){
                    apiUrl = `https://api.kinocheck.de/movies?tmdb_id=${tmdbId}&language=en&categories=Trailer`;
                } else {
                    apiUrl = `https://api.kinocheck.de/shows?tmdb_id=${tmdbId}&language=en&categories=Trailer`;
                }
                

            function fetchTrailer(tmdbId) {
                const apiUrl = `https://api.kinocheck.de/movies?tmdb_id=${tmdbId}&language=en&categories=Trailer`;

            
                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        const trailerContainer = document.querySelector('#video' + tmdbId);
                        // Check if the response contains trailer data
                        if (data.trailer) {
                            var youtubeId = data.trailer.youtube_video_id;
                            const trailerUrl = 'https://www.youtube.com/embed/' + youtubeId;
            
                            // Assuming you have an element in column 2 where you want to embed the trailer
                            
            
                            // Clear previous content
                            trailerContainer.innerHTML = '';
            
                            // Create an iframe element to embed the trailer
                            const iframe = document.createElement('iframe');
                            iframe.src = trailerUrl;
                            iframe.width = '100%';
                            iframe.height = '100'; 
                            iframe.allowFullscreen = true;
            
                            // Append the iframe to the trailer container
                            trailerContainer.appendChild(iframe);
                        } else {
                           
   
                            let img = document.createElement('img');
                            img.src = './assets/noVideo.png';
                            img.style.width = '400px';
                            img.style.height = '100';
                            trailerContainer.appendChild(img);

                            console.error('No trailer data available for TMDB ID:', tmdbId);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching trailer:', error);
                    });
            }

           
            
            // // Example usage:
            // const tmdbId =  // Replace with your actual TMDB ID
            // fetchTrailer(tmdbId);
            

    mainPage.addEventListener("click", function(event) {
    // They clicked on either move or tv show, so store that selection
    console.log("event target is:", event.target);
    console.log("event target is:", event.target.getAttribute("data-type"));
    type = event.target.getAttribute("data-type");
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
    prevResultsPage.style.display = "none";
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
    console.log("streaming:", event.target.getAttribute('data-streaming'));
    var streaming = event.target.getAttribute('data-streaming');
    surveyResults.streaming = streaming;
    console.log("Survey results:", surveyResults);

    goToResultsPage();
    displayResults();

});



//@TODO: Still have to save to local storage in the previous results page.

function goToResultsPage2() {
    console.log("Going to Results Page 2");
    mainPage.style.display = "none";
    genrePage.style.display = "none";
    streamingPage.style.display = "none";
    resultsPage.style.display = "none";
    prevResultsPage.style.display = "block"
}

// button to navingate to the prev results
prevResultsPageBtn.addEventListener("click", function() {
    if (prevResultsPageBtn.textContent === 'View Previous Results') {
        goToResultsPage2();
        prevResultsPageBtn.textContent = 'Back to Results';
    } else {
        goToResultsPage();
        prevResultsPageBtn.textContent = 'View Previous Results';
    }
})

//  button to navigate back to the results page
document.getElementById('back-to-results-btn').addEventListener('click', function() {
    goToResultsPage(); 
});

