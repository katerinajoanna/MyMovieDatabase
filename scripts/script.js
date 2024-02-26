'use strict';

window.addEventListener('load', () => {
    console.log('load');
    //Förslagsvis anropar ni era funktioner som skall sätta lyssnare, rendera objekt osv. härifrån
    fetchTopMovies();
    setupCarousel();

});

//Denna funktion skapar funktionalitet för karusellen
function setupCarousel() {
    console.log('carousel');
    const buttons = document.querySelectorAll('[data-carousel-btn]');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const offset = btn.dataset.carouselBtn === 'next' ? 1 : -1;
            const slides = btn.closest('[data-carousel').querySelector('[data-slides');
            const activeSlide = slides.querySelector('[data-active]');
            let newIndex = [...slides.children].indexOf(activeSlide) + offset;

            if (newIndex < 0) {
                newIndex = slides.children.length - 1;
            } else if (newIndex >= slides.children.length) {
                newIndex = 0;
            }

            slides.children[newIndex].dataset.active = true;
            delete activeSlide.dataset.active;
        });
    });
}

//här lägger till search
let movieNameRef = document.querySelector('#searchInput');
let searchBtn = document.querySelector('#searchBtn');
let result = document.querySelector('#result');



searchBtn.onclick = function (event) {
    event.preventDefault();
    const input = movieNameRef.value;
    const url = `http://www.omdbapi.com/?t=${input}&apikey=4b7eec5b`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const resultsList = document.querySelector('#resultsList');

            const newMovie = document.createElement('li');
            newMovie.className = 'results__item';

            const poster = document.createElement('div');
            poster.className = 'movie-poster';
            poster.style.backgroundImage = `url(${data.Poster})`;

            const title = document.createElement('h3');
            title.className = 'movie-title';
            title.textContent = data.Title;

            const plot = document.createElement('p');
            plot.className = 'movie-plot';
            plot.textContent = data.Plot;

            const year = document.createElement('p');
            year.className = 'movie-year';
            year.textContent = `Year: ${data.Year}`;

            newMovie.appendChild(poster);
            newMovie.appendChild(title);
            newMovie.appendChild(plot);
            newMovie.appendChild(year);

            resultsList.appendChild(newMovie);
        })
        .catch((error) => {
            console.log(error);
        });
}


//Lägger till filmaffischer
async function fetchTopMovies() {
    try {
        const response = await fetch('http://santosnr6.github.io/Data/movies.json');
        const data = await response.json();
        console.log(data);

        renderTopMovies(data);
        renderTrailers(data);
    }
    catch (error) {
        console.log(error);
    }
}

function renderTrailers(movies) {

    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        const link = movies.splice(Math.floor(Math.random() * movies.length), 1)[0].trailer_link;
        iframe.src = link;
    })
}

function renderTopMovies(movies) {
    console.log(movies)
}

//här läg till poster,title,icon

function renderTopMovies(movies) {
    const popularCardContainer = document.querySelector('#popularCardContainer');
    //ändras genom att lägga till favorit
    const favoriteMovies = [];

    movies.forEach(movie => {
        const img = document.createElement('img');
        img.src = movie.poster;
        img.alt = movie.title;
        img.classList.add('movie-poster');

        const title = document.createElement('h3');
        title.textContent = movie.title;
        title.classList.add('movie-title');

        const star = document.createElement('div');
        star.classList.add('star-icon');
        star.innerHTML = '<i class="material-icons" style="font-size: 31px;">star</i>';
        star.addEventListener('click', function (event) {
            if (!event.target.classList.contains('isFavorite')) {
                console.log('favorit tillagd');
                event.target.classList.add('isFavorite');
                favoriteMovies.push(movie);
            } else {
                console.log('favorit borttagen');
                event.target.classList.remove('isFavorite');
                const index = favoriteMovies.findIndex(favMovie => favMovie.title === movie.title);
                favoriteMovies.splice(index, 1);
            }
            console.log(favoriteMovies); // Spara valda filmer
        });

        const container = document.createElement('article');
        container.classList.add('movie-container');
        container.appendChild(star);
        container.appendChild(title);
        container.appendChild(img);
        popularCardContainer.appendChild(container);

    })
}


document.querySelector("#favorites").classList.remove("d-none");
//document.querySelector("#closeFavorites").addEventListener("click", function () {
//   document.querySelector("#favorites").classList.add("d-none");
//});



function setupFavorites() {
    const favBtn = document.querySelector('#favBtn');
    const favorites = document.querySelector('#favorites');
    const closeBtn = document.querySelector('#closeFavorites');

    favBtn.addEventListener('click', () => {
        renderFavorites();
        favorites.classList.remove('d-none');
    });

    closeBtn.addEventListener('click', () => {
        favorites.classList.add('d-none');
    });
}


//Renderar favorita filmer
function renderFavorites() {
    const favoriteMoviesContainer = document.querySelector('#favoriteMovies');
    favoriteMoviesContainer.innerHTML = '';

    favoriteMovies.forEach(movie => {
        const img = document.createElement('img');
        img.src = movie.poster;
        img.alt = movie.title;
        img.classList.add('movie-poster');

        const title = document.createElement('h3');
        title.textContent = movie.title;
        title.classList.add('movie-title');

        const container = document.createElement('article');
        container.classList.add('movie-container');
        container.appendChild(title);
        container.appendChild(img);
        container.appendChild(imdbid);
        container.appendChild();
        container.appendChild();
        favoriteMoviesContainer.appendChild(container);
        console.log(container)
    });
}

fetchTopMovies()
    .then(() => {
        setupFavorites();

    });