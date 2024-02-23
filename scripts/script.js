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


//Läger till filmaffischer
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
    //tu modyfikuje dodajac favorit
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
        star.addEventListener('click', function () {
            if (star.style.color !== '#ffb92a') {
                star.style.color = '#ffb92a';
                favoriteMovies.push(movie);
            } else {
                star.style.color = '#ffb92a';
                const index = favoriteMovies.findIndex(favMovie => favMovie.title === movie.title);
                favoriteMovies.splice(index, 1);
            }
            console.log(favoriteMovies); // Zapisz zaznaczone filmy
        });

        const container = document.createElement('article');
        container.classList.add('movie-container');
        container.appendChild(star);
        container.appendChild(title);
        container.appendChild(img);
        popularCardContainer.appendChild(container);

    })
}


document.querySelector("#favorites").classList.remove("hidden");

document.querySelector("#closeFavorites").addEventListener("click", function () {
    document.querySelector("#favorites").classList.add("hidden");
});


function setupFavorites() {
    const favBtn = document.querySelector('#favBtn');
    const favorites = document.querySelector('#favorites');
    const closeBtn = document.querySelector('#closeFavorites');

    favBtn.addEventListener('click', () => {
        renderFavorites();
        favorites.classList.remove('hidden');
    });

    closeBtn.addEventListener('click', () => {
        favorites.classList.add('hidden');
    });
}


//Funkcja do renderowania ulubionych filmów
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