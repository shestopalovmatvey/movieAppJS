const API_KEY = '3bd0843f';

let body = document.querySelector('body');

let container = document.querySelector('.container');

let input = document.querySelector('.input__movie');

let btnSearch = document.querySelector('.btn_search');

let error = document.querySelector('.error');

let movieInfo = document.querySelector('.movie__info');

let mainBlock = document.querySelector('.movie')

const createGenres = (arr, block) => {
    for (let i = 0; i < arr.length; i++) {
        let parag = document.createElement('p')
        parag.classList.add('genres__text');
        parag.textContent = arr[i];
        block.appendChild(parag);
    }
}

const getMovie = () => {
    let movieName = input.value;
    movieName = movieName[0].toUpperCase() + movieName.slice(1);
    if (movieName === '') return
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${API_KEY}`;


    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.Error === 'Movie not found!') {
            container.style.height = '150px'
            mainBlock.style.display = 'none';
            error.style.display = 'block';
        } else {
            let poster = movieInfo.querySelector('.img img');
            let title = movieInfo.querySelector('.title h2');
            let rating = movieInfo.querySelector('.rating p');
            let genre = movieInfo.querySelector('.genres');
            let plot = document.querySelector('.movie__plot');
            let cast = document.querySelector('.movie__cast');
            let img = movieInfo.querySelector('.img');
            let mainTitle = movieInfo.querySelector('.title')
            let director = movieInfo.querySelector('.director');


            container.style.height = '650px';
            img.style.display = 'block';
            mainTitle.style.display = 'block';
            poster.src = data.Poster;
            title.textContent = data.Title;
            rating.textContent = data.Ratings[0].Value;
            director.innerHTML = `<p>Director:</p><p class='director__line'>${data.Director}</p>`
            genre.innerHTML = 
            `<div class="genres__text">${data.Genre.split(",").join("</div><div class='genres__text'>")}</div>`
            plot.innerHTML = `
            <label for="plot">Plot:</label>
            <p id="plot">${data.Plot}</p>`;
            cast.innerHTML = `
            <label for="cast">Cast:</label>
            <p id="cast">${data.Actors}</p>`;
        }
    });
}


btnSearch.addEventListener('click', getMovie)

const getMovieWithEnter = (evt) => {
    if (evt.key === "Enter") {
        evt.preventDefault();
        getMovie();
    }
}

body.addEventListener('keydown',getMovieWithEnter)




