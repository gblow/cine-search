// Global variables
var mainPage = document.querySelector('.main-page');
var moveOrTvBtn = document.getElementById('movie-btn');  
var genrePage = document.querySelector('.genre-page');
var streamingPage = document.querySelector('.streaming-page');
var resultsPage = document.querySelector('.results-page');
var prevResultsPage = document.querySelector('.prev-results-page')
var prevResultsPageBtn = document.getElementById('prev-results-btn');
const WatchmodeAPI = "39dYos0Qi4qs0M0lAYGP7u9WSIlEWozJJPhaLKHM"
var type = "";
var genreResults = "";
var selectedGenre = "";
var sourcesResults = "";
var surveyResults = {
    type: '', // Either tv or movie
    genre: '', // Selected genre
    streaming: '', // Streaming provider
};
var tmdbIds = []; // Array to store tmdb_id values

// Manipulates what page is visable in the window
// Displays the genre page
function goToGenrePage() {
    mainPage.style.display = "none";
    genrePage.style.display = "block";
}
    
            //  API call to gather the movie or tv show, genre, and streaming service data from WatchMode to be saved to the surveyResults object
            function displayResults() {
                var apiUrl = 'https://api.watchmode.com/v1/list-titles/?apiKey=39dYos0Qi4qs0M0lAYGP7u9WSIlEWozJJPhaLKHM&genre=' + surveyResults.genre + '&source_ids=' + surveyResults.streaming + "&types=" + surveyResults.type + "&sort_by=popularity_desc" + "&limit=20";
            
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
            
            // Allows the user to select different titles from the created list on the results page 
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

            // Saves the users selected titles to the local storage
            function saveSelectedTitlesToLocalStorage() {
                localStorage.setItem('selectedTitles', JSON.stringify(surveyResults.selectedTitles));
            }

            // Displays the saved items in the local storage to the Previous Results Page
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
        
            // API call that gathers trailer data from Kinocheck
            function fetchTrailer(tmdbId) {
                var apiUrl = '';
                console.log(type)
                if (type === 'movie'){
                    apiUrl = `https://api.kinocheck.de/movies?tmdb_id=${tmdbId}&language=en&categories=Trailer`;
                } else {
                    apiUrl = `https://api.kinocheck.de/shows?tmdb_id=${tmdbId}&language=en&categories=Trailer`;
                }
                

            
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
                            iframe.width = '250px';
                            iframe.height = '200px'; 
                            iframe.allowFullscreen = true;
            
                            // Append the iframe to the trailer container
                            trailerContainer.appendChild(iframe);
                        } else {
                           
   
                            let img = document.createElement('img');
                            img.src = './assets/image/noVideo.jpg';
                            // img.style.width = '100%';
                            img.style.height = '175px';
                            trailerContainer.appendChild(img);

                            console.error('No trailer data available for TMDB ID:', tmdbId);
                        }
                    })
                    .catch(error => {

                        const trailerContainer = document.querySelector('#video' + tmdbId);

                         let img = document.createElement('img');
                            img.src = './assets/image/noVideo.jpg';
                            // img.style.width = '100%';
                            img.style.height = '175px';
                            trailerContainer.appendChild(img);
                        console.error('Error fetching trailer because the chicken is running fast:', error);
                    });
            }

           
            
            // // Example usage:
            // const tmdbId =  // Replace with your actual TMDB ID
            // fetchTrailer(tmdbId);
            

    mainPage.addEventListener("click", function(event) {
    // They clicked on either movie or tv show, so store that selection
    console.log("event target is:", event.target);
    console.log("event target is:", event.target.getAttribute("data-type"));
    type = event.target.getAttribute("data-type");
    surveyResults.type = type;
    console.log("Survey results", surveyResults);

goToGenrePage();
});
moveOrTvBtn.addEventListener("click", goToGenrePage);


// Displays the streaming page
function goToStreamingPage() {
    mainPage.style.display = "none";
    genrePage.style.display = "none";
    streamingPage.style.display = "block";
}


//Genre page function and click listener
function fetchDataByGenre(genre) {
    var apiUrl = 'https://api.watchmode.com/v1/genres/?apiKey=39dYos0Qi4qs0M0lAYGP7u9WSIlEWozJJPhaLKHM'

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

// Uses even delegation to put an event listener on each button of the genre page
genrePage.addEventListener("click", function(event) {
    console.log("Genre that was clicked", event.target);
    console.log("Genre that was clicked", event.target.getAttribute("data-genre"));
    surveyResults.genre = event.target.getAttribute("data-genre");

    console.log("Survey results:", surveyResults);
    goToStreamingPage();
    selectedGenre = "";
    fetchDataByGenre(selectedGenre);
});

// Displays the results page
function goToResultsPage() {
    mainPage.style.display = "none";
    genrePage.style.display = "none";
    streamingPage.style.display = "none";
    resultsPage.style.display = "block";
    prevResultsPage.style.display = "none";
}

function fetchDataByStreaming(sources, selectedGenre) {
    var apiUrl = 'https://api.watchmode.com/v1/list-titles/?apiKey=39dYos0Qi4qs0M0lAYGP7u9WSIlEWozJJPhaLKHM&source_ids=203'

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


// Uses even delegation to put an event listener on each button of the streaming page
streamingPage.addEventListener("click", function(event) {
    console.log("streaming:", event.target.getAttribute('data-streaming'));
    console.log("streaming:", event.target.getAttribute('data-streaming'));
    var streaming = event.target.getAttribute('data-streaming');
    surveyResults.streaming = streaming;
    console.log("Survey results:", surveyResults);

    goToResultsPage();
    displayResults();

});


// Displays the Previous Results Page
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
