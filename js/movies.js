const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
let sortVal = document.getElementById("sort").value;
let orderVal = document.getElementById("order").value;

getMovies(APIURL);

const handleSortChange = () =>{
    sortVal =  document.getElementById("sort").value;
    getMovies(APIURL);
}
const handleOrderChange = () => {
    orderVal = document.getElementById("order").value;
    console.log(orderVal)
    getMovies(APIURL);
}

const handleSort = (data) => {
    if (orderVal==="descending"){
        if (sortVal==="popularity") {
            return data.sort((a, b) => b.popularity - a.popularity);
        } else if (sortVal==="vote_average") {
            return data.sort((a, b) => b.vote_average - a.vote_average);
        } else if (sortVal=== "vote_count"){
            return data.sort((a, b) => b.vote_count - a.vote_count);
        } else if (sortVal === "release_date"){
            return data.sort( (a,b ) => {b.release_date - a.release_date });
        }
    }else{
        if (sortVal==="popularity") {
            return data.sort((a, b) => a.popularity - b.popularity);
        } else if (sortVal==="vote_average") {
            return data.sort((a, b) => a.vote_average - b.vote_average);
        } else if (sortVal=== "vote_count"){
            return data.sort((a, b) => a.vote_count - b.vote_count);
        } else if (sortVal === "release_date"){
            return data.sort( (a,b ) => {a.release_date - b.release_date });
        }
    }

}

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();    
    handleSort(respData.results);

    showMovies(respData.results);
}

function showMovies(movies) {

    main.innerHTML = "";

    movies.forEach((movie) => {
        const {
            poster_path,
            title,
            vote_average,
            overview
        } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});